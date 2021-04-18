import React from "react";
// import PropTypes from "prop-types";
import info from "../../../../../assets/info-icon-trn.svg"
import classes from "../ProfilePhotoForm.module.css"

const ShowError = ({ error, touched }) =>
    touched && error ? (
        <div className={classes.error}>
            <img src={info} alt={'info'}/>
            {error}
        </div>
    ) : null;

/*ShowError.propTypes = {
    error: PropTypes.string,
    touched: PropTypes.bool
};*/

export default ShowError;
