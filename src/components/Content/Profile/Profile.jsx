import React, {useEffect, useState} from 'react'
import classes from './Profile.module.css'
import Status from "./Status/Status";
import cfg from './../../../assets/settings-icon-transparent.png'
import EditMode from "./EditMode";
import AddPhotoMode from "./AddPhotoMode";
import Avatar from "./Avatar/Avatar";

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
        props.sendToUpdateProfilePhoto(formData)
    }
    useEffect(() => {
        toggleAddPhotoMode(false)}, [props.CurrentProfilePhotos.photos])

    useEffect(() => {
        toggleEditMode(false)}, [props.CurrentProfile])



    return (
        <>
            <div className={classes.profile}>
                {editMode && <EditMode handleBlur={handleBlur}
                                       toggleEditMode={toggleEditMode}
                                       onSubmitProfileForm={onSubmitProfileForm}
                                       initialValues={props.CurrentProfile}/>}
                {addPhotoMode && <AddPhotoMode handleBlur={handleBlur}
                                               toggleAddPhotoMode={toggleAddPhotoMode}
                                               onSubmitProfilePhotoForm={onSubmitProfilePhotoForm}/>}
                <Avatar avatar={props.CurrentProfilePhotos.photos.large}
                        isAvaBtnVisible={isAvaBtnVisible}
                        toggleVisibility={toggleVisibility}
                        hasPhoto={props.hasPhoto}
                        isAuthedOwner={props.isAuthedOwner}
                        toggleAddPhotoMode={toggleAddPhotoMode}/>

                {props.isAuthedOwner && <input type={'image'}
                                               className={classes.cfgBtn}
                                               disabled={editMode}
                                               onClick={() => toggleEditMode(true)}
                                               src={cfg}
                                               alt={'cfg'}/>}
                <div className={classes.data}>
                    <div>
                        <h2 className={classes.profileTitle}>{props.CurrentProfile.fullName}</h2>
                    </div>

                    <Status status={props.CurrentStatus}
                            isAuthedOwner={props.isAuthedOwner}
                            updateStatus={props.sendToUpdateStatus}/>

                    <div>
                        <b>Looking for a job:</b>{props.CurrentProfile.lookingForAJob ? ' yep' : ' negative'}
                    </div>
                    <div>
                        <b>Description:</b> {props.CurrentProfile.lookingForAJobDescription}
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
        <div><b>{title}:</b> <a className={classes.contactLink} href={'https://'+contact}> {contact}</a> </div>
    )
}

export default Profile