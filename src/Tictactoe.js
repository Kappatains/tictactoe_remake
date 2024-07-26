import { useState } from "react";
import { Link } from "react-router-dom";

function Square({ value, onSquareClick, winnerCondition }) {
  return (
    <button
      className={"square" + (winnerCondition ? " winner" : "")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, defineWinner }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  const board = [0, 1, 2].map((val) => {
    const row = [0, 1, 2].map((rowval) => {
      return (
        <Square
          value={squares[val * 3 + rowval]}
          onSquareClick={() => handleClick(val * 3 + rowval)}
          winnerCondition={winner?.includes(val * 3 + rowval)}
        />
      );
    });
    return <div>{row}</div>;
  });

  let status;
  if (winner) {
    status = defineWinner();
  } else {
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">{board}</div>
    </>
  );
}

export default function Tictactoe({
  players,
  scoreTictactoe,
  setScoreTictactoe,
}) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setHistory(history.slice(0, nextMove + 1));
    setWinner(null);
  }
  function defineWinner() {
    setWinner(xIsNext ? players.p2 : players.p1);
    const status = winner + " a gagné";
    return status;
  }
  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
  }

  const [reverse, setReverse] = useState(true);

  let moves = history.slice(1, history.length).map((squares, move) => {
    let description;
    description = "Go to move #" + (move + 1);

    let modifiedSquare = calculateLastMove(history, move + 1);

    let modifiedPosition = calculatePosition(modifiedSquare);

    return (
      <li key={move}>
        <>
          <button onClick={() => jumpTo(move)}>{description}</button>
          <span>{modifiedPosition}</span>
        </>
      </li>
    );
  });

  if (!reverse) {
    moves = moves.reverse();
  }
  function GameStatus() {
    if (winner) {
      return (
        <>
          <div>{winner} a gagné</div>
          <div>
            <button
              onClick={() => {
                setScoreTictactoe({
                  p1: scoreTictactoe.p1 + 1,
                  p2: scoreTictactoe.p2,
                });
                resetGame();
              }}
            >
              Score and Restart
            </button>
          </div>
        </>
      );
    } else {
      return <div>You are at move #{moves.length + 1}</div>;
    }
  }

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            players={players}
            defineWinner={defineWinner}
          />
        </div>
        <div className="game-info">
          <button
            onClick={() => {
              setReverse(!reverse);
            }}
          >
            Sorting Move
          </button>
          <ol>
            <button
              onClick={() => {
                jumpTo(0);
              }}
            >
              Game start
            </button>
            {moves}
            <li>
              <GameStatus />
            </li>
          </ol>
        </div>
      </div>
      <hr />
      <Link to="/menu">
        <button>Back to menu</button>
      </Link>
      <table class="scoretable">
        <tr class="scorerow">
          <td> {players.p1}</td>
          <td>{scoreTictactoe.p1}</td>
        </tr>
        <tr class="scorerow">
          <td> {players.p2}</td>
          <td>{scoreTictactoe.p2}</td>
        </tr>
      </table>
      <br />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

function calculatePosition(square) {
  if (square != null) {
    const pos = {
      0: "0:0",
      1: "0:1",
      2: "0:2",
      3: "1:1",
      4: "1:1",
      5: "1:2",
      6: "2:0",
      7: "2:1",
      8: "2:2",
    };
    return pos[square];
  }
  return "";
}

function calculateLastMove(history, move) {
  console.log("history before slicing : " + history);
  //console.log("history slicing : ", history.slice(move - 1, move + 1));
  let twoLastHistory = history.slice(move - 1, move + 1);
  console.log("twoLastHistory", twoLastHistory);
  for (let i = 0; i < twoLastHistory[0].length; i++) {
    if (twoLastHistory[0][i] != twoLastHistory[1][i]) {
      return i;
    }
  }

  return null;
}
