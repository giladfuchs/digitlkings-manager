import { TiArrowBackOutline } from "react-icons/ti";

export const ArrowNext = TiArrowBackOutline;
export const updateObject = (oldObject: any, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const formatHour = "YYYY-MM-DD HH:mm";
export const format1 = "YYYY-MM-DD";
