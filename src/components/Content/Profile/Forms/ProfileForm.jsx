import React from "react";
import {Field, reduxForm} from "redux-form";
import {Checkbox, Input, Textarea} from "../../../Common/FormsControls/FormsControls";
import {requiredField} from "../../../../utilities/Validators";

const ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label> Your name </label>
                <Field placeholder={'Full Name'}
                       name={'fullName'}
                       component={Input}
                       validate={[requiredField]}/>
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
                <Field placeholder={'GitHub'}
                       name={'contacts.github'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Vk'}
                       name={'contacts.vk'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Facebook'}
                       name={'contacts.facebook'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Instagram'}
                       name={'contacts.instagram'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Twitter'}
                       name={'contacts.twitter'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Youtube'}
                       name={'contacts.youtube'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'mainLink'}
                       name={'contacts.mainLink'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Your website'}
                       name={'contacts.website'}
                       component={Input}/>
            </div>
            <button type={'submit'} autoFocus={true}> Submit </button>
        </form>
    )
}

export default reduxForm({form: 'profileForm'})(ProfileForm)