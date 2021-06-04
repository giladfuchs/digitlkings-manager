import React, { useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { plainText } from "../../../../models/ui/input/utility/input-types.input";
import { Form } from "../../../../models/system/input.field";
import Checkbox from "@material-ui/core/Checkbox";

import { MdAddAPhoto } from "react-icons/md";
import { getDates, getLanguage } from "../../../../store/selectors";
import { postTarget } from "../../../../store";
import { User } from "../../../../models/system/user";
import Style from "../innerTable.module.scss";
import * as language from "../../../../assets/language/language";
import { Inputs } from "../../../../models/ui/input/inputs";
import { Button } from "../../../../models";
import moment from "moment";
interface OwnProps {
    user_id: string;
    index: number;
}
interface StateProps {
    language: number;
}

interface DispatchProps {
    postTarget: typeof postTarget;
}

type Props = DispatchProps & OwnProps & StateProps;

const UserInRow: React.FC<Props> = (props) => {
    const [error, setError] = useState<string>();

    const [form, setForm] = useState<Form>({
        targetName: {
            ...plainText,
            label: language.targetName[props.language]
        }
    });

    const addTarget = () => {
        props.postTarget(
            props.user_id,
            form.targetName.value as string,
            props.index
        );
    };

    return (
        <React.Fragment>
            <div className={Style.TableForm}>
                <div className={Style.Input}>
                    <div>
                        <Inputs
                            style={{ width: "280px" }}
                            form={form}
                            setForm={setForm}
                            error={error}
                            setError={setError}
                        />
                        <Button
                            color="purple-register"
                            disabled={true}
                            onClick={addTarget}
                        >
                            {language.addTargetButton[props.language]}
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postTarget: (user_id: any, target: string, index: number) =>
        dispatch(postTarget(user_id, target, index))
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserInRow);
