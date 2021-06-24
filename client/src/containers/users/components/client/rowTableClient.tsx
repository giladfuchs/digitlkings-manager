import React from "react";
import { connect } from "react-redux";
import {
    MdDelete,
    MdModeEdit,
    MdContentCopy,
    MdDone,
    MdNotInterested
} from "react-icons/md";
import { Client } from "../../../../models/system/user";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InnerTableClient from "./innerTableClient";
import { getDates, getLanguage } from "../../../../store/selectors";

interface OwnProps {
    setModal: (flag: boolean) => void;
    setUserToUpdate: (client: Client) => void;
    client: Client;
    index: number;
}

interface StateProps {
    dates: string[];
    language: number;
}

type Props = OwnProps & StateProps;

const ClientInRow: React.FC<Props> = (props) => {
    const { setModal, setUserToUpdate: setServiceToUpdate } = props;
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <React.Fragment>
            <tr key={props.client.usernameInstagram}>
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
                            setServiceToUpdate(props.client);
                            setModal(true);
                        }}
                        color="#7467ef"
                    />
                </td>
                <td>
                    {props.client.permanence ? (
                        <MdDone size={25} color="#7467ef" />
                    ) : (
                        <MdNotInterested size={25} color="#7467ef" />
                    )}
                </td>
                <td>
                    {props.client.payments[props.client.payments.length - 1][
                        "amount"
                    ] + "  "}
                </td>

                <td>
                    {props.client.payments[props.client.payments.length - 1][
                        "date"
                    ] + "  "}
                </td>

                <td>
                    {" " + props.client.usernameInstagram + "  "}
                    <MdContentCopy
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigator.clipboard.writeText(
                                props.client.usernameInstagram
                            );
                        }}
                        color="#7467ef"
                    />
                </td>

                <td>
                    {props.index + "   "}

                    {" " + props.client.username + "  "}
                </td>
            </tr>
            <tr>
                <td>
                    <Collapse in={checked}>
                        <InnerTableClient
                            client={props.client}
                            index={props.index}
                        />
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

export default connect<StateProps>(mapStateToProps)(ClientInRow);
