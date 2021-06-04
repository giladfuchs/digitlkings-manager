import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import TableStyle from "../../users.module.scss";
import * as language from "../../../../assets/language/language";
import { deleteUser } from "../../../../store";
import { getError, getUsers } from "../../../../store/selectors";
import { User } from "../../../../models/system/user";
import RowTable from "./rowTableUser";

interface OwnProps {
    setModal: (flag: boolean) => void;
    setUserToUpdate: (user: User) => void;
}

interface StateProps {
    users: User[];
    error: string;
}

interface DispatchProps {
    deleteUser: typeof deleteUser;
}

type Props = DispatchProps & StateProps & OwnProps;

const UserComp: React.FC<Props> = (props) => {
    const { setModal, setUserToUpdate: setServiceToUpdate } = props;
    const [users, setUsers] = useState<JSX.Element[]>();

    const settingHeader = useCallback(
        () => (
            <thead>
                <tr>
                    {[
                        language.usernameInstagram[0],
                        language.passwordInstagram[0],
                        language.email[0],
                        language.phone[0],
                        language.realUser[0],
                        language.commands[0]
                    ].map((key) => (
                        <th> {key}</th>
                    ))}
                </tr>
            </thead>
        ),
        [props]
    );
    const [header] = useState<JSX.Element>(settingHeader());

    useMemo(() => {
        setUsers(
            props.users.map((s: User, index: number) => (
                <RowTable
                    key={s.user_id}
                    user={s}
                    setModal={setModal}
                    setUserToUpdate={setServiceToUpdate}
                    index={index}
                />
            ))
        );
    }, [props.users]);

    return (
        <React.Fragment>
            <div className={TableStyle.Table}>
                <table>
                    {header}
                    <tbody>{users}</tbody>
                </table>
            </div>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    users: getUsers(state),
    error: getError(state)
});
const mapDispatchToProps = (dispatch: any) => ({
    deleteUser: (service: User) => dispatch(deleteUser(service))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserComp);
