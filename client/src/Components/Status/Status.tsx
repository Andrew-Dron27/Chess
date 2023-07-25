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
            <div>
                <p>{props.isCheck ? 'CHECK PLEASE!!' : ''}</p>
            </div>
            <ul className='log'>
                {list}
            </ul>
        </div>
    )
}

export default Status;