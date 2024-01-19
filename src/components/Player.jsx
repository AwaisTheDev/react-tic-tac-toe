import { useState } from "react"


function Player({ initialName, symbol, isActive }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function nameInputChangeHandeler(e) {
        setPlayerName(e.target.value);
    }

    function editClickHandeler() {
        setIsEditing(editing => !isEditing);
    }

    let renderPlayerName = <span className="player-name">{playerName}</span>;
    let editBtnText = "Edit";


    if (isEditing) {
        renderPlayerName = <input type="text" value={playerName} required onChange={nameInputChangeHandeler}></input>
        editBtnText = "Save";
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {renderPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editClickHandeler}>{editBtnText}</button>
        </li>
    )
}

export default Player