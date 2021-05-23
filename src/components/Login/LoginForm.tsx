import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, {FC} from "react";
import {simpleInputFieldCreator, Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utilities/Validators";
import classes from "./Login.module.css";

type TLoginFormProps = InjectedFormProps<TLoginFormData>

export type TLoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}

type TLoginFormDataKeys = Extract<keyof TLoginFormData, string>

const LoginForm: FC<TLoginFormProps> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {simpleInputFieldCreator<TLoginFormDataKeys>('email', [requiredField], 'Login')}
            </div>
            <div>
                {simpleInputFieldCreator<TLoginFormDataKeys>('password', [requiredField], 'Password')}
            </div>
            <div className={classes.checkbox}>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/> Remember me
            </div>
            <button> Login </button>
        </form>
    )
}

export const LoginReduxForm = reduxForm<TLoginFormData, {}, string>({form: 'login'})(LoginForm)