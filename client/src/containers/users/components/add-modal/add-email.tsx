import React, { useState } from "react";
import { connect } from "react-redux";

import AddServiceStyle from "./add-user.module.scss";
import SerivcesSettingsStyle from "../../../../models/ui/header/container-header.module.scss";

import { Inputs, Button, Modal } from "../../../../models/ui";
import { Email, plainText, email, Form, phone } from "../../../../models";
import * as language from "../../../../assets/language/language";
import { getLanguage } from "../../../../store/selectors";
interface OwnProps {
    close: () => void;
    fetchService: (service: Email | any, addressOriginal) => void;
    updateService: Email | null;
    error: string;
    title: string;
}
interface StateProps {
    language: number;
}
type Props = OwnProps & StateProps;

const AddService: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>("");
    const addressOriginal = props.updateService
        ? props.updateService.address
        : "";

    const [form, setForm] = useState<Form>({
        address: {
            ...email,
            label: language.email[props.language],
            value: props.updateService
                ? props.updateService.address
                : "agr@gmail.com",
            class: "line"
        },
        password: {
            ...plainText,
            label: language.passwordInstagram[props.language],
            value: props.updateService ? props.updateService.password : "",

            class: "line"
        },
        backupEmail: {
            ...email,
            validation: { biggerThenZero: true, minLen: 1 },
            label: language.emailBackup[props.language],
            value: props.updateService
                ? props.updateService.backupEmail
                : "agr@gmail.com",
            class: "line"
        },
        phone: {
            ...phone,
            value: props.updateService ? props.updateService.phone : "",
            class: "line"
        }
    });

    const fetchService = () => {
        if (error) return;

        const ansForm = Object.assign(
            {},
            ...Object.keys(form).map((k) => {
                return { [k]: form[k].value };
            })
        );

        props.fetchService(ansForm, addressOriginal);
    };

    const Footer = () => (
        <div className={AddServiceStyle.Button}>
            <Button
                onClick={() => fetchService()}
                color="purple"
                disabled={error === ""}
            >
                {props.updateService
                    ? language.editButton[props.language]
                    : language.addButton[props.language]}
            </Button>
        </div>
    );

    const showError =
        error !== "" && error !== null
            ? error
            : props.error !== "" && props.error !== null
            ? props.error
            : null;

    return (
        <Modal
            title={
                props.updateService
                    ? language.editUserHeaderTitle[props.language]
                    : language.addUserHeaderTitle[props.language]
            }
            close={props.close}
            footer={<Footer />}
        >
            <div className={AddServiceStyle.Body}>
                {showError && (
                    <p className={SerivcesSettingsStyle.Error}>{showError}</p>
                )}

                <Inputs
                    form={form}
                    setForm={setForm}
                    error={error}
                    setError={setError}
                />

                <div className={AddServiceStyle.Available}></div>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: any) => ({
    language: getLanguage(state)
});
export default connect<StateProps>(mapStateToProps)(AddService);
