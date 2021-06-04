import React from "react";

import classes from "./Toolbar.module.scss";
// import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../../logo";
import ControlledOpenSelect from "../../../droplist/drop-list";
interface Props {
    drawerToggleClicked: () => void;
}
const Toolbar: React.FC<Props> = (props) => (
    <div className={classes.Header}>
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <ControlledOpenSelect />
            </nav>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    </div>
);

export default Toolbar;
