import React, {FC} from "react";
import {Field, Form, InjectedFormProps, reduxForm} from "redux-form";
import {Checkbox, simpleInputFieldCreator, Textarea} from "../../../Common/FormsControls/FormsControls";
import {requiredField} from "../../../../utilities/Validators";
import {TProfileData} from "../../../../redux/ProfileReducer";

type TProfileFormProps = InjectedFormProps<TProfileData>

type TProfileFormDataKeys = Extract<keyof TProfileData, string>

const ProfileForm: FC<TProfileFormProps> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <label> Your name </label>
                {simpleInputFieldCreator<TProfileFormDataKeys>('fullName', [requiredField], 'Full Name')}
            </div>
            <div>
                <label>Describe yourself</label>
                <Field placeholder={'Description'} name={'aboutMe'} component={Textarea}/>
            </div>
            <div>
                <Field name={'lookingForAJob'}
                       type={'checkbox'}
                       children={'Looking for a job?'}
                       component={Checkbox}/>
            </div>
            <div>
                <label>Describe your abilities or/and preferences</label>
                <Field placeholder={'Description'} name={'lookingForAJobDescription'} component={Textarea}/>
            </div>
            <h4>Contacts</h4>
            <div>
                {simpleInputFieldCreator('contacts.github', null, 'GitHub')}
            </div>
            <div>
                {simpleInputFieldCreator('contacts.vk', null, 'Vk')}
            </div>
            <div>
                {simpleInputFieldCreator('contacts.facebook', null, 'Facebook')}
            </div>
            <div>
                {simpleInputFieldCreator('contacts.instagram', null, 'Instagram')}
            </div>
            <div>
                {simpleInputFieldCreator('contacts.twitter', null, 'Twitter')}
            </div>
            <div>
                {simpleInputFieldCreator('contacts.youtube', null, 'Youtube')}
            </div>
            <div>
                {simpleInputFieldCreator('contacts.mainLink', null, 'mainLink')}
            </div>
            <div>
                {simpleInputFieldCreator('contacts.website', null, 'Your website')}
            </div>
            <button type={'submit'} autoFocus={true}> Submit </button>
        </Form>
    )
}

export default reduxForm<TProfileData, {}, string>({form: 'profileForm'})(ProfileForm)