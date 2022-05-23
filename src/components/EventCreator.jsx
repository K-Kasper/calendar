import { useState, useEffect } from 'react';
import { Button, FormControl, Modal, InputGroup } from 'react-bootstrap';

import { nanoid } from 'nanoid';

export default function EventCreator(props) {
  const [input, setInput] = useState({
    name: '',
    startTime: '',
    description: '',
    id: null,
  });

  function handleInput(event) {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSave() {
    props.setEvents((prevEvents) => [
      {
        name: input.name,
        startTime: input.startTime,
        description: input.description,
        id: nanoid(),
      },
      // ...prevEvents.filter((event) => event.id !== input.id),
      ...prevEvents,
    ]);
    handleClose();
    setInput({
      name: '',
      startTime: '',
      description: '',
      id: null,
    });
  }

  return (
    <div className="mt-3 mb-3">
      <Button variant="primary" onClick={handleShow}>
        New event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Event name"
              aria-label="Event name"
              aria-describedby="basic-addon1"
              name="name"
              onChange={handleInput}
              value={input.name}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Start time"
              aria-label="Start time"
              aria-describedby="basic-addon1"
              name="startTime"
              onChange={handleInput}
              value={input.startTime}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Description"
              aria-label="Description"
              aria-describedby="basic-addon1"
              name="description"
              onChange={handleInput}
              value={input.description}
            />
          </InputGroup>
          Woohoo, you're reading this text in a modal!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
