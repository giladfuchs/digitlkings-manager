import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import {
    plainText,
    phone
} from "../../../../models/ui/input/utility/input-types.input";
import { Form } from "../../../../models/system/input.field";
import Checkbox from "@material-ui/core/Checkbox";

import { getClients, getDates, getLanguage } from "../../../../store/selectors";
// import Style from "../innerTable.module.scss";

import * as language from "../../../../assets/language/language";
import { Inputs } from "../../../../models/ui/input/inputs";
import { Button, Payment } from "../../../../models";
import { postPayment } from "../../../../store";
interface OwnProps {
    user_id: string;
    index: number;
}
interface StateProps {
    language: number;
    clients: any;
}

interface DispatchProps {
    postPayment: typeof postPayment;
}

type Props = DispatchProps & OwnProps & StateProps;

const CreatePayment: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>();

    const [form, setForm] = useState<Form>({
        date: {
            ...plainText,
            type: "date",

            label: language.targetName[props.language]
        },
        amount: {
            ...phone,
            label: language.targetName[props.language]
        },
        method: {
            ...plainText,
            label: language.targetName[props.language]
        }
    });

    const addPayment = () => {
        const payment: Payment = Object.assign(
            {},
            ...Object.keys(form).map((k) => {
                return { [k]: form[k].value };
            })
        );
        const len = props.clients[props.index]["payments"].length;
        props.postPayment(props.user_id, payment, len, props.index);
    };

    return (
        <React.Fragment>
            {/* <div className={Style.TableForm}> */}
            {/* <div className={Style.Input}> */}
            <div>
                <Inputs
                    style={{ width: "280px" }}
                    form={form}
                    setForm={setForm}
                    error={error}
                    setError={setError}
                />
                <Button
                    color="purple-register"
                    disabled={true}
                    onClick={addPayment}
                >
                    {language.addTargetButton[props.language]}
                </Button>
            </div>
            {/* </div> */}
            {/* </div> */}
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    language: getLanguage(state),
    clients: getClients(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postPayment: (user_id: any, payment: Payment, len: number, index: number) =>
        dispatch(postPayment(user_id, payment, len, index))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(CreatePayment);
