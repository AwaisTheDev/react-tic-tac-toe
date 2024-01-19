import { useState } from "react"

import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import Logs from "./components/Logs";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

function deriveActivePlayer(turns) {
  let activePlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);


  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;
  let draw = gameTurns.length === 9 && !winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  function onSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updatedGameTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns];
      return updatedGameTurns;
    })
  }

  function handelRematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        {(winner || draw) && <GameOver winner={winner} restart={handelRematch}></GameOver>}
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}></Player>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}></Player>
        </ol>
        <GameBoard onSelectSquare={onSelectSquare} board={gameBoard}></GameBoard>
      </div>
      <Logs turns={gameTurns} />
    </main>
  )
}

export default App
