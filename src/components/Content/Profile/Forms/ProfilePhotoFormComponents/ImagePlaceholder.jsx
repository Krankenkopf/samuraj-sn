import React from "react";
// import PropTypes from "prop-types";
import upload from '../../../../../assets/upload-icon-trn.svg'
import classes from "../ProfilePhotoForm.module.css"
import cn from 'classnames'

const Placeholder = ({ getInputProps, getRootProps, error, touched }) => (
    <div
        {...getRootProps()}
        className={cn(classes.placeholderPreview, {[classes.hasError]: error && touched})}
    >
        <input {...getInputProps()} />
        <img src={upload} style={{ height: 100, paddingTop: 85 }} alt={'upload'}/>
        <p>Click or drag image file to this area to upload.</p>
    </div>
);

/*Placeholder.propTypes = {         this is smth important
    error: PropTypes.string,
    getInputProps: PropTypes.func.isRequired,
    getRootProps: PropTypes.func.isRequired,
    touched: PropTypes.bool
};*/

export default Placeholder;