import React from 'react'
import classes from './Profile.module.css'
import PreLoader from "../../Preloader";
import StatusWithHooks from "./Status/FuncStatusWithHooks";

const Profile = (props) => {
    return (
        <>
            {props.CurrentProfile == null ? <PreLoader/> :
                <div>
                    <div className={classes.profile}>
                        <img src={props.CurrentProfile.photos.large} alt={'ava'}/>
                        <div>
                            <StatusWithHooks status={props.CurrentStatus} updateStatus={props.sendToUpdateStatus}/>
                        </div>
                        <div>
                            {props.CurrentProfile.fullName}
                        </div>
                        {props.CurrentProfile.aboutMe}
                    </div>
                </div>
            }
        </>
    )
}

export default Profile