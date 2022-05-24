import { useState } from 'react';
import { Button, FormControl, Modal, InputGroup } from 'react-bootstrap';

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
    <InputGroup className="mb-3" key={index}>
      <FormControl
        placeholder={fixPlaceholder(i[0])}
        name={i[0]}
        onChange={handleInput}
        value={i[1]}
      />
    </InputGroup>
  ));

  function handleInput(event) {
    props.setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSave() {
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
        <Modal.Body>{inputFields}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
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
