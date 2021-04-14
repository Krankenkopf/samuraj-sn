import classes from "./newsDefault.module.css";
import React from "react";
import image01 from "../../../../assets/mistress madness.jpg";

const Post = (props) => {
    return (
        <div className={classes.post}>
            <div>
                {<img src={image01} alt={'postImg'}/>}
            </div>
            <div>
                {props.text}
            </div>
        </div>
    )
}



    export default Post;