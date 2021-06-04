import React, { useState } from "react";
import { connect } from "react-redux";
import { getLanguage } from "../../../../store/selectors";

import AddServiceStyle from "./add-user.module.scss";
import SerivcesSettingsStyle from "../../../../models/ui/header/container-header.module.scss";
import Switch from "@material-ui/core/Switch";

import { Inputs, Button, Modal } from "../../../../models/ui";
import { Client, plainText, Form, phone } from "../../../../models";
import * as language from "../../../../assets/language/language";
import moment from "moment";
import { format1 } from "../../../../assets";

interface OwnProps {
    close: () => void;
    fetchClient: (user: Client | any) => void;
    updateClient: Client | null;
    error: string;
    title: string;
}
interface StateProps {
    language: number;
}
type Props = OwnProps & StateProps;

const AddUser: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>("");
    const today = new Date();
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const [form, setForm] = useState<Form>({
        username: {
            ...plainText,
            label: language.clientName[props.language],
            value: props.updateClient
                ? props.updateClient.usernameInstagram
                : "",
            class: "border"
        },
        usernameInstagram: {
            ...plainText,
            label: language.usernameInstagram[props.language],
            value: props.updateClient
                ? props.updateClient.usernameInstagram
                : "",
            class: "border"
        },
        email: {
            ...plainText,
            validation: { biggerThenZero: true, minLen: 1 },
            label: language.email[props.language],
            value:
                props.updateClient && props.updateClient.email
                    ? props.updateClient.email
                    : "",
            class: "border"
        },
        phone: {
            ...phone,
            class: "border",
            value: props.updateClient ? props.updateClient.phone : "",
            label: language.phone[props.language],

            validation: {
                required: false,
                isPhone: false
            }
        },
        dateBegin: {
            ...phone,
            type: "date",
            label: language.dateBegin[props.language],
            value: moment(today).format(format1),
            validation: {
                required: false,
                isPhone: false
            }
        },

        payment: {
            ...plainText,
            type: "number",
            label: language.paymentAmount[props.language],
            value: ""
        }
    });

    const fetchService = () => {
        if (error) return;

        const ansForm = Object.assign(
            {
                user_id: props.updateClient
                    ? props.updateClient.user_id
                    : Math.floor(Math.random() * 10000),
                permanence: checked,
                dates: [{ begin: form.dateBegin.value, end: "" }],
                targets: { 3233: { 3233: "faff" } },
                payments: [
                    {
                        date: form.dateBegin.value,
                        pay: form.payment.value
                    }
                ],
                active: true
            },
            ...Object.keys(form).map((k) => {
                return { [k]: form[k].value };
            })
        );
        delete ansForm.dateBegin;
        console.log(ansForm);

        props.fetchClient(ansForm);
    };

    const Footer = () => (
        <div className={AddServiceStyle.Button}>
            הוראת קבע
            <Switch checked={checked} onChange={handleChange} />
            <Button
                onClick={() => fetchService()}
                color="purple"
                disabled={error === ""}
            >
                {props.updateClient
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
                props.updateClient
                    ? language.editClientHeaderTitle[props.language]
                    : language.addClientHeaderTitle[props.language]
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
export default connect<StateProps>(mapStateToProps)(AddUser);
