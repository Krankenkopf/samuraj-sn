import React, {ComponentType} from 'react'
import {Redirect} from "react-router-dom";
import {connect, Matching} from "react-redux";
import {TState} from "../../redux/store";

type TMappedAuthData = {
    isAuth: boolean
}

let mapAuthDataToProps = (state: TState): TMappedAuthData => {
    return {
        isAuth: state.Auth.isAuth
    }
}

export function AuthHoc<WCP> (WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: ComponentType<Matching<TMappedAuthData & {},
        Matching<TMappedAuthData, Matching<TMappedAuthData,
            Matching<TMappedAuthData, Matching<(<WCP>() => TMappedAuthData), TMappedAuthData & WCP>>>>>> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <WrappedComponent {...restProps as unknown as WCP} />
    }
    let WithAuthRedirectComponent =
        connect<TMappedAuthData, {}, WCP, TState>(mapAuthDataToProps, {})(RedirectComponent)

    return WithAuthRedirectComponent
}

