import React from "react";
import { connect } from "react-redux";

import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getLanguage } from "../../../store/selectors";
import { setLanguage } from "../../../store/general/action/general.actions";

interface StateProps {
    language: number;
}
interface DispatchProps {
    setLanguage: typeof setLanguage;
}
type Props = DispatchProps & StateProps;

const ControlledOpenSelect: React.FC<Props> = (props) => {
    const handleChange = (
        event: React.ChangeEvent<{ value: number | string }>
    ) => {
        props.setLanguage(event.target.value as number);
    };

    React.useEffect(() => {
        setLanguage(props.language);
    }, [props.language]);
    return (
        <div style={{ height: "100%" }}>
            <FormControl style={{ height: "100%" }}>
                <NativeSelect
                    value={props.language}
                    style={{ height: "100%" }}
                    onChange={handleChange}
                    name="age"
                >
                    <option value={0}>🇺🇸</option>
                    <option value={1}>🇮🇱</option>
                    <option value={2}>🇪🇸</option>
                </NativeSelect>
            </FormControl>
        </div>
    );
};
const mapStateToProps = (state: any) => ({
    language: getLanguage(state)
});
const mapDispatchToProps = (dispatch: any) => ({
    setLanguage: (language: number) => dispatch(setLanguage(language))
});
export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(ControlledOpenSelect);
