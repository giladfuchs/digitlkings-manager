import React, { useState } from "react";

import classes from "./layout.module.scss";
import Toolbar from "./Navigation/Toolbar/Toolbar";
import SideDrawer from "./Navigation/SideDrawer/SideDrawer";

interface Props {
    isLogin: boolean;
    isAdmin: boolean;
}

const Layout: React.FC<Props> = (props) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isLogin={props.isLogin}
                isAdmin={props.isAdmin}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
};

export default Layout;
