import { useState } from "react";
import { StatusProps } from "../../Types/Types";
import "./Status.css";

const Status = (props: StatusProps) => {
    let list: JSX.Element[] = [];
    let id = 0;
    props.log.forEach((message) => {
        list.push(
            <li key={id.toString()}>
                {message};
            </li>
        )
        id++;
    })
    return(
        <div className='status'>
            <div>
                <p>{props.isLightTurn ? 'Light Turn': 'Dark Turn'}</p>
            </div>
            <div className='light_check'>
                <p>{props.isLightCheck ? 'LIGHT CHECK PLEASE!!' : ''}</p>
            </div>
            <div className='dark_check'>
                <p>{props.isDarkCheck ? 'DARK CHECK PLEASE!!' : ''}</p>
            </div>
            <div className='light_checkMate'>
                <p>{props.isLightCheck ? 'Light hath been defeatedeth' : ''}</p>
            </div>
            <div className='dark_checkMate'>
                <p>{props.isDarkCheck ? 'Dark hath been defeatedeth' : ''}</p>
            </div>
            <ul className='log'>
                {list}
            </ul>
        </div>
    )
}

export default Status;