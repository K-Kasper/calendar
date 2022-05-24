import { useState } from 'react';

import { Row, Col, Toast, Button } from 'react-bootstrap';

export default function Toaster() {
  const [show, setShow] = useState(false);

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Calendar</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>Event removed successfully</Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </Col>
    </Row>
  );
}
