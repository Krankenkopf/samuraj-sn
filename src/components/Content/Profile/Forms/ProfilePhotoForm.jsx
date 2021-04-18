import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "./ProfilePhotoFormComponents/DropZoneField";
import classes from "./ProfilePhotoForm.module.css"
import btncss from "./../../../Common/CommonButton.module.css"

const imageIsRequired = value => (!value ? "Required" : undefined);

class ProfilePhotoForm extends Component {
    state = { imageFile: [] };

    handleFormSubmit = formProps => {
        const fd = new FormData();
        fd.append("imageFile", formProps.imageToUpload.file);
        // append any additional Redux form fields
        // create an AJAX request here with the created formData

        alert(JSON.stringify(formProps, null, 4));
    };

    handleOnDrop = (newImageFile, onChange) => {
        const imageFile = {
            file: newImageFile[0],
            name: newImageFile[0].name,
            preview: URL.createObjectURL(newImageFile[0]),
            size: newImageFile[0].size
        };

        this.setState({ imageFile: [imageFile] }, () => onChange(imageFile));
    };

    resetForm = () => this.setState({ imageFile: [] }, () => this.props.reset());

    render = () => (
        <div className={classes.container}>
            <h2 className={classes.title}>Upload An Image</h2>
            <hr />
            <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <Field
                    name="imageToUpload"
                    component={DropZoneField}
                    type="file"
                    imagefile={this.state.imageFile}
                    handleOnDrop={this.handleOnDrop}
                    validate={[imageIsRequired]}
                />
                <button
                    type="submit"
                    className={btncss.button}
                    autoFocus={true}
                    disabled={this.props.submitting}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className={btncss.button}
                    autoFocus={true}
                    disabled={this.props.pristine || this.props.submitting}
                    onClick={this.resetForm}
                    style={{ float: "right" }}
                >
                    Clear
                </button>
            </Form>
            <div className={classes.clear} />
        </div>
    );
}

export default reduxForm({form: 'profilePhotoForm'})(ProfilePhotoForm)