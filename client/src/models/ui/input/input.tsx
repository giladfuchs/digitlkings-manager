import React from 'react';
import inputStyle from './input-border.module.scss';
import InputLinetyle from './input-line.module.scss';


interface OwnProps {
    label: any;
    name?: string;
    value: any;
    key: string;
    elementType: string;
    elementConfig: { type: string; placeholder: string };
    shouldValidate: {};
    invalid?: boolean;
    touched?: boolean;
    changed?: (e: any) => void;
    type: string;
    style?: {};
    class?: "line" | "border";
    textArea?: boolean;
}
const Input: React.FC<OwnProps> = (props) => {

    const scssFile = props.class === "line" ? InputLinetyle.Input : inputStyle.Input;
 

    return (
        <div style={props.style} className={scssFile} >
            <input
                className={props.class === "line" ? InputLinetyle.InputItem : inputStyle.InputItem}
                {...props.elementConfig}
                placeholder={props.label}
                value={props.value}
                onChange={props.changed}
                // autoComplete="on"
                type={props.type}
                id={Math.random().toString()}
            />
            <label className={props.class === "line" ? InputLinetyle.Label : inputStyle.Label} htmlFor={props.name}>{props.label}</label>
        </div>
    );
};

export default Input;
