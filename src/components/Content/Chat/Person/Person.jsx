import React from 'react';
import classes from './../Chat.module.css';
import {NavLink} from "react-router-dom";

const Person = (props) => {
    let setThread = () => {
        props.setThread(props.id);
    }
    return (
        <div className={classes.person}>
            <NavLink
                className={classes.link}
                to={"/chat/" + props.id}
                onClick={setThread}
                activeClassName={classes.active}>
                {props.person}
            </NavLink>
        </div>
    )
}

export default Person;