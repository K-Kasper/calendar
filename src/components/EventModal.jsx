import { useState } from 'react';
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';

export default function EventModal(props) {
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

  const validityCheckAll = () => {
    const result = Object.keys(props.input)
      .reverse()
      .map((i) => {
        const e = document.getElementById(i);
        return validityCheck(e);
      });

    return !result.includes(false);
  };

  const validityCheck = (e) => {
    if (e.value.length < 1 || e.value.length > 30) {
      e.className = 'form-control is-invalid';
      e.focus();
      return false;
    } else {
      e.className = 'form-control is-valid';
      return true;
    }
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
      <Form.Control.Feedback type="invalid">
        {fixPlaceholder(i[0])} has to be 1-30 characters long.
      </Form.Control.Feedback>
    </FloatingLabel>
  ));

  function handleInput(event) {
    validityCheck(event.target);
    props.setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (validityCheckAll()) {
      props.handleSave();
      handleClose();
    }
  };

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
        <Form noValidate onSubmit={handleSave}>
          <Modal.Body>{inputFields}</Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {props.submitButton}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
