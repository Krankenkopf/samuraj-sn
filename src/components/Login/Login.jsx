import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {requiredField} from "../../utilities/Validators";
import {login} from "../../redux/AuthReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from './Login.module.css'
import {selectIsAuth} from "../../selectors/selectors";

const LoginForm = (props) => {
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
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

let mapStateToProps = (state) => {
    return {
        isAuth: selectIsAuth(state)
    }
}

const Login = (props) => {
    let onSubmit = (formData) => {
        props.login(formData)
    }
    if (props.isAuth) return <Redirect to={'/profile'}/>
    return (
            <div className={classes.login}>
                    <h3> Login now mazafaka! </h3>
                    <LoginReduxForm onSubmit={onSubmit}/>
                </div>
        )
}


export default connect(mapStateToProps, {login})(Login)