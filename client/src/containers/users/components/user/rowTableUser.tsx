import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {
    MdDelete,
    MdModeEdit,
    MdDone,
    MdNoSim,
    MdContentCopy,
    MdCopyright
} from "react-icons/md";
import { deleteUser } from "../../../../store";
import { User } from "../../../../models/system/user";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RowTable from "../date/innerTableDate";
import { getDates, getLanguage } from "../../../../store/selectors";

interface OwnProps {
    setModal: (flag: boolean) => void;
    setUserToUpdate: (service: User) => void;
    user: User;
    index: number;
}

interface StateProps {
    dates: string[];
    language: number;
}
interface DispatchProps {
    deleteService: typeof deleteUser;
}

type Props = DispatchProps & OwnProps & StateProps;

const UserInRow: React.FC<Props> = (props) => {
    const { setModal, setUserToUpdate: setServiceToUpdate } = props;
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <React.Fragment>
            <tr key={props.user.usernameInstagram}>
                <td>
                    <FormControlLabel
                        control={
                            <Switch checked={checked} onChange={handleChange} />
                        }
                        label=""
                    />
                    <MdModeEdit
                        size={25}
                        onClick={() => {
                            setServiceToUpdate(props.user);
                            setModal(true);
                        }}
                        color="#7467ef"
                    />
                    {props.dates[props.user.user_id] ? (
                        <MdDone size={25} color="#e62163" />
                    ) : (
                        <MdNoSim size={25} color="#e62163" />
                    )}
                    <MdDelete
                        size={15}
                        onClick={() => props.deleteService(props.user)}
                        color="#e62163"
                    />
                </td>

                <td>
                    {props.user.realUser + "  "}

                    <MdContentCopy
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigator.clipboard.writeText(props.user.realUser);
                        }}
                        color="#7467ef"
                    />
                </td>
                <td>
                    {props.user.phone + "  "}

                    {props.user.phone && (
                        <MdContentCopy
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigator.clipboard.writeText(props.user.phone);
                            }}
                            color="#7467ef"
                        />
                    )}
                </td>

                <td>
                    {props.user.email + "  "}

                    {props.user.email && (
                        <MdContentCopy
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigator.clipboard.writeText(props.user.email);
                            }}
                            color="#7467ef"
                        />
                    )}
                </td>
                <td>
                    {props.user.passwordInstagram + "  "}

                    <MdContentCopy
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigator.clipboard.writeText(
                                props.user.passwordInstagram
                            );
                        }}
                        color="#7467ef"
                    />
                </td>
                <td>
                    {props.index + "   "}

                    {" " + props.user.usernameInstagram + "  "}
                    <MdContentCopy
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigator.clipboard.writeText(
                                props.user.usernameInstagram
                            );
                        }}
                        color="#7467ef"
                    />
                </td>
            </tr>
            <tr>
                <td>
                    <Collapse in={checked}>
                        <RowTable
                            user_id={props.user.user_id.toString()}
                        ></RowTable>
                    </Collapse>
                </td>
            </tr>
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    dates: getDates(state),
    language: getLanguage(state)
});
const mapDispatchToProps = (dispatch: any) => ({
    deleteService: (service: User) => dispatch(deleteUser(service))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserInRow);
