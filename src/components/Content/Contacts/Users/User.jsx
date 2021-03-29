import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "./User.module.css";

const User = (props) => {
    /*let toggle = () => {
        props.toggleFollowingInProgress(props.id)
        props.isAhrlist
            ? UsersAPI.disahrlistize(props.id).then(resultCode => {
                if (resultCode === 0) {
                    props.toggle(props.id)
                }
                props.toggleFollowingInProgress(props.id)
            })
            : UsersAPI.ahrlistize(props.id).then(resultCode => {
                if (resultCode === 0) {
                    props.toggle(props.id)
                }
                props.toggleFollowingInProgress(props.id)
            })
    }*/
    return (
        <div>
            <div className={classes.user}>
                <NavLink to={"/profile/" + props.id}>
                    <img className={classes.img} src={props.imgsrc} alt={'ava'}/>
                </NavLink>
                {props.isAhrlist ?
                    <button className={classes.buttonA}
                            disabled={props.UserFollowingInProgress.some(id => id === props.id)}
                            value={props.id}
                            onClick={() => props.toggle(props.id, props.isAhrlist)}>
                        Ahrlist
                    </button> :
                    <button className={classes.buttonC}
                            disabled={props.UserFollowingInProgress.some(id => id === props.id)}
                            value={props.id}
                            onClick={() => props.toggle(props.id, props.isAhrlist)}>
                        Commoner
                    </button>}
                <div>
                    {props.firstName + " " + props.pastName}
                </div>
                <div> {props.position} </div>
                <div> {props.location.city}</div>
                <div> {props.location.country} </div>
            </div>
        </div>
    )
}

export default User;