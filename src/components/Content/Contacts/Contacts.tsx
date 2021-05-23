import React, { FC } from 'react';
import classes from "./Contacts.module.css";
import Preloader from "../../Preloader";
import User from "./Users/User";
import cn from "classnames"
import {TInternalDataUser} from "../../../redux/ContactsReducer";

type TContactsProps = {
    users: Array<TInternalDataUser>
    pageCount: number
    pageSize: number
    currentPage: number
    pagesSet: Array<number>
    isFetching: boolean
    userFollowingInProgress: Array<number>

    setCurrentPage: (page: number) => void
    isFetchingSwitch: (status: number) => void
    toggle: (id: number, isAhrlist: boolean) => void
}

const Contacts: FC<TContactsProps> = (props) => {
    const pages = props.pagesSet.map(p => {
        return (
            <span
                key={p}
                className={cn( {[classes.activePage]: props.currentPage === p})}
                onClick={() => {
                    props.setCurrentPage(p)
                }}> {p} </span>
        )
    })
    const propsUsers = () => props.users.map(u => {
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
            userFollowingInProgress={props.userFollowingInProgress}
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

export default Contacts