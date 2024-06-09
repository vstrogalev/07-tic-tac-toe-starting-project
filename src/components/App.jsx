import { useState } from "react";
import GameBoard from "./GameBoard/GameBoard";
import Player from "./Player/Player";
import Log from "./Log/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./GameOver/GameOver";
import './app.css';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayerSymbol(turns) {
  let currentPlayerSymbol = "X";
  if (turns.length > 0 && turns[0].playerSymbol === "X") {
    currentPlayerSymbol = "O";
  }

  return currentPlayerSymbol;
}

function App() {
  const [turns, setTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayerSymbol = deriveActivePlayerSymbol(turns);

  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of turns) {
    const { cell, playerSymbol } = turn;
    const { rowIndex, colIndex } = cell;
    gameBoard[rowIndex][colIndex] = playerSymbol;
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleSelectedCell(rowIndex, colIndex, event) {
    setTurns((prevTurns) => {
      const currentPlayerSymbol = deriveActivePlayerSymbol(prevTurns);

      const updatedTurns = [
        {
          cell: {
            rowIndex: rowIndex,
            colIndex: colIndex,
          },
          playerSymbol: currentPlayerSymbol,
          playerName: players[currentPlayerSymbol],
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstWinnerSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondWinnerSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdWinnerSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstWinnerSymbol &&
      firstWinnerSymbol === secondWinnerSymbol &&
      firstWinnerSymbol === thirdWinnerSymbol
    ) {
      winner = players[firstWinnerSymbol];
    }
  }

  const hasDraw = turns.length === 9 && !winner;

  function handleRestart() {
    setTurns([]);
  }

  return (
    <>
      <header class="header">
        <img
          class="logo"
          src="game-logo.png"
          alt="Hand drawing Tic-Tac-Toe game label"
        />
        <h1 className="header">React Tic-Tac-Toe</h1>
      </header>
      <main>
        <div id="game-container">
          <ul id="players" className="highlight-player">
            <Player
              onChangePlayerName={handleChangePlayerName}
              initialName={PLAYERS.X}
              symbol={"X"}
              isActive={activePlayerSymbol === "X"}
            />
            <Player
              onChangePlayerName={handleChangePlayerName}
              initialName={PLAYERS.O}
              symbol={"O"}
              isActive={activePlayerSymbol === "O"}
            />
          </ul>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}

          <GameBoard onSelectedCell={handleSelectedCell} board={gameBoard} />
        </div>
        <Log turns={turns} />
      </main>
    </>
  );
}

export default App;
