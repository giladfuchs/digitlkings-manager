import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import Target from "./target";
import Payment from "./payment";
import { MdDelete, MdModeEdit, MdAddAPhoto } from "react-icons/md";
import { getClients, getLanguage } from "../../../../store/selectors";
import { addTargetsWithApi } from "../../../../store";
import { Client } from "../../../../models/system/user";
import TableStyle from "../innerTable.module.scss";
import * as language from "../../../../assets/language/language";
import CreateTarget from "./createTarget";
import CreatePayment from "./createPayment";
import { Button } from "../../../../models";

interface OwnProps {
    client: Client;
    index: number;
}
interface StateProps {
    clients: Client[];
    language: number;
}

interface DispatchProps {
    addTargetsWithApi: typeof addTargetsWithApi;
}

type Props = DispatchProps & OwnProps & StateProps;

const UserInRow: React.FC<Props> = (props) => {
    const [targets, setTargets] = useState<JSX.Element[]>();
    const [payments, setPayments] = useState<JSX.Element[]>();

    const Header = useCallback(
        () => (
            <thead>
                <tr>
                    <th> {language.targetName[props.language]}</th>
                    <th>{language.actions[props.language]}</th>
                </tr>
            </thead>
        ),
        []
    );
    const [header] = useState<JSX.Element>(Header());

    useMemo(() => {
        props.client &&
            setTargets(
                Object.keys(props.client["targets"]).map((target) => (
                    <Target
                        key={target}
                        user_id={props.client.user_id.toString()}
                        targetName={props.client["targets"][target][target]}
                    />
                ))
            );
    }, [props.clients]);

    useMemo(() => {
        props.client &&
            setPayments(
                Object.keys(props.client["payments"]).map((payment, index) => (
                    <Payment
                        key={props.client["payments"][payment]["date"]}
                        user_id={props.client.user_id.toString()}
                        payment={props.client["payments"][payment]}
                        index={index}
                        payments={props.client["payments"]}
                    />
                ))
            );
    }, [props.clients]);
    const readDataFromTarget = () => {
        const targets = Object.keys(props.client["targets"]).map((i) =>
            Number(i)
        );
        props.addTargetsWithApi(props.client.user_id, targets as [number]);
    };

    return (
        <React.Fragment>
            <div className={TableStyle.Table} style={{ height: "auto" }}>
                <table key={props.client.user_id}>
                    <CreateTarget
                        user_id={props.client.user_id.toString()}
                        index={props.index}
                    />
                    {header}
                    <tbody>{targets}</tbody>
                    <Button
                        color="purple-register"
                        disabled={true}
                        onClick={readDataFromTarget}
                    >
                        {language.addTargetButton[props.language]}
                    </Button>
                </table>
                <table key={props.client.user_id}>
                    <CreatePayment
                        user_id={props.client.user_id.toString()}
                        index={props.index}
                    />
                    <tbody>{payments}</tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    clients: getClients(state),
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    addTargetsWithApi: (user_id: string, targets: [number]) =>
        dispatch(addTargetsWithApi(user_id, targets))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserInRow);
