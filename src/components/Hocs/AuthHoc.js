import React from 'react'
import {Redirect} from "react-router-dom";



const AuthHoc = (Component) => {
    return (props) => {
        if (!props.isAuth) return <Redirect to={'/login'}/>
        return <Component {...props} />
    }
}

export default AuthHoc