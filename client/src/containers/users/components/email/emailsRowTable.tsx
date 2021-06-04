import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { deleteEmail } from "../../../../store/data/action/email.data.actions";
import { Email } from "../../../../models/system";
import { getLanguage } from "../../../../store/selectors";

interface OwnProps {
    setModal: (flag: boolean) => void;
    setServiceToUpdate: (service: Email) => void;
    email: Email;
}

interface DispatchProps {
    deleteService: typeof deleteEmail;
}
interface StateProps {
    language: number;
}
type Props = DispatchProps & OwnProps & StateProps;

const UserInRow: React.FC<Props> = (props) => {
    const { setModal, setServiceToUpdate } = props;

    return (
        <React.Fragment>
            <tr>
                <td>
                    <MdDelete
                        onClick={() => props.deleteService(props.email)}
                        color="#e62163"
                    />

                    <MdModeEdit
                        onClick={() => {
                            setServiceToUpdate(props.email);
                            setModal(true);
                        }}
                        color="#7467ef"
                    />
                </td>
                <td>
                    {"phone" in { ...props.email } ? props.email.phone : ""}
                </td>
                <td>{props.email.backupEmail}</td>
                <td>{props.email.password}</td>
                <td>{props.email.address}</td>
            </tr>
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    deleteService: (service: Email) => dispatch(deleteEmail(service))
});
const mapStateToProps = (state: any) => ({
    language: getLanguage(state)
});
export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserInRow);
