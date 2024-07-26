import { Link } from "react-router-dom";

export default function Score({ players, scoreTictactoe, scoreRps }) {
  return (
    <div>
      <div>
        <table class="scoretable" width="100%">
          <tr>
            <th>Player</th>
            <th>TicTacToe</th>
            <th>Rock Pape Scissor</th>
          </tr>
          <tr>
            <td>{players.p1}</td>
            <td>{scoreTictactoe.p1}</td>
            <td>{scoreRps.p1}</td>
          </tr>
          <tr>
            <td>{players.p2}</td>
            <td>{scoreTictactoe.p2}</td>
            <td>{scoreRps.p1}</td>
          </tr>
        </table>

        <Link to="/menu">
          <button>Back to menu</button>
        </Link>
      </div>
    </div>
  );
}
