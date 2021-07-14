import React from "react";
import { connect } from "react-redux";

import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem";
import * as language from "../../../../../assets/language/language";
import { getLanguage, getIsTokenSet } from "../../../../../store/selectors";
interface StateProps {
    language: number;
    isTokenSet: boolean;
}

const navigationItems: React.FC<StateProps> = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/logout">
            {language.logout[props.language]}
        </NavigationItem>
        {props.isTokenSet && (
            <React.Fragment>
                <NavigationItem link="/comment">
                    {language.commentNav[props.language]}
                </NavigationItem>
                <NavigationItem link="/payments">
                    {language.paymentNav[props.language]}
                </NavigationItem>
                <NavigationItem link="/client">
                    {language.clientsNav[props.language]}
                </NavigationItem>
                <NavigationItem link="/email">
                    {language.emailsNav[props.language]}
                </NavigationItem>
                <NavigationItem link="/" exact>
                    {language.home[props.language]}
                </NavigationItem>
            </React.Fragment>
        )}
    </ul>
);
const mapStateToProps = (state: any) => ({
    language: getLanguage(state),
    isTokenSet: getIsTokenSet(state)
});

export default connect<StateProps>(mapStateToProps)(navigationItems);
