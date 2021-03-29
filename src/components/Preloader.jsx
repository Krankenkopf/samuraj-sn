import logo from './../logo512.png'
import classes from './Preloader.module.css'
const Preloader = () => {
    return (
        <div>
            <img src={logo} className={classes.preLoader} alt={'preloader'}/>
        </div>
    )
}

export default Preloader