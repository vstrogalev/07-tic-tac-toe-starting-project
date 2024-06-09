import './gameBoard.css';

export default function GameBoard({ onSelectedCell, board }) {
  return (
    <ul id="game-board">
      {board.map((row, rowIndex) => (
        <li className="gameBoard__row_container" key={rowIndex}>
          <ul className="gameBoard__row">
            {row.map((cell, colIndex) => (
              <li className="gameBoard__col" key={colIndex}>
                <button className="gameBoard__button" onClick={(event) => onSelectedCell(rowIndex, colIndex, event)} disabled={cell}>{cell}</button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
