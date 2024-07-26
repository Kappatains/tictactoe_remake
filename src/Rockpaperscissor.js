import { Link } from "react-router-dom";

export default function RockPaperScissor({ players, scoreRps, setScoreRps }) {
  //
  const setChoice = (e) => {
    setMyChoice(e.target.dataset.id);
  };
  return (
    <div>
      Rock Paper Scissor Game
      <div>
        <button class="RPS Rock" data-id="rock" onClick={setChoice}>
          Rock
        </button>
        <button class="RPS Paper" data-id="paper" onClick={setChoice}>
          Paper
        </button>
        <button class="RPS Scissor" data-id="scissor" onClick={setChoice}>
          Scissor
        </button>
      </div>
      <hr />
      <div>
        <Link to="/menu">
          <button>Back to menu</button>
        </Link>
        <table class="scoretable">
          <tr class="scorerow">
            <td> {players.p1}</td>
            <td>{scoreRps.p1}</td>
          </tr>
          <tr class="scorerow">
            <td> {players.p2}</td>
            <td>{scoreRps.p2}</td>
          </tr>
        </table>
      </div>
      <br />
    </div>
  );
}
