import React, {FC, useState} from "react";
import {Form, Field, reduxForm, InjectedFormProps} from "redux-form";
import DropZoneField from "./ProfilePhotoFormComponents/DropZoneField";
import classes from "./ProfilePhotoForm.module.css"
import btncss from "./../../../Common/CommonButton.module.css"


const imageIsRequired = (value: File) => (!value ? "Required" : undefined);

type TProfilePhotoFormProps = InjectedFormProps<TFormPhotoData>

export type TPhotoFile = {
    file: File
    name: string
    preview: string
    size: number
}

export type TFormPhotoData = {
    imageToUpload: TPhotoFile
}

const ProfilePhotoForm: FC<TProfilePhotoFormProps> = (props) => {
    const [photoFile, setPhotoFile] = useState<Array<TPhotoFile | []>>([])

    const handleOnDrop = (newImageFile: Array<File>, onChange: (imageFile: TPhotoFile) => void) => {
        const imageFile = {
            file: newImageFile[0],
            name: newImageFile[0].name,
            preview: URL.createObjectURL(newImageFile[0]),
            size: newImageFile[0].size
        };
        setPhotoFile([imageFile]);
        onChange(imageFile)
    };

    const resetForm = () => {
        setPhotoFile([])
        props.reset()
    }

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Upload An Image</h2>
            <hr />
            <Form onSubmit={props.handleSubmit}>
                <Field
                    name="imageToUpload"
                    component={DropZoneField}
                    type="file"
                    imageFile={photoFile}
                    handleOnDrop={handleOnDrop}
                    validate={[imageIsRequired]}
                />
                <button
                    type="submit"
                    className={btncss.button}
                    autoFocus={true}
                    disabled={props.submitting}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className={btncss.button}
                    autoFocus={true}
                    disabled={props.pristine || props.submitting}
                    onClick={resetForm}
                    style={{ float: "right" }}
                >
                    Clear
                </button>
            </Form>
            <div className={classes.clear} />
        </div>
)
}

/*class ProfilePhotoFormC extends Component {
    state = { imageFile: [] };

    handleFormSubmit = formProps => {

        this.props.onSubmit(formProps.imageToUpload.file)
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
                    imageFile={this.state.imageFile}
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
    )
}*/

export default reduxForm<TFormPhotoData, {}, string>({form: 'profilePhotoForm'})(ProfilePhotoForm);