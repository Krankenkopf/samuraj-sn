import React from 'react'
import {Redirect} from "react-router-dom";

const AuthHoc = (Component) => {
/*    class AuthAdded extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />
            return <Component {...this.props} />
        }
    }*/
    let AuthAdded = (props) => {
        if (!props.isAuth) return <Redirect to={'/login'} />
        return <Component {...props} />
    }
    return AuthAdded
}

export default AuthHoc