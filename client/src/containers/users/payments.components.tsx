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

const PaymentComp: React.FC<Props> = (props) => {
    const settingHeader = useCallback(
        () => <SettingsHeader title={"language.settingTitleHeader[1]"} />,
        []
    );
    const [header] = useState<JSX.Element>(settingHeader());

    return (
        <React.Fragment>
            <div className={SerivcesSettingsStyle.SerivcesSettings}>
                {header}
                <div className={SerivcesSettingsStyle.head}>
                    <Button
                        // onClick={() => setModal(true)}
                        color="purple"
                        disabled={true}
                    >
                        {language.addButton[props.language]}
                    </Button>
                </div>
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
)(PaymentComp);
