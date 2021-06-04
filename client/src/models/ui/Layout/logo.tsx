import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./layout.module.scss";

const Logo: React.FC = () => {
    const [img, setImg] = useState<string>(
        "https://w7.pngwing.com/pngs/139/151/png-transparent-computer-icons-calendar-agenda-calendar-icon-miscellaneous-blue-text.png"
    );

    return (
        <div
            className={classes.Logo}
            // style={{ height: props.height, marginBottom: "12px" }}
        >
            <img height="50px" src={img} alt="MyBurger" />
        </div>
    );
};
const mapStateToProps = (state: any) => ({});

export default Logo;
