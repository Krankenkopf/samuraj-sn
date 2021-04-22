import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TFormData} from "./Login";
import React, {FC} from "react";
import {simpleInputFieldCreator, Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utilities/Validators";
import classes from "./Login.module.css";

type TLoginFormProps = InjectedFormProps<TFormData>

const LoginForm: FC<TLoginFormProps> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {simpleInputFieldCreator('email', [requiredField], 'Login')}
            </div>
            <div>
                {simpleInputFieldCreator('password', [requiredField], 'Password')}
            </div>
            <div className={classes.checkbox}>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/> Remember me
            </div>
            <button> Login </button>
        </form>
    )
}

export const LoginReduxForm = reduxForm<TFormData, {}, string>({form: 'login'})(LoginForm)