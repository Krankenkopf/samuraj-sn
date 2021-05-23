import classes from "./Profile.module.css";
import React, {FC, FocusEvent} from "react";
import ProfileForm from "./Forms/ProfileForm";
import {TProfileData} from "../../../redux/ProfileReducer";

type TEMProps = {
    handleBlur: (e: FocusEvent<HTMLDivElement>, toggleMode: (mode: boolean) => void) => void
    toggleEditMode: (mode: boolean) => void
    onSubmitProfileForm: (formData: TProfileData) => void
    initialValues: TProfileData
}
const EditMode: FC<TEMProps>  = (props) => {
    return (
        <div className={classes.formBox}
             tabIndex={0}
             onBlur={(e) => props.handleBlur(e, props.toggleEditMode)}>
            <div><h3>Information</h3></div>
            <ProfileForm onSubmit={props.onSubmitProfileForm}
                         initialValues={props.initialValues}/>
        </div>
    )
}

export default EditMode

