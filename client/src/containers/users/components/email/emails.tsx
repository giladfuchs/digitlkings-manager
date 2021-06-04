import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import TableStyle from "../../users.module.scss";
import * as language from "../../../../assets/language/language";
import { deleteEmail } from "../../../../store/data/action/email.data.actions";
import { getError, getEmails } from "../../../../store/selectors";
import { Email } from "../../../../models/system";
import RowTable from "./emailsRowTable";

interface OwnProps {
    setModal: (flag: boolean) => void;
    setServiceToUpdate: (service: Email) => void;
}

interface StateProps {
    emails: Email[];
    error: string;
}

interface DispatchProps {
    deleteService: typeof deleteEmail;
}

type Props = DispatchProps & StateProps & OwnProps;

const UserComp: React.FC<Props> = (props) => {
    const { setModal, setServiceToUpdate } = props;
    const [Services, setServices] = useState<JSX.Element[]>();

    const settingHeader = useCallback(
        () => (
            <thead>
                <tr>
                    <th>{language.email[0]}</th>
                    <th>{language.passwordInstagram[0]}</th>
                    <th>{language.emailBackup[0]}</th>
                    <th>{language.phone[0]}</th>
                    <th>{language.commands[0]}</th>
                </tr>
            </thead>
        ),
        [props]
    );
    const [header] = useState<JSX.Element>(settingHeader());

    useMemo(() => {
        setServices(
            props.emails.map((s: Email) => (
                <RowTable
                    email={s}
                    setModal={setModal}
                    setServiceToUpdate={setServiceToUpdate}
                />
            ))
        );
    }, [props.emails]);

    return (
        <React.Fragment>
            <div className={TableStyle.Table}>
                <table>
                    {header}
                    <tbody>{Services}</tbody>
                </table>
            </div>

            {/* <Table className={classes.table} size="small">
                    {header}
                   {props.error && <p className={SerivcesSettingsStyle.Error}>{props.error}</p>} 
                  <TableBody  className={classes.table}>
                        {Services}
                    </TableBody>
                </Table>  */}
        </React.Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    emails: getEmails(state),
    error: getError(state)
});
const mapDispatchToProps = (dispatch: any) => ({
    deleteService: (service: Email) => dispatch(deleteEmail(service))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserComp);
