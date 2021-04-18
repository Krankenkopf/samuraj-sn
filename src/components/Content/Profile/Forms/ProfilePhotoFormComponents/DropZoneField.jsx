import React from "react";
// import PropTypes from "prop-types"; is needed to be exterminated
import DropZone from "react-dropzone";
import ImagePreview from "./ImagePreview";
import Placeholder from "./ImagePlaceholder";
import ShowError from "./FormErrorRepresenter";
import classes from "../ProfilePhotoForm.module.css"

const DropZoneField = ({
                           handleOnDrop,
                           input: { onChange },
                           imagefile,
                           meta: { error, touched }
                       }) => (
    <div className={classes.previewContainer}>
        <DropZone
            accept="image/jpeg, image/png, image/gif, image/bmp"
            className={classes.uploadContainer}
            onDrop={file => handleOnDrop(file, onChange)}
            multiple={false}
        >
            {props =>
                imagefile && imagefile.length > 0 ? (
                    <ImagePreview imagefile={imagefile} />
                ) : (
                    <Placeholder {...props} error={error} touched={touched} />
                )
            }
        </DropZone>
        <ShowError error={error} touched={touched} />
    </div>
);

/*DropZoneField.propTypes = {
    error: PropTypes.string,
    handleOnDrop: PropTypes.func.isRequired,
    imagefile: PropTypes.arrayOf(
        PropTypes.shape({
            file: PropTypes.file,
            name: PropTypes.string,
            preview: PropTypes.string,
            size: PropTypes.number
        })
    ),
    onChange: PropTypes.func,
    touched: PropTypes.bool
};*/

export default DropZoneField;
