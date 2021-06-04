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
    getLanguage
} from "../../store/selectors";

import { Email } from "../../models";

import { Button, SettingsHeader } from "../../models/ui";
import * as language from "../../assets/language/language";

import Emails from "./components/email/emails";
import AddEmail from "./components/add-modal/add-email";

interface StateProps {
    emails: Email[];
    loading: boolean;
    error: string;
    language: number;
}

interface DispatchProps {
    postEmail: typeof postEmail;
    deleteEmail: typeof deleteEmail;
    updateEmail: typeof updateEmail;
}
type Props = DispatchProps & StateProps;

const UsersComp: React.FC<Props> = (props) => {
    const [UserToUpdate, setUserToUpdate] = useState<Email | null>(null);
    const [Modal, setModal] = useState<boolean>(false);

    const settingHeader = useCallback(
        () => <SettingsHeader title={"language.settingTitleHeader[1]"} />,
        []
    );
    const [header] = useState<JSX.Element>(settingHeader());

    if (!Modal && UserToUpdate) setUserToUpdate(null);

    useEffect(() => {
        props.error === "" && !props.loading && setModal(false);
    }, [props.error, props.loading]);
    return (
        <React.Fragment>
            {Modal && (
                <AddEmail
                    title={language.addUserHeaderTitle[props.language]}
                    close={() => setModal(false)}
                    fetchService={
                        UserToUpdate ? props.updateEmail : props.postEmail
                    }
                    updateService={UserToUpdate}
                    error={props.error}
                />
            )}
            <div className={SerivcesSettingsStyle.SerivcesSettings}>
                {header}
                <div className={SerivcesSettingsStyle.head}>
                    <Button
                        onClick={() => setModal(true)}
                        color="purple"
                        disabled={true}
                    >
                        {language.addButton[props.language]}
                    </Button>
                </div>

                <Emails
                    setModal={setModal}
                    setServiceToUpdate={setUserToUpdate}
                />
            </div>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    emails: getEmails(state),
    loading: getLoading(state),
    error: getError(state),
    language: getLanguage(state)
});
const mapDispatchToProps = (dispatch: any) => ({
    deleteEmail: (service: Email) => dispatch(deleteEmail(service)),
    updateEmail: (service: Email, addressOriginal) =>
        dispatch(updateEmail(service, addressOriginal)),
    postEmail: (form: Email, addressOriginal) =>
        dispatch(postEmail(form, addressOriginal))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UsersComp);
