import './log.css';

export default function Log({turns}) {
  return (
    <ol id="log">
      {turns.map((turn) => <li key={`${turn.cell.rowIndex+1}${turn.cell.colIndex+1}`}>
        {`${turn.playerName} moved on ${turn.cell.rowIndex+1} : ${turn.cell.colIndex+1}`}
      </li>)}
    </ol>
  )
}