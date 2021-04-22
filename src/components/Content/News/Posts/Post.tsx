import classes from "./Post.module.css";
import React, {FC} from "react";
import image01 from "../../../../assets/mistress madness.jpg";

type TPostProps = {
    text: string
}

const Post: FC<TPostProps> = ({text}) => {
    return (
        <div className={classes.post}>
            <div>
                {<img src={image01} alt={'postImg'}/>}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}

export default Post