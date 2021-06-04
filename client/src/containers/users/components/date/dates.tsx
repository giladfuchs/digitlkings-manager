import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
    MdDelete,
    MdModeEdit,
    MdCancel,
    MdSave,
    MdDoNotDisturbOff,
    MdDoNotDisturbOn
} from "react-icons/md";
import { deleteDate, updateDate } from "../../../../store";
import { plainText, Form, Inputs } from "../../../../models";
import { getLanguage } from "../../../../store/selectors";
import { formatHour } from "../../../../assets";

interface OwnProps {
    user_id: string;
    date: string;
}
interface StateProps {
    language: number;
}

interface DispatchProps {
    deleteDate: typeof deleteDate;
    updateDate: typeof updateDate;
}

type Props = DispatchProps & OwnProps;

const Dates: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>("");

    const [form, setForm] = useState<Form>({
        date: {
            ...plainText,
            label: "",
            value: props.date ? props.date : "",
            editable: false,
            class: "line",
            style: { width: "135px", height: "33px" }
        }
    });
    const [Edit, setEdit] = useState<boolean>(false);

    const edit = () => {
        setEdit(true);
        setForm(
            Object.assign(
                {},
                ...Object.keys(form).map((k) => {
                    return { [k]: { ...form[k], editable: true } };
                })
            )
        );
    };

    const cancel = () => {
        setEdit(false);

        setForm(
            Object.assign(
                {},
                ...Object.keys(form).map((k) => {
                    return {
                        [k]: { ...form[k], value: props.date, editable: false }
                    };
                })
            )
        );
    };
    const isCorrectFormat = (dateString) =>
        moment(dateString, formatHour, true).isValid();

    const updateDate = () => {
        if (isCorrectFormat(form["date"].value)) {
            setForm(
                Object.assign(
                    {},
                    ...Object.keys(form).map((k) => {
                        return { [k]: { ...form[k], editable: false } };
                    })
                )
            );
            setEdit(false);
            props.updateDate(
                props.date,
                props.user_id,
                form["date"].value.toString()
            );
        } else {
            alert("no good date");
        }
    };
    const doneAdd = Edit ? (
        <MdDoNotDisturbOff size={25} color="#e62163" onClick={cancel} />
    ) : (
        <MdDoNotDisturbOn size={25} color="#7467ef" onClick={updateDate} />
    );
    return (
        <React.Fragment>
            <tr key={props.date}>
                {Edit ? (
                    <td style={{ alignItems: "center", margin: "3px" }}>
                        <MdCancel size={25} color="#e62163" onClick={cancel} />
                        <MdSave
                            size={25}
                            color="#7467ef"
                            onClick={updateDate}
                        />
                    </td>
                ) : (
                    <td style={{ alignItems: "center", margin: "3px" }}>
                        <MdDelete
                            size={15}
                            color="#e62163"
                            onClick={() => {
                                props.deleteDate(props.date, props.user_id);
                            }}
                        />
                        <MdModeEdit size={25} color="#7467ef" onClick={edit} />
                    </td>
                )}
                <td>
                    <Inputs
                        form={form}
                        setForm={setForm}
                        error={error}
                        setError={setError}
                    />
                </td>
            </tr>
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    updateDate: (dateOld: string, user_id: string, dateNew: string) =>
        dispatch(updateDate(dateOld, user_id, dateNew)),
    deleteDate: (date: string, user_id: string) =>
        dispatch(deleteDate(date, user_id))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(Dates);
