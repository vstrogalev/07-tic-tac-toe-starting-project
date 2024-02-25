import { useState } from "react";

export default function Player({ onChangePlayerName, initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleClick() {
    setIsEditing(wasEditing => !wasEditing);
    if (isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  }

  function handleChangePlayerName(event) {
    setPlayerName(event.target.value)
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && <input type="text" required value={playerName} onChange={handleChangePlayerName}/>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
