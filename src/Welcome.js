import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Welcome({ player, setPlayers }) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    console.log("test");
    const formData = new FormData(e.target);
    setPlayers({
      p1: [formData.get("firstplayer")],
      p2: [formData.get("secondplayer")],
    });
    navigate("/menu");
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          First Player : <input type="text" name="firstplayer" />
        </label>
        <br />
        <label>
          Second Player : <input type="text" name="secondplayer" />
        </label>
        <hr />
        <button type="submit">Let's play !</button>
      </form>
    </div>
  );
}
