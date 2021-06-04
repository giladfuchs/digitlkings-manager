import React, { useState } from "react";
import { connect } from "react-redux";
import { getLanguage } from "../../../../store/selectors";

import Style from "./add-user.module.scss";
import SerivcesSettingsStyle from "../../../../models/ui/header/container-header.module.scss";

import { Inputs, Button, Modal } from "../../../../models/ui";
import { User, plainText, Form, phone } from "../../../../models";
import * as language from "../../../../assets/language/language";
interface OwnProps {
    close: () => void;
    fetchUser: (user: User | any) => void;
    updateUser: User | null;
    error: string;
    title: string;
}
interface StateProps {
    language: number;
}
type Props = OwnProps & StateProps;

const AddUser: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>("");

    const [form, setForm] = useState<Form>({
        usernameInstagram: {
            ...plainText,
            label: language.usernameInstagram[props.language],
            value: props.updateUser ? props.updateUser.usernameInstagram : "",
            class: "line"
        },
        passwordInstagram: {
            ...plainText,
            label: language.passwordInstagram[props.language],
            value: props.updateUser ? props.updateUser.passwordInstagram : "",

            class: "line"
        },
        email: {
            ...plainText,
            validation: { biggerThenZero: true, minLen: 1 },
            label: language.email[props.language],
            value: props.updateUser ? props.updateUser.email : "agr@gmail.com",
            class: "line"
        },
        phone: {
            ...phone,
            label: language.phone[props.language],
            class: "line",
            value: props.updateUser ? props.updateUser.phone : ""
        },
        realUser: {
            ...plainText,
            class: "line",
            label: language.realUser[props.language],
            value: props.updateUser ? props.updateUser.realUser : ""
        }
    });

    const fetchUser = () => {
        if (error) return;

        const ansForm = Object.assign(
            {
                user_id: props.updateUser
                    ? props.updateUser.user_id
                    : Math.floor(Math.random() * 10000)
            },
            ...Object.keys(form).map((k) => {
                return { [k]: form[k].value };
            })
        );

        props.fetchUser(ansForm);
    };

    const Footer = () => (
        <div className={Style.Button}>
            <Button
                onClick={() => fetchUser()}
                color="purple"
                disabled={error === ""}
            >
                {props.updateUser
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
                props.updateUser
                    ? language.editUserHeaderTitle[props.language]
                    : language.addUserHeaderTitle[props.language]
            }
            close={props.close}
            footer={<Footer />}
        >
            <div className={Style.Body}>
                {showError && (
                    <p className={SerivcesSettingsStyle.Error}>{showError}</p>
                )}

                <Inputs
                    form={form}
                    setForm={setForm}
                    error={error}
                    setError={setError}
                />

                <div className={Style.Available}></div>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: any) => ({
    language: getLanguage(state)
});
export default connect<StateProps>(mapStateToProps)(AddUser);
