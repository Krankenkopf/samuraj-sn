import classes from "./Profile.module.css";
import ProfilePhotoForm, {TFormPhotoData} from "./Forms/ProfilePhotoForm";
import React, {FC, FocusEvent} from "react";

type TPMProps = {
    handleBlur: (e: FocusEvent<HTMLDivElement>, toggleMode: (mode: boolean) => void) => void
    toggleAddPhotoMode: (mode: boolean) => void
    onSubmitProfilePhotoForm: (formData: TFormPhotoData) => void
}

const AddPhotoMode: FC<TPMProps> = (props) => {
    return (
        <div className={classes.formBox}
             tabIndex={0}
             onBlur={(e) => props.handleBlur(e, props.toggleAddPhotoMode)}>
            <ProfilePhotoForm onSubmit={props.onSubmitProfilePhotoForm}/>
        </div>
    )
}

export default AddPhotoMode
