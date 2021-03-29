import logo from '../../logo512.png';
import logo2 from '../../krankenkopf(transparent).png';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import React from "react";

const Header = (props) => {
    return (<header className={classes.header}>
            <div className={classes.headerElements}>
                <div>
                    <NavLink
                        to="/main">
                        <img src={logo} className={classes.appLogo} alt="logo"/>
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to="/main">
                    <img src={logo2} className={classes.appLogo2} alt="logo2"/>
                    </NavLink>
                </div>
                <div className={classes.loginBlock}>
                    <NavLink className={classes.login} to={"/profile"} >
                        {props.isAuth
                            ? props.login + ' id' + props.myId
                            : props.login}
                    </NavLink>
                    <div>
                        {props.isAuth
                            ? <button onClick={props.logout}> Logout </button>
                            : <NavLink to={'/login'}>
                                <button> Login </button>
                            </NavLink>}
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;