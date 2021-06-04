import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";

import { MdDelete, MdModeEdit, MdAddAPhoto } from "react-icons/md";
import { getDates, getLanguage } from "../../../../store/selectors";
import { deleteDate } from "../../../../store";
import { User } from "../../../../models/system/user";
import TableStyle from "../innerTable.module.scss";
import * as language from "../../../../assets/language/language";
import CreateDateTable from "./createDateTable";
import Dates from "./dates";

interface OwnProps {
    user_id: string;
}
interface StateProps {
    dates: string[];
    language: number;
}

interface DispatchProps {
    deleteDate: typeof deleteDate;
}

type Props = DispatchProps & OwnProps & StateProps;

const UserInRow: React.FC<Props> = (props) => {
    const [dates, setDates] = useState<JSX.Element[]>();

    const settingHeader = useCallback(
        () => (
            <thead>
                <tr>
                    <th>{language.actions[props.language]}</th>
                    {/* <th  ><MdAddAPhoto onClick={addDate} /></th> */}
                    <th> {language.datePost[props.language]}</th>
                </tr>
            </thead>
        ),
        []
    );
    const [header] = useState<JSX.Element>(settingHeader());

    useMemo(() => {
        props.dates[props.user_id] &&
            setDates(
                props.dates[props.user_id].map((date) => (
                    <Dates key={date} user_id={props.user_id} date={date} />
                ))
            );
    }, [props.dates]);

    return (
        <React.Fragment>
            <div className={TableStyle.Table} style={{ height: "auto" }}>
                <CreateDateTable user_id={props.user_id}></CreateDateTable>
                <table key={props.user_id}>
                    {header}
                    <tbody>{dates}</tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    dates: getDates(state),
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    deleteDate: (date: string, user_id: string) =>
        dispatch(deleteDate(date, user_id))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserInRow);
