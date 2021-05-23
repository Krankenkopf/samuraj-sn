import React, {FC, useEffect, useState, FocusEvent} from 'react'
import classes from './Profile.module.css'
import Status from "./Status/Status";
import cfg from './../../../assets/settings-icon-transparent.png'
import EditMode from "./EditMode";
import AddPhotoMode from "./AddPhotoMode";
import Avatar from "./Avatar/Avatar";
import {TProfileContacts, TProfileData, TProfilePhotos} from "../../../redux/ProfileReducer";
import {TFormPhotoData} from "./Forms/ProfilePhotoForm";


type TProfileProps = {
    CurrentProfile: TProfileData
    CurrentProfilePhotos: TProfilePhotos
    CurrentStatus: string
    hasPhoto: boolean
    isAuthedOwner?: boolean
    sendToUpdateStatus: (status: string) => void
    sendToUpdateProfileData: (formData: any) => void
    sendToUpdateProfilePhoto: (photoFile: File) => void
}

const Profile: FC<TProfileProps> = (props) => {
    const {CurrentProfile, CurrentProfilePhotos,
        CurrentStatus, hasPhoto,
        isAuthedOwner,
        sendToUpdateStatus, sendToUpdateProfileData, sendToUpdateProfilePhoto} = props

    const [editMode, toggleEditMode] = useState(false)
    const [isAvaBtnVisible, toggleVisibility] = useState(false)
    const [addPhotoMode, toggleAddPhotoMode] = useState(false)
    const handleBlur = (e: FocusEvent, toggleMode: (mode: boolean) => void) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                toggleMode(false)
            }
        }, 0);
    }
    let onSubmitProfileForm = (formData: TProfileData) => {
        sendToUpdateProfileData(formData)
    }
    let onSubmitProfilePhotoForm = (formData: TFormPhotoData) => {
        sendToUpdateProfilePhoto(formData.imageToUpload.file)
        alert(JSON.stringify(formData, null, 4))
    }
    useEffect(() => {
        toggleAddPhotoMode(false)}, [CurrentProfilePhotos.photos])

    useEffect(() => {
        toggleEditMode(false)}, [CurrentProfile])

    return (
        <>
            <div className={classes.profile}>
                {editMode && <EditMode handleBlur={handleBlur}
                                       toggleEditMode={toggleEditMode}
                                       onSubmitProfileForm={onSubmitProfileForm}
                                       initialValues={CurrentProfile}/>}
                {addPhotoMode && <AddPhotoMode handleBlur={handleBlur}
                                               toggleAddPhotoMode={toggleAddPhotoMode}
                                               onSubmitProfilePhotoForm={onSubmitProfilePhotoForm}/>}
                <Avatar avatar={CurrentProfilePhotos.photos.large}
                        isAvaBtnVisible={isAvaBtnVisible}
                        toggleVisibility={toggleVisibility}
                        hasPhoto={hasPhoto}
                        isAuthedOwner={isAuthedOwner}
                        toggleAddPhotoMode={toggleAddPhotoMode}/>

                {isAuthedOwner && <input type={'image'}
                                               className={classes.cfgBtn}
                                               disabled={editMode}
                                               onClick={() => toggleEditMode(true)}
                                               src={cfg}
                                               alt={'cfg'}/>}
                <div className={classes.data}>
                    <div>
                        <h2 className={classes.profileTitle}>{CurrentProfile.fullName}</h2>
                    </div>

                    <Status status={CurrentStatus}
                            isAuthedOwner={isAuthedOwner}
                            updateStatus={sendToUpdateStatus}/>

                    <div>
                        <b>Looking for a job:</b>{CurrentProfile.lookingForAJob ? ' yep' : ' negative'}
                    </div>
                    <div>
                        <b>Description:</b> {CurrentProfile.lookingForAJobDescription}
                    </div>
                    <div>
                        Contacts
                        <div>
                            {Object.keys(CurrentProfile.contacts).map(key => {
                                return <Contact key={key}
                                                title={key}
                                                contact={CurrentProfile.contacts[key as keyof TProfileContacts]}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Contact: FC<{title: string, contact: string}> = ({title, contact}) => {
    return (
        <div><b>{title}:</b> <a className={classes.contactLink} href={'https://'+contact}> {contact}</a> </div>
    )
}

export default Profile