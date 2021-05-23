import React, {FC} from "react";
// import PropTypes from "prop-types"; is needed to be exterminated
import DropZone from "react-dropzone";
import ImagePreview from "./ImagePreview";
import Placeholder from "./ImagePlaceholder";
import ShowError from "./FormErrorRepresenter";
import classes from "../ProfilePhotoForm.module.css"
import {WrappedFieldProps} from "redux-form/lib/Field";
import {TPhotoFile} from "../ProfilePhotoForm";

type TDropZoneFieldProps = WrappedFieldProps & {
    handleOnDrop: (newImageFile: Array<File>, onChange: (imageFile: TPhotoFile) => void) => void
    imageFile: Array<TPhotoFile>
}

const DropZoneField: FC<TDropZoneFieldProps> = ({
                           handleOnDrop,
                           input: { onChange },
                           imageFile,
                           meta: { error, touched }
                       }) => {
    return (
        <div className={classes.previewContainer}>
            <div className={classes.uploadContainer}>
                <DropZone
                    accept="image/jpeg, image/png, image/gif, image/bmp"
                    onDrop={file => handleOnDrop(file, onChange)}
                    multiple={false}
                >
                    {props =>
                        imageFile && imageFile.length > 0 ? (
                            <ImagePreview imageFile={imageFile} />
                        ) : (
                            <Placeholder {...props} error={error} touched={touched} />
                        )
                    }
                </DropZone>
            </div>
            <ShowError error={error} touched={touched} />
        </div>
    )
}

/*DropZoneField.propTypes = {
    error: PropTypes.string,
    handleOnDrop: PropTypes.func.isRequired,
    imageFile: PropTypes.arrayOf(
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

export default DropZoneField
