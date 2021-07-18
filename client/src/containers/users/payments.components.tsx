import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import SerivcesSettingsStyle from "./users.module.scss";

import {
    postEmail,
    deleteEmail,
    updateEmail
} from "../../store/data/action/email.data.actions";
import {
    getError,
    getLoading,
    getEmails,
    getLanguage,
    getClients
} from "../../store/selectors";

import { Client } from "../../models";
import TableInfo from "./components/payments/TableInfo";
import { Button, SettingsHeader } from "../../models/ui";
import * as language from "../../assets/language/language";

interface StateProps {
    clients: Client[];

    loading: boolean;
    error: string;
    language: number;
}

interface DispatchProps {}
type Props = DispatchProps & StateProps;

const PaymentComp: React.FC<Props> = (props) => {
    const settingHeader = useCallback(
        () => <SettingsHeader title={language.paymentHeader[props.language]} />,
        []
    );
    const [header] = useState<JSX.Element>(settingHeader());
    const payments = props.clients
        .map((client) =>
            client.payments.map((pay) => {
                return { name: client.username, ...pay };
            })
        )
        .flat(Infinity);

    return (
        <React.Fragment>
            <div className={SerivcesSettingsStyle.SerivcesSettings}>
                {header}
                <div className={SerivcesSettingsStyle.head}>
                    <TableInfo setForm={false} tableData={payments} />
                </div>
            </div>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    clients: getClients(state),
    loading: getLoading(state),
    error: getError(state),
    language: getLanguage(state)
});
const mapDispatchToProps = (dispatch: any) => ({});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(PaymentComp);
