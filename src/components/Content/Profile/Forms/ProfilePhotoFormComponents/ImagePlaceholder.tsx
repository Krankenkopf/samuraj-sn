import React, {FC} from "react";
import upload from '../../../../../assets/upload-icon-trn.svg'
import classes from "../ProfilePhotoForm.module.css"
import cn from 'classnames'
import {DropzoneInputProps, DropzoneRootProps} from "react-dropzone";

type TPlaceholderProps = {
    error: any
    touched: boolean
    getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
}

const Placeholder: FC<TPlaceholderProps> = ({ getInputProps, getRootProps, error, touched }) => (
    <div
        {...getRootProps()}
        className={cn(classes.placeholderPreview, {[classes.hasError]: error && touched})}
    >
        <input {...getInputProps()} />
        <img src={upload} style={{ height: 100, paddingTop: 85 }} alt={'upload'}/>
        <p>Click or drag image file to this area to upload.</p>
    </div>
);

export default Placeholder;