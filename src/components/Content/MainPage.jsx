import logo2 from '../../krankenkopf(transparent).png';
import yticon from '../../yt.png';
import classes from './MainPage.module.css';
import React from "react";
import NewsContainer from "./News/NewsContainer";

const MainPage = (props) => {
    return (
        <div className={classes.mainPage}>
            <div>
                <img src={logo2} className={classes.appLogo2} alt="logo2"/>
            </div>
            <NewsContainer/>
            <div>
                <a
                    className={classes.appLink}
                    href="https://www.youtube.com/channel/UCoqn4QUJ9R27wV057tB4PzQ">
                    <img src={yticon} className={classes.ytIcon} alt="yticon"/>
                </a>
            </div>
            <div>
                <a
                    className={classes.appLink}
                    href="https://www.youtube.com/channel/UCoqn4QUJ9R27wV057tB4PzQ"
                >
                    Новых видосов нет... Но ты всё-равно заходи =)
                </a>
            </div>
        </div>
    )
}
export default MainPage;
