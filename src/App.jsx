// App.js
import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCrown,
  faBucket,
} from "@fortawesome/free-solid-svg-icons";
import Player from "./component/Player";
import "./App.css";

const App = () => {
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  useEffect(() => {
    // Retrieve player data from local storage when component mounts
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    if (storedPlayers.length > 0) {
      setPlayers(storedPlayers);
    }
  }, []);

  useEffect(() => {
    // Save player data to local storage whenever players state changes
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleAddPlayer = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      { name: newPlayerName, score: 0 },
    ]);
    setShowAddPlayerModal(false);
    setNewPlayerName("");
  };

  const handleAddScore = (playerName, newScore) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.name === playerName
          ? { ...player, score: player.score + newScore }
          : player
      )
    );
  };

  const handleDeletePlayer = (playerName) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.name !== playerName)
    );
  };

  const handleEditPlayer = (playerName) => {
    // Add editing logic if needed
  };

  const handleSortPlayers = () => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  };

  return (
    <Container className="my-5">
      <Button
        variant="primary"
        className="mb-3 me-5 add-playr"
        onClick={() => setShowAddPlayerModal(true)}
      >
        Add Player
      </Button>

      <Button variant="info" className="mb-3 ml-3" onClick={handleSortPlayers}>
        Sort Players
      </Button>

      {players.map((player, index, array) => (
        <Player
          key={index}
          {...player}
          isHighestScore={player.score === array[0].score}
          isLowestScore={player.score === array[array.length - 1].score}
          onAddScore={handleAddScore}
          onDeletePlayer={handleDeletePlayer}
          onEditPlayer={handleEditPlayer}
        />
      ))}

      <Modal
        show={showAddPlayerModal}
        onHide={() => setShowAddPlayerModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter player name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddPlayerModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPlayer}>
            Add Player
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
