import React, {FC} from 'react'
import {login} from "../../redux/AuthReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from './Login.module.css'
import {selectIsAuth} from "../../selectors/selectors";
import {TState} from "../../redux/store";
import {LoginReduxForm, TLoginFormData} from "./LoginForm";

type TMappedState = { isAuth:  boolean }

type TDispatchProps = {
    login:  ({email, password, rememberMe}: TLoginFormData) => void
}

type TLoginProps = TMappedState & TDispatchProps

const Login: FC<TLoginProps> = ({login, isAuth}) => {
    let onSubmit = (formData: TLoginFormData) =>  {
        login(formData)
    }
    if (isAuth) return <Redirect to={'/profile'}/>
    return (
            <div className={classes.login}>
                    <h3> Login now mazafaka! </h3>
                    <LoginReduxForm onSubmit={onSubmit}/>
                </div>
        )
}

let mapStateToProps = (state: TState): TMappedState => {
    return {
        isAuth: selectIsAuth(state)
    }
}

export default connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps, {login})(Login)