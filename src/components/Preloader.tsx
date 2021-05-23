import logo from '../assets/logo512.png'
import classes from './Preloader.module.css'
import React, {FC} from "react";

const Preloader: FC<{ onClick?: (e: Event) => void }> = () => {
    return (
        <div className={classes.preLoader}>
            <img src={logo}  alt={'preloader'}/>
        </div>
    )
}

export default Preloader