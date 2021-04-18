import React, {useEffect, useState} from 'react'
import classes from "../Profile.module.css"


const StatusWithHooks = (props) => {
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
    const updateStatus = (e) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

        return (
            <>
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
            </>
        )
}

export default StatusWithHooks