import { Link } from "react-router-dom";

export default function Menu({ players, scoreTictactoe, scoreRps }) {
  return (
    <div>
      <h1>Home Page</h1>
      <br />
      <Link to="/tictactoe">
        <button>Tic Tac Toe</button>
      </Link>
      <br />
      <Link to="/rockpaperscissor">
        <button>Rock Paper Scissor</button>
      </Link>
      <hr />
      <h1>Global score</h1>
      <table class="scoretable">
        <tr class="scorerow">
          <td> {players.p1}</td>
          <td>{scoreTictactoe.p1 + scoreRps.p1}</td>
        </tr>
        <tr class="scorerow">
          <td> {players.p2}</td>
          <td>{scoreTictactoe.p2 + scoreRps.p2}</td>
        </tr>
      </table>
      <br />
      <Link to="/Score">
        <button>Detail Score</button>
      </Link>
    </div>
  );
}
