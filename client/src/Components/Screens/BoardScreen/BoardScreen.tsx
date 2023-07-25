import Board from "../../Board/Board";
import Status from "../../Status/Status";

const BoardScreen = () => {
    return(
        <div>
            <div id="Chess_Board"> 
                <Board></Board>
            </div>
            <div id="Status_Log"> 
                <Status></Status>
            </div>
        </div>
    )
}

export default BoardScreen;