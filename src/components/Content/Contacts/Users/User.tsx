import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import classes from "./User.module.css";

type TUserProps = {
    id: number
    imgsrc: string
    firstName: string
    pastName: string
    position: string | null
    isAhrlist: boolean
    location: {
        city: string
        country: string
    } | null
    userFollowingInProgress: Array<number>
    toggle: (id: number, isAhrlist: boolean) => void
}

const User: FC<TUserProps> = (props) => {
    return (
        <div>
            <div className={classes.user}>
                <NavLink to={"/profile/" + props.id}>
                    <img className={classes.img} src={props.imgsrc} alt={'ava'}/>
                </NavLink>
                {props.isAhrlist ?
                    <button className={classes.buttonA}
                            disabled={props.userFollowingInProgress.some(id => id === props.id)}
                            value={props.id}
                            onClick={() => props.toggle(props.id, props.isAhrlist)}>
                        Ahrlist
                    </button> :
                    <button className={classes.buttonC}
                            disabled={props.userFollowingInProgress.some(id => id === props.id)}
                            value={props.id}
                            onClick={() => props.toggle(props.id, props.isAhrlist)}>
                        Commoner
                    </button>}
                <div>
                    {props.firstName + " " + props.pastName}
                </div>
                <div> {props.position} </div>
                <div> {props.location?.city}</div>
                <div> {props.location?.country} </div>
            </div>
        </div>
    )
}

export default User;