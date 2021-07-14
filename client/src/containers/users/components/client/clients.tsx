import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import TableStyle from "../../users.module.scss";
import * as language from "../../../../assets/language/language";
import { getError, getClients, getLanguage } from "../../../../store/selectors";
import { Client } from "../../../../models/system/user";
import RowTableClient from "./rowTableClient";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
    const [search, setSearch] = useState<string>("");
    const [search1, setSearch1] = React.useState<string>("");

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

    useMemo(() => {
        let timerFunc = setTimeout(() => {
            setUsers(
                props.clients
                    .filter(
                        (client: Client) =>
                            client.username.includes(search1) ||
                            client.usernameInstagram.includes(search1)
                    )
                    .map((client: Client, index: number) => (
                        <RowTableClient
                            key={client.user_id}
                            client={client}
                            setModal={setModal}
                            setUserToUpdate={setServiceToUpdate}
                            index={index + 1}
                        />
                    ))
            );
        }, 800);

        return () => clearTimeout(timerFunc);
    }, [search1]);

    return (
        <React.Fragment>
            <Autocomplete
                freeSolo
                id="combo-box-demo"
                disableClearable
                value={search}
                onChange={(event: any, newValue: string) => {
                    setSearch(newValue);
                }}
                inputValue={search1}
                onInputChange={(event, newInputValue) => {
                    setSearch1(newInputValue);
                }}
                options={props.clients.map((option) => option.username)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="search client"
                        variant="outlined"
                    />
                )}
            />
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
