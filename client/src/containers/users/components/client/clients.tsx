import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import TableStyle from "../../users.module.scss";
import * as language from "../../../../assets/language/language";
import { getError, getClients, getLanguage } from "../../../../store/selectors";
import { Client } from "../../../../models/system/user";
import RowTableClient from "./rowTableClient";

interface OwnProps {
    setModal: (flag: boolean) => void;
    setClientToUpdate: (client: Client) => void;
}

interface StateProps {
    clients: Client[];
    error: string;
    language: number;
}

type Props = StateProps & OwnProps;

const UserComp: React.FC<Props> = (props) => {
    const { setModal, setClientToUpdate: setServiceToUpdate } = props;
    const [users, setUsers] = useState<JSX.Element[]>();

    const settingHeader = useCallback(
        () => (
            <thead>
                <tr>
                    {[
                        language.clientName[props.language],
                        language.usernameInstagram[props.language],
                        language.datepaid[props.language],
                        language.paymentAmount[props.language],
                        language.permanence[props.language],
                        language.active[props.language]
                    ].map((key) => (
                        <th key={key}> {key}</th>
                    ))}
                </tr>
            </thead>
        ),
        [props]
    );
    const [header] = useState<JSX.Element>(settingHeader());

    useMemo(() => {
        setUsers(
            props.clients.map((client: Client, index: number) => (
                <RowTableClient
                    key={client.user_id}
                    client={client}
                    setModal={setModal}
                    setUserToUpdate={setServiceToUpdate}
                    index={index}
                />
            ))
        );
    }, [props.clients]);

    return (
        <React.Fragment>
            <div className={TableStyle.Table}>
                <table>
                    {header}
                    <tbody>{users}</tbody>
                </table>
            </div>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    clients: getClients(state),
    language: getLanguage(state),
    error: getError(state)
});

export default connect<StateProps>(mapStateToProps)(UserComp);
