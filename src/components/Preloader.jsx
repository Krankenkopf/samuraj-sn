import logo from '../assets/logo512.png'
import classes from './Preloader.module.css'
import React from "react";

const Preloader = () => {
    return (
        <div>
            <img src={logo} className={classes.preLoader} alt={'preloader'}/>
        </div>
    )
}

export default Preloader