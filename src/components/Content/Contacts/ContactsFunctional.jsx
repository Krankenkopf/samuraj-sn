import React from 'react';
import User from "./Users/User";
import img1 from "../../../Чaradzей Initial Photosession 3_cr.jpg";
import img2 from "../../../img613e_cr.jpg";
import img3 from "../../../ALIM0199_cr.jpg";
import img4 from "../../../Mooph.png";
import * as axios from 'axios';

const ContactsFunctional = (props) => {
    if (props.Users.length === 0) {
        axios.get("https://vk.com").then(response => {
            props.getUsers(response.data.items)
        })
        props.getUsers([
            {
                id: "1",
                imgsrc: img1,
                isAhrlist: false,
                firstName: "Hermann",
                pastName: "Schulze",
                position: "Executive Director",
                location: {country: "Belarus", city: "Petrukow"}
            },
            {
                id: "2",
                imgsrc: img2,
                isAhrlist: false,
                firstName: "Alexandre",
                pastName: "Pripyatsky",
                position: "Concept Designer",
                location: {country: "Belarus", city: "Pinsk"}
            },
            {
                id: "3",
                imgsrc: img3,
                isAhrlist: true,
                firstName: "Dzjakuj",
                pastName: "Jakzkusta",
                position: "President of The World Young Ahrlist Party",
                location: {country: "Antarctic", city: "Eschipobezhdaj"}
            },
            {
                id: "4",
                imgsrc: img4,
                isAhrlist: true,
                firstName: "Kott",
                pastName: "Taporwrot",
                position: "Issues Consultant",
                location: {country: "Antarctic", city: "Eschipobezhdaj"}
            }]
        )
    }

    let Users = props.Users.map(u => {
        return (<User
            id={u.id}
            imgsrc={u.imgsrc}
            firstName={u.firstName}
            pastName={u.pastName}
            position={u.position}
            isAhrlist={u.isAhrlist}
            location={u.location}
            toggle={props.toggle}
        />)
    })
    return (
        <div>
            <div>
                {Users}
            </div>
        </div>
    )
}

export default ContactsFunctional;