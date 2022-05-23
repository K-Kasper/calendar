import { nanoid } from 'nanoid';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';

import EventModifier from './EventModifier';

export default function View(props) {
  const eventList = props.events.map((event) => {
    // event.id = nanoid();
    return (
      <Card style={{ width: 'auto' }} key={event.id}>
        <Card.Body>
          <Card.Title>
            {event.name} | {event.startTime} - {event.startTime}
          </Card.Title>
          <Card.Text>{event.description}</Card.Text>
          <ProgressBar animated now={45} />
          <EventModifier event={event} setEvents={props.setEvents} />
          {/* <Button variant="primary">Edit</Button> */}
        </Card.Body>
      </Card>
    );
  });

  return (
    <Row>
      <Col className="day">
        <Card>
          <Card.Header as="h5">Monday</Card.Header>
          {eventList}
        </Card>
      </Col>
    </Row>
  );
}
