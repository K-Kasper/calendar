import { useState, useEffect } from 'react';
import { Button, FormControl, Modal, InputGroup } from 'react-bootstrap';

export default function EventModifier(props) {
  const [input, setInput] = useState({
    name: '',
    startTime: '',
    endTime: '',
    description: '',
    id: null,
  });

  useEffect(() => {
    setInput({
      name: props.event.name,
      startTime: props.event.startTime,
      endTime: props.event.endTime,
      description: props.event.description,
      id: props.event.id,
    });
  }, []);

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
        endTime: input.endTime,
        description: input.description,
        id: input.id,
      },
      ...prevEvents.filter((event) => event.id !== input.id),
    ]);
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing: {props.event.name}</Modal.Title>
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
              placeholder="End time"
              aria-label="End time"
              aria-describedby="basic-addon1"
              name="endTime"
              onChange={handleInput}
              value={input.endTime}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
