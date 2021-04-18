import logo from '../assets/logo512.png'
import classes from './Preloader.module.css'
import React from "react";

const Preloader = () => {
    return (
        <div className={classes.preLoader}>
            <img src={logo}  alt={'preloader'}/>
        </div>
    )
}

export default Preloader