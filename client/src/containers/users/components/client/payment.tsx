import React, { useState } from "react";
import { connect } from "react-redux";
import {
    MdDelete,
    MdModeEdit,
    MdCancel,
    MdSave,
    MdDoNotDisturbOff,
    MdDoNotDisturbOn
} from "react-icons/md";
import { deletePayment, updatePayment } from "../../../../store";
import { plainText, Form, Inputs, phone, Payment } from "../../../../models";
import { getLanguage } from "../../../../store/selectors";

interface OwnProps {
    user_id: string;
    payment: Payment;
    payments: [Payment];
    index: number;
}
interface StateProps {
    language: number;
}

interface DispatchProps {
    deletePayment: typeof deletePayment;
    updatePayment: typeof updatePayment;
}

type Props = DispatchProps & OwnProps & StateProps;

const Payments: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>("");

    const [form, setForm] = useState<Form>({
        date: {
            ...plainText,
            label: "",
            value: props.payment ? props.payment.date : "",
            editable: false,
            class: "line",
            style: { width: "135px", height: "33px" }
        },
        amount: {
            ...phone,
            label: "",
            value: props.payment ? props.payment.amount : "",
            editable: false,
            class: "line",
            style: { width: "135px", height: "33px" }
        },
        method: {
            ...plainText,
            label: "",
            value: props.payment ? props.payment.method : "",
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
                        [k]: {
                            ...form[k],
                            value: props.payment,
                            editable: false
                        }
                    };
                })
            )
        );
    };

    const updatePayment = () => {
        setForm(
            Object.assign(
                {},
                ...Object.keys(form).map((k) => {
                    return { [k]: { ...form[k], editable: false } };
                })
            )
        );
        setEdit(false);
        const payment: Payment = Object.assign(
            {},
            ...Object.keys(form).map((k) => {
                return { [k]: form[k].value };
            })
        );
        props.updatePayment(props.user_id, payment, props.index);
    };
    const doneAdd = Edit ? (
        <MdDoNotDisturbOff size={25} color="#e62163" onClick={cancel} />
    ) : (
        <MdDoNotDisturbOn size={25} color="#7467ef" onClick={updatePayment} />
    );
    return (
        <React.Fragment>
            <tr key={props.payment.date}>
                <td>
                    <Inputs
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "300px"
                        }}
                        form={form}
                        setForm={setForm}
                        error={error}
                        setError={setError}
                    />
                </td>
                {Edit ? (
                    <td style={{ alignItems: "center", margin: "3px" }}>
                        <MdCancel size={25} color="#e62163" onClick={cancel} />
                        <MdSave
                            size={25}
                            color="#7467ef"
                            onClick={updatePayment}
                        />
                    </td>
                ) : (
                    <td style={{ alignItems: "center", margin: "3px" }}>
                        <MdDelete
                            size={15}
                            color="#e62163"
                            onClick={() => {
                                const payments: Payment[] = [...props.payments];
                                payments.splice(props.index, 1);
                                console.log(payments);

                                props.deletePayment(props.user_id, payments);
                            }}
                        />
                        <MdModeEdit size={25} color="#7467ef" onClick={edit} />
                    </td>
                )}
            </tr>
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    updatePayment: (user_id: string, payment: Payment, index: number) =>
        dispatch(updatePayment(user_id, payment, index)),
    deletePayment: (user_id: string, payments: Payment[]) =>
        dispatch(deletePayment(user_id, payments))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(Payments);
