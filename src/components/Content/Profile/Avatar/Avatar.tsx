import classes from "../Profile.module.css";
import React, {FC} from "react";
import avaBtnRefresh from "../../../../assets/refresh-icon-transparent.png";
import avaBtnAdd from "../../../../assets/add-icon-transparent.png";
import cn from "classnames";

type TAvatarProps = {
    avatar: string
    isAvaBtnVisible: boolean
    toggleVisibility: (arg0: boolean) => void
    hasPhoto: boolean
    isAuthedOwner?: boolean
    toggleAddPhotoMode: (arg0: boolean) => void
}

const Avatar: FC<TAvatarProps> = (props) => {

    const avaBtn = props.hasPhoto ? avaBtnRefresh : avaBtnAdd
    const avaTitle = 'Add your photo'
    let avaBoxClassName = cn(classes.avaBox, {[classes.avaBoxHidden]: !props.isAvaBtnVisible})

    return (
        <div className={classes.avaContent}
             onMouseOver={() => props.toggleVisibility(true)}
             onMouseOut={() => props.toggleVisibility(false)}>
            <img src={props.avatar} alt={'ava'}/>
            {props.isAuthedOwner && <div className={avaBoxClassName}>
                <div>{avaTitle}</div>
                <input type={'image'}
                       src={avaBtn}
                       onClick={() => props.toggleAddPhotoMode(true)}
                       alt={'avaButton'}/>
            </div>}
        </div>
    )
}

export default Avatar