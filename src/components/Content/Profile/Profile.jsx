import React, {useEffect, useState} from 'react'
import classes from './Profile.module.css'
import StatusWithHooks from "./Status/FuncStatusWithHooks";
import cfg from './../../../assets/settings-icon-transparent.png'
import ProfileForm from "./Forms/ProfileForm";
import avaBtnAdd from "../../../assets/add-icon-transparent.png"
import avaBtnRefresh from "../../../assets/refresh-icon-transparent.png"
import cn from "classnames";
import ProfilePhotoForm from "./Forms/ProfilePhotoForm";

const Profile = (props) => {
    const [editMode, toggleEditMode] = useState(false)
    const [isAvaBtnVisible, toggleVisibility] = useState(false)
    const [addPhotoMode, toggleAddPhotoMode] = useState(false)
    const handleBlur = (e, toggleMode) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                toggleMode(false)
            }
        }, 0);
    }

    let onSubmitProfileForm = (formData) => {
        props.sendToUpdateProfileData(formData)
    }
    let onSubmitProfilePhotoForm = (formData) => {
        console.log(formData)
/*        props.sendToUpdateProfilePhoto(formData)*/
    }

    useEffect(() => {
        toggleEditMode(false)
    }, [props.CurrentProfile])

    const avaBtn = avaBtnAdd
    const avaTitle = 'Add your photo'
    let avaBoxClassName = cn(classes.avaBox, {[classes.avaBoxHidden]: !isAvaBtnVisible})

    return (
        <>
            <div className={classes.profile}>
                {editMode &&
                <div className={classes.formBox} tabIndex={0} onBlur={(e) => handleBlur(e, toggleEditMode)}>
                    <div><h3>Information</h3></div>
                    <ProfileForm onSubmit={onSubmitProfileForm}
                                 initialValues={props.CurrentProfile}/>
                </div>}
                {addPhotoMode &&
                <div className={classes.formBox} tabIndex={0} onBlur={(e) => handleBlur(e, toggleAddPhotoMode)}>
                    <ProfilePhotoForm onSubmit={onSubmitProfilePhotoForm}
                                      /*initialValues={props.CurrentProfilePhotos}*//>
                </div>}
                <div className={classes.avaContent}
                     onMouseOver={() => toggleVisibility(true)}
                     onMouseOut={() => toggleVisibility(false)}>
                    <img src={props.CurrentProfilePhotos.photos.large} alt={'ava'}/>
                    {props.isAuthedOwner && <div className={avaBoxClassName}>
                        <div>{avaTitle}</div>
                        <input type={'image'}
                               src={avaBtn}
                               onClick={() => toggleAddPhotoMode(true)}
                               alt={'avaButton'}/>
                    </div>}
                </div>

                {props.isAuthedOwner && <input type={'image'}
                                               className={classes.cfgBtn}
                                               disabled={editMode}
                                               onClick={() => toggleEditMode(true)}
                                               src={cfg}
                                               alt={'cfg'}/>}
                <div className={classes.data}>
                    <div>
                        <h2>{props.CurrentProfile.fullName}</h2>
                    </div>
                    <div className={classes.status}>
                        <StatusWithHooks status={props.CurrentStatus}
                                         isAuthedOwner={props.isAuthedOwner}
                                         updateStatus={props.sendToUpdateStatus}/>
                    </div>
                    <div>
                        <b>Looking for a job:</b>{props.CurrentProfile.lookingForAJob}
                    </div>
                    <div>
                        <b>Description:</b>{props.CurrentProfile.lookingForAJobDescription}
                    </div>
                    <div>
                        Contacts
                        <div>
                            {Object.keys(props.CurrentProfile.contacts).map(key => {
                                return <Contact key={key}
                                                title={key}
                                                contact={props.CurrentProfile.contacts[key]}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Contact = ({title, contact}) => {
    return (
        <div><b>{title}:</b> {contact}</div>
    )
}

export default Profile