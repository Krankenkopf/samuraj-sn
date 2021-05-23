import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import classes from "../Profile.module.css"

type TStatusProps = {
    status: string
    isAuthedOwner?: boolean
    updateStatus: (status: string) => void
}

const Status: FC<TStatusProps> = (props) => {
    let [EditMode, setEditMode] = useState(false)
    let [Status, setStatus] = useState(props.status)
    const enableEditMode = () => {
        if (props.isAuthedOwner) setEditMode(true)
    }
    const disableEditMode = () => {
        setEditMode(false)
        if (props.status !== Status) {
            props.updateStatus(Status)
        }
    }
    const updateStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

        return (
            <div className={classes.status}>
                {!EditMode &&
                <div>
                    <span className={classes.status} onDoubleClick={enableEditMode}>
                        {props.status}
                    </span>
                </div>}
                {EditMode &&
                <div>
                    <input
                        autoFocus={true}
                        onBlur={disableEditMode}
                        onChange={updateStatus}
                        value={Status}/>
                </div>}
            </div>
        )
}

export default Status