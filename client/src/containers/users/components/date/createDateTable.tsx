import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { phone } from "../../../../models/ui/input/utility/input-types.input";
import { Form } from "../../../../models/system/input.field";
import Checkbox from "@material-ui/core/Checkbox";

import { MdAddAPhoto } from "react-icons/md";
import { getDates, getLanguage } from "../../../../store/selectors";
import { postNewDates } from "../../../../store";
import { User } from "../../../../models/system/user";
import Style from "../innerTable.module.scss";
import * as language from "../../../../assets/language/language";
import { Inputs } from "../../../../models/ui/input/inputs";
import { Button } from "../../../../models";
import moment from "moment";
import { format1, formatHour } from "../../../../assets";
interface OwnProps {
    user_id?: string;
}
interface StateProps {
    dates: string[];
    language: number;
}

interface DispatchProps {
    postNewDates: typeof postNewDates;
}

type Props = DispatchProps & OwnProps & StateProps;

const UserInRow: React.FC<Props> = (props) => {
    const [dates, setDates] = useState<any>(null);
    const [error, setError] = useState<string>();

    const [form, setForm] = useState<Form>({
        numberOfDate: { ...phone, label: language.numberOfPost[props.language] }
    });
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 60);
    const [form2, setForm2] = useState<Form>({
        dateBegin: {
            ...phone,
            type: "date",
            label: language.dateBegin[props.language],
            value: moment(today).format(format1)
        },

        dateEnd: {
            ...phone,
            type: "date",
            label: language.dateEnd[props.language],
            value: moment(tomorrow).format(format1)
        }
    });
    const getRandomDate = (from, to, numberOfDates) => {
        var duration = moment.duration(moment(to).diff(moment(from)));
        var daysDiff = duration.asDays();
        const dayDistance = Math.floor((daysDiff / numberOfDates) * 1.2);

        let dates: any = [];
        let start = from;
        let end = new Date(from);
        end.setDate(end.getDate() + dayDistance);

        for (var i = 0; i < numberOfDates; i++) {
            let dateToAdd = new Date(
                start.getTime() +
                    Math.random() * (end.getTime() - start.getTime())
            );
            while (dateToAdd.getHours() > 15)
                dateToAdd = new Date(
                    start.getTime() +
                        Math.random() * (end.getTime() - start.getTime())
                );
            dates.push(dateToAdd);

            start.setDate(start.getDate() + dayDistance);
            end.setDate(end.getDate() + dayDistance);
        }
        dates.sort((a, b) => a.getTime() - b.getTime());
        const dd = dates.map((d) => {
            const da = moment(d).format(formatHour);

            return [da, false];
        });

        return dd;
    };
    const onClickNext = () => {
        const datesNew = getRandomDate(
            new Date(form2.dateBegin.value),
            new Date(form2.dateEnd.value),
            form.numberOfDate.value
        );
        setDates(datesNew);
    };

    const markAll = () => {
        const datesNew = [...dates].map((date) => [date[props.language], true]);
        setDates(datesNew);
    };

    const cleanAll = () => {
        const datesNew = [...dates].map((date) => [
            date[props.language],
            false
        ]);
        setDates(datesNew);
    };
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const datesNew = [...dates];
        datesNew[index][1] = event.target.checked;
        setDates(datesNew);
    };
    const addDates = () => {
        const datesNew: string[] = [...dates]
            .filter((date) => date[1])
            .map((date) => date[props.language]);
        props.postNewDates(props.user_id, datesNew);
    };

    return (
        <React.Fragment>
            <div className={Style.TableForm}>
                <div className={Style.Input}>
                    <Inputs
                        form={form2}
                        setForm={setForm2}
                        error={error}
                        setError={setError}
                    />
                    <div>
                        <Inputs
                            form={form}
                            setForm={setForm}
                            error={error}
                            setError={setError}
                        />
                        <Button
                            color="purple-register"
                            disabled={true}
                            onClick={onClickNext}
                        >
                            {language.createDate[props.language]}
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ zIndex: 109 }}>
                {dates && (
                    <div>
                        <div className={Style.ButtonAddDate}>
                            <Button
                                color="purple"
                                disabled={true}
                                onClick={markAll}
                            >
                                {language.markAll[props.language]}
                            </Button>
                            <Button
                                color="orange"
                                disabled={true}
                                onClick={cleanAll}
                            >
                                {language.cleanAll[props.language]}
                            </Button>
                        </div>
                        {dates.map((date, index: number) => (
                            <p key={date[0]}>
                                {moment(date[0]).format("YYYY-MM-DD HH:mm")}
                                <Checkbox
                                    checked={date[1]}
                                    onChange={(e) => {
                                        handleChange(e, index);
                                    }}
                                    inputProps={{
                                        "aria-label": "primary checkbox"
                                    }}
                                />
                            </p>
                        ))}
                        <div style={{ marginRight: "10%", zIndex: 109 }}>
                            <Button
                                color="purple"
                                disabled={true}
                                onClick={addDates}
                                style={{ marginRight: "10%" }}
                            >
                                {language.addDate[props.language]}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    dates: getDates(state),
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postNewDates: (user_id: any, dates: string[]) =>
        dispatch(postNewDates(user_id, dates))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserInRow);
