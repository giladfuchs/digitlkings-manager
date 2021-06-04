import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Style from "./users.module.scss";

import { postUser, deleteUser, updateUser } from "../../store";
import {
    getError,
    getLoading,
    getUsers,
    getLanguage
} from "../../store/selectors";

import { User } from "../../models";

import { Button, SettingsHeader } from "../../models/ui";
import * as language from "../../assets/language/language";

import UserComp from "./components/user/users";
import AddUser from "./components/add-modal/add-user";

interface StateProps {
    users: User[];
    loading: boolean;
    error: string;
    language: number;
}

interface DispatchProps {
    postUser: typeof postUser;
    deleteUser: typeof deleteUser;
    updateUser: typeof updateUser;
}
type Props = DispatchProps & StateProps;

const UsersComp: React.FC<Props> = (props) => {
    const [UserToUpdate, setUserToUpdate] = useState<User | null>(null);
    const [Modal, setModal] = useState<boolean>(false);

    const [header] = useState<JSX.Element>(
        useCallback(
            () => (
                <SettingsHeader title={language.headerUsers[props.language]} />
            ),
            []
        )
    );

    if (!Modal && UserToUpdate) setUserToUpdate(null);

    useEffect(() => {
        props.error === "" && !props.loading && setModal(false);
    }, [props.error, props.loading]);
    return (
        <React.Fragment>
            {Modal && (
                <AddUser
                    title={language.addUserHeaderTitle[props.language]}
                    close={() => setModal(false)}
                    fetchUser={UserToUpdate ? props.updateUser : props.postUser}
                    updateUser={UserToUpdate}
                    error={props.error}
                />
            )}
            <div className={Style.Header}>
                {header}
                <div className={Style.head}>
                    <Button
                        onClick={() => setModal(true)}
                        color="purple"
                        disabled={true}
                        style={{ marginRight: "25%" }}
                    >
                        {language.addButton[props.language]}
                    </Button>
                </div>

                <UserComp
                    setModal={setModal}
                    setUserToUpdate={setUserToUpdate}
                />
            </div>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    users: getUsers(state),
    loading: getLoading(state),
    language: getLanguage(state),
    error: getError(state)
});
const mapDispatchToProps = (dispatch: any) => ({
    deleteUser: (user: User) => dispatch(deleteUser(user)),
    updateUser: (user: User) => dispatch(updateUser(user)),
    postUser: (user: User) => dispatch(postUser(user))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UsersComp);
