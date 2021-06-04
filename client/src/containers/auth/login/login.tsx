import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./business-login.module.scss";

import {
    getLoading,
    getError,
    getIsTokenSet,
    getLanguage
} from "../../../store/selectors";
import { loginEmployee, SignUpEmployee } from "../../../store";

import {
    Button,
    AuthenticationHeadrer,
    Inputs,
    Loading
} from "../../../models/ui";
import * as language from "../../../assets/language/language";

import { password, email, Form } from "../../../models";

interface FormState {
    email: string;
    password: string;
}

interface OwnProps {
    loginComponent: boolean;
}

interface StateProps {
    loading: boolean;
    error: string;
    isTokenSet: boolean;
    language: number;
}

interface DispatchProps {
    loginEmployee: typeof loginEmployee;
    SignUpEmployee: typeof SignUpEmployee;
}

type Props = DispatchProps & StateProps & OwnProps;
const BusinessLogin: React.FC<Props> = (props) => {
    const getForm = () => {
        return {
            email: { ...email, label: language.email[props.language] },
            password: { ...password, label: language.password[props.language] }
        };
    };
    const [form, setForm] = useState<Form>(getForm());

    const [error, setError] = useState<string>("");

    const onClickNext = () => {
        const ansForm = Object.assign(
            {},
            ...Object.keys(form).map((k) => ({ [k]: form[k].value }))
        );
        props.loginComponent
            ? props.loginEmployee(ansForm)
            : props.SignUpEmployee(ansForm);
    };
    const [redirect, setRedirect] = useState<JSX.Element>();
    useEffect(() => {
        props.isTokenSet && setRedirect(<Redirect to="" />);
    }, [props.isTokenSet]);
    useEffect(() => {
        const formNew = getForm();
        Object.keys(formNew).forEach((key) => {
            formNew[key].value = form[key].value;
        });
        setForm(formNew);
    }, [props.language]);

    return (
        <div className={classes.Register}>
            {redirect}
            <div className={classes.Form2}>
                <AuthenticationHeadrer
                    title={language.login[props.language]}
                    subTitle={language.loginSubTitle[props.language]}
                    error={error ? error : props.error}
                />
                <React.Fragment>
                    <div className={classes.Body}>
                        <Inputs
                            form={form}
                            setForm={setForm}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    {!props.loading ? (
                        <React.Fragment>
                            <div className={classes.Button}>
                                <Button
                                    color="purple-register"
                                    onClick={() => onClickNext()}
                                    disabled={error === ""}
                                >
                                    התחבר
                                </Button>
                            </div>
                        </React.Fragment>
                    ) : (
                        <Loading />
                    )}
                </React.Fragment>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    isTokenSet: getIsTokenSet(state),
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    loginEmployee: (form: FormState) => dispatch(loginEmployee(form)),
    SignUpEmployee: (form: FormState) => dispatch(SignUpEmployee(form))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(BusinessLogin);
