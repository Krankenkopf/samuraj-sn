import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={classes.navigation}>
            <div>
                <NavLink
                    className={classes.link}
                    to="/history"
                    activeClassName={classes.active}>
                    History
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={classes.link}
                    to="/activities"
                    activeClassName={classes.active}>
                    Krank Activities
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={classes.link}
                    to="/contacts"
                    activeClassName={classes.active}>
                    Contacts
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={classes.link}
                    to="/chat"
                    activeClassName={classes.active}>
                    Chat
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={classes.link}
                    to="/ads"
                    activeClassName={classes.active}>
                    Ad
                </NavLink>

            </div>
        </nav>
    )

}


export default Navbar;