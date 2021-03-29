import React from 'react';
import classes from './Ads.module.css';

const Ads = () => {
    let cycle = []
    for (let i = 1; i <= 10000; i++) {
        cycle.push(<span> {Math.floor(Math.random()*2)} </span>)
    }
return (
        <div className={classes.ads}>
            Ads
            <div>
                {cycle}
            </div>
        </div>

    )
}

export default Ads;