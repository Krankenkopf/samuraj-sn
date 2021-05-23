import React, {FC} from "react";
// import PropTypes from "prop-types"; is needed to be exterminated
import classes from "../ProfilePhotoForm.module.css"
import {TPhotoFile} from "../ProfilePhotoForm";

type TImagePreviewProps = {
    imageFile: Array<TPhotoFile>
}

const ImagePreview: FC<TImagePreviewProps> = ({imageFile}) => {
    const preview = imageFile.map(({name, preview, size }) => (
        <div key={name} className={classes.renderPreview}>
            <div className={classes.imageContainer}>
                <img src={preview} alt={name} />
            </div>
            <div className={classes.details}>
                {name} - {(size / 1024000).toFixed(2)}MB
            </div>
        </div>))
    return <> {preview} </>
}
    ;

/*ImagePreview.propTypes = {              this is something important
    imagefile: PropTypes.arrayOf(
        PropTypes.shape({
            file: PropTypes.file,
            name: PropTypes.string,
            preview: PropTypes.string,
            size: PropTypes.number
        })
    )
};*/

export default ImagePreview;
