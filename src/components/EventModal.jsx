import { useState } from 'react';
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';

export default function EventModifier(props) {
  const fixPlaceholder = (i) => {
    const fixed = [];
    for (let char in i) {
      if (i[char] === i[char].toUpperCase()) {
        fixed.push(' ');
        fixed.push(i[char].toLowerCase());
      } else {
        fixed.push(i[char]);
      }
    }
    fixed[0] = fixed[0].toUpperCase();
    return fixed.join('');
  };

  const inputFields = Object.entries(props.input).map((i, index) => (
    <FloatingLabel
      key={index}
      controlId={i[0]}
      label={fixPlaceholder(i[0])}
      className="mb-3"
    >
      <Form.Control
        name={i[0]}
        onChange={handleInput}
        value={i[1]}
        placeholder={fixPlaceholder(i[0])}
        type="text"
        required
      />
    </FloatingLabel>
  ));

  function handleInput(event) {
    props.setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    props.handleSave();
    handleClose();
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.button}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>{inputFields}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={(e) => handleSave(e)}
            >
              {props.submitButton}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
