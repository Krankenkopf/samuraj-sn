import React, {FunctionComponent} from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utilities/Validators";
import {login, TAuthThunk} from "../../redux/AuthReducer";
import {connect, Matching} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from './Login.module.css'
import {selectIsAuth} from "../../selectors/selectors";
import {TState} from "../../redux/store";

type TMappedState = {
    isAuth:  boolean
}

type TDispatchProps = {
    login:  ({email, password, rememberMe}: TFormData) => TAuthThunk
}

const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'email'} component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[requiredField]}/>
            </div>
            <div className={classes.checkbox}>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/> Remember me
            </div>
            <button> Login </button>
        </form>
    )
}
const LoginReduxForm = reduxForm<TFormData, {}, string>({form: 'login'})(LoginForm)

let mapStateToProps = (state: TState) => {
    return {
        isAuth: selectIsAuth(state)
    }
}

export type TFormData = {
    email: string
    password: string
    rememberMe: boolean
}

type TLogin = FunctionComponent<Matching<TMappedState & { login: (args_0: TFormData) => Promise<void>; }, TMappedState & { login: (args_0: TFormData) => Promise<void>} & TDispatchProps>>

const Login: TLogin = (props) => {
    let onSubmit: (formData: TFormData) => void = (formData) => {
        props.login(formData)
    }
    if (props.isAuth) return <Redirect to={'/profile'}/>
    return (
            <div className={classes.login}>
                    <h3> Login now mazafaka! </h3>
                {/*@ts-ignore */}
                    <LoginReduxForm onSubmit={onSubmit}/>
                </div>
        )
}


export default connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps, {login})(Login)