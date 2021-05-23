import React, {FC} from "react";
import info from "../../../../../assets/info-icon-trn.svg"
import classes from "../ProfilePhotoForm.module.css"


const ShowError: FC<{ error: any, touched: boolean }> = ({ error, touched }) =>
    touched && error ? (
        <div className={classes.error}>
            <img src={info} alt={'info'}/>
            {error}
        </div>
    ) : null;

export default ShowError;
