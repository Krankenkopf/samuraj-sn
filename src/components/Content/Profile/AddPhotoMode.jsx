import classes from "./Profile.module.css";
import ProfilePhotoForm from "./Forms/ProfilePhotoForm";
import React from "react";

const AddPhotoMode = (props) => {
    return (
        <div className={classes.formBox} tabIndex={0} onBlur={(e) => props.handleBlur(e, props.toggleAddPhotoMode)}>
            <ProfilePhotoForm onSubmit={props.onSubmitProfilePhotoForm}/>
        </div>
    )
}

export default AddPhotoMode
