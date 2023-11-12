// Player.js
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCrown,
  faBucket,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  name,
  score,
  isHighestScore,
  isLowestScore,
  onAddScore,
  onDeletePlayer,
  onEditPlayer,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newScore, setNewScore] = useState(0);

  const handleAddScore = () => {
    onAddScore(name, newScore);
    setShowModal(false);
  };

  const handleDecreaseScore = () => {
    // If needed, add logic to handle decreasing score
    setShowModal(false);
  };

  return (
    <div className="player">
      {isLowestScore && (
        <FontAwesomeIcon className="kooz mt-4" icon={faBucket} />
      )}
      {isHighestScore && <FontAwesomeIcon className="king" icon={faCrown} />}
      <div className="d-flex justify-content-between my-4">
        <h2>{name}</h2>
        <h2>{score}</h2>
      </div>
      <div className="player-buttons">
        <Button variant="success" onClick={() => setShowModal(true)}>
          Add Score
        </Button>
        <Button variant="danger" onClick={handleDecreaseScore}>
          Decrease Score
        </Button>
        <Button variant="danger" onClick={() => onDeletePlayer(name)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button variant="warning" onClick={() => onEditPlayer(name)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Score for {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            placeholder="Enter score"
            value={newScore}
            onChange={(e) => setNewScore(parseInt(e.target.value, 10))}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddScore}>
            Add Score
          </Button>
          <Button variant="danger" onClick={handleDecreaseScore}>
            Decrease Score
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Player;
