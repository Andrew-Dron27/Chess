import { useState } from "react";
const Status = () => {
    let status : string[] = [];
    const [statusList, setStatusList] = useState([]);
    let list: JSX.Element[] = [];
    statusList.forEach((message) => {
        list.push(
            <li>
                {message};
            </li>
        )
    })
    return(
        <div id="status_list">
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default Status;