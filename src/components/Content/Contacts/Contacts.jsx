import React from 'react';
import classes from "./Contacts.module.css";
import Preloader from "../../Preloader";
import User from "./Users/User";
import cn from "classnames"


const Contacts = (props) => {
    let pages = props.PagesSet.map(p => {
        return (
            <span
                key={p}
                className={cn( {[classes.activePage]: props.CurrentPage === p})}
                onClick={() => {
                    props.setUsers(props.PageSize, p)
                }}> {p} </span>
        )
    })
    let propsUsers = () => props.Users.map(u => {
        return (<User
            key={u.id}
            id={u.id}
            imgsrc={u.imgsrc}
            firstName={u.firstName}
            pastName={u.pastName}
            position={u.position}
            isAhrlist={u.isAhrlist.value}
            location={u.location}
            toggle={props.toggle}
            UserFollowingInProgress={props.UserFollowingInProgress}
        />)
    })
    return (
        <>
            {props.isFetching ? <Preloader onClick={() => props.isFetchingSwitch(200)}/> : null}
            <div>
                <div className={classes.pagination}>
                    {pages}
                </div>

                <div>
                    {propsUsers()}
                </div>
            </div>
        </>

    )
}

export default Contacts;