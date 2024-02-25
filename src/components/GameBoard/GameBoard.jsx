export default function GameBoard({ onSelectedCell, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, colIndex) => (
              <li key={colIndex}>
                <button onClick={(event) => onSelectedCell(rowIndex, colIndex, event)} disabled={cell}>{cell}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
