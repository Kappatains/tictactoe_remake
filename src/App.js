import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Tictactoe from "./Tictactoe";
import Welcome from "./Welcome";
import Score from "./Score";
import RockPaperScissor from "./Rockpaperscissor";
import Menu from "./Menu";

export default function App() {
  const [players, setPlayers] = useState({ p1: null, p2: null });
  const [scoreTictactoe, setScoreTictactoe] = useState({ p1: 0, p2: 0 });
  const [scoreRps, setScoreRps] = useState({ p1: 0, p2: 0 });
  const navigate = useNavigate();
  function RerootWelcome() {
    useEffect(() => {
      navigate("welcome");
    });
  }
  return (
    <Routes>
      <Route path="/" element={<RerootWelcome />} />
      <Route
        path="/welcome"
        element={<Welcome players={players} setPlayers={setPlayers} />}
      />
      <Route
        path="/score"
        element={
          <Score
            players={players}
            scoreRps={scoreRps}
            scoreTictactoe={scoreTictactoe}
          />
        }
      />
      <Route
        path="/rockpaperscissor"
        element={
          <RockPaperScissor
            players={players}
            scoreRps={scoreRps}
            setScoreRps={setScoreRps}
          />
        }
      />
      <Route
        path="/tictactoe"
        element={
          <Tictactoe
            players={players}
            scoreTictactoe={scoreTictactoe}
            setScoreTictactoe={setScoreTictactoe}
          />
        }
      />
      <Route
        path="/menu"
        element={
          <Menu
            players={players}
            scoreTictactoe={scoreTictactoe}
            scoreRps={scoreRps}
          />
        }
      />
    </Routes>
  );
}
