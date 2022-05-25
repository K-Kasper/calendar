import { Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';

import { useReward } from 'react-rewards';

import EventModifier from './EventModifier';

export default function View(props) {
  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  // const { reward, isAnimating } = useReward('rewardId', 'emoji');

  function eventDone(id) {
    props.setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, progress: 100 } : event
      )
    );
    reward();
  }

  function eventRemove(id) {
    props.setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== id)
    );
  }

  function progress(progress) {
    if (progress >= 100) {
      return <ProgressBar variant="success" now={progress} />;
    }
    return <ProgressBar animated now={progress} />;
  }

  const eventList = props.events.map((event) => {
    return (
      <Card style={{ width: 'auto' }} key={event.id}>
        <Card.Body>
          <Card.Title>
            {event.name} | {event.startTime} - {event.endTime}
          </Card.Title>
          <Card.Text>{event.description}</Card.Text>
          {progress(event.progress)}
          <Col className="mt-3 mb-3 d-flex justify-content-between gap-5">
            <Button
              variant="success"
              disabled={isAnimating}
              onClick={() => eventDone(event.id)}
            >
              <span id="rewardId" />
              Done
            </Button>
            <EventModifier
              event={event}
              setEvents={props.setEvents}
              fields={props.fields}
            />
            <Button
              className="btn btn-danger"
              onClick={() => eventRemove(event.id)}
            >
              Remove
            </Button>
          </Col>
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
