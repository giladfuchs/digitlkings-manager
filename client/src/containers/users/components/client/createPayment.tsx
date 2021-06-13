import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import {
    plainText,
    phone
} from "../../../../models/ui/input/utility/input-types.input";
import { Form } from "../../../../models/system/input.field";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";

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
    const [paymentMethood, setPaymentMethood] = useState<string>("keva");

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
        remark: {
            ...plainText,
            label: language.targetName[props.language]
        }
    });

    const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
        setPaymentMethood(event.target.value as string);
    };
    const addPayment = () => {
        const payment: Payment = Object.assign(
            { method: paymentMethood },
            ...Object.keys(form).map((k) => {
                return { [k]: form[k].value };
            })
        );
        console.log(payment);

        const len = props.clients[props.index]["payments"].length;
        props.postPayment(props.user_id, payment, len);
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
                <NativeSelect
                    value={paymentMethood}
                    style={{ height: "100%" }}
                    onChange={handleChange}
                    name="age"
                >
                    <option value={"keva"}>keva</option>
                    <option value={"bit"}>bit</option>
                    <option value={"transfer"}>Transfer</option>
                    <option value={"credit"}>credit</option>
                    <option value={"cash"}>cash</option>
                    <option value={"other"}>other</option>
                </NativeSelect>
                <FormHelperText>payment method</FormHelperText>
                <Button
                    color="purple-register"
                    disabled={true}
                    onClick={addPayment}
                >
                    {language.addPaymentButton[props.language]}
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
    postPayment: (user_id: any, payment: Payment, len: number) =>
        dispatch(postPayment(user_id, payment, len))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(CreatePayment);
