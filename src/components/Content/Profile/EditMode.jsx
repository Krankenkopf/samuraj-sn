import classes from "./Profile.module.css";
import React from "react";
import ProfileForm from "./Forms/ProfileForm";


const EditMode = (props) => {
    return (
        <div className={classes.formBox} tabIndex={0} onBlur={(e) => props.handleBlur(e, props.toggleEditMode)}>
            <div><h3>Information</h3></div>
            <ProfileForm onSubmit={props.onSubmitProfileForm}
                         initialValues={props.initialValues}/>
        </div>
    )
}

export default EditMode

