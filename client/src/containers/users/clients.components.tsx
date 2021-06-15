import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Style from "./users.module.scss";

import { postClient, updateClient } from "../../store";
import { getError, getLoading, getLanguage } from "../../store/selectors";

import { Client } from "../../models";

import { Button, SettingsHeader } from "../../models/ui";
import * as language from "../../assets/language/language";

import ClientComp from "./components/client/clients";
import AddClient from "./components/add-modal/add-client";

interface StateProps {
    loading: boolean;
    error: string;
    language: number;
}

interface DispatchProps {
    postClient: typeof postClient;
    updateClient: typeof updateClient;
}
type Props = DispatchProps & StateProps;

const UsersComp: React.FC<Props> = (props) => {
    const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);
    const [Modal, setModal] = useState<boolean>(false);

    const [header] = useState<JSX.Element>(
        useCallback(
            () => (
                <SettingsHeader title={language.headerClient[props.language]} />
            ),
            []
        )
    );

    if (!Modal && clientToUpdate) setClientToUpdate(null);

    useEffect(() => {
        props.error === "" && !props.loading && setModal(false);
    }, [props.error, props.loading]);
    return (
        <React.Fragment>
            {Modal && (
                <AddClient
                    title={language.addUserHeaderTitle[props.language]}
                    close={() => setModal(false)}
                    fetchClient={
                        clientToUpdate ? props.updateClient : props.postClient
                    }
                    updateClient={clientToUpdate}
                    error={props.error}
                />
            )}
            <div className={Style.Header}>
                {header}
                <div className={Style.head}>
                    <Button
                        onClick={() => setModal(true)}
                        color="purple"
                        disabled={true}
                        style={{ marginRight: "25%" }}
                    >
                        {language.addButton[props.language]}
                    </Button>
                    <Button
                        onClick={() => setModal(true)}
                        color="purple"
                        disabled={true}
                        style={{ marginRight: "25%" }}
                    >
                        {language.sortDateButton[props.language]}
                    </Button>
                </div>

                <ClientComp
                    setModal={setModal}
                    setClientToUpdate={setClientToUpdate}
                />
            </div>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    language: getLanguage(state),
    error: getError(state)
});
const mapDispatchToProps = (dispatch: any) => ({
    updateClient: (client: Client) => dispatch(updateClient(client)),
    postClient: (client: Client) => dispatch(postClient(client))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UsersComp);
