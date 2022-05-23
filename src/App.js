import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { nanoid } from 'nanoid';

import Topbar from './components/Topbar';
import EventCreator from './components/EventCreator';
import View from './components/View';

export default function App() {
  const [events, setEvents] = useState([
    {
      name: 'Your first event',
      startTime: '20:00',
      description: 'Description',
      id: nanoid(),
    },
  ]);

  return (
    <main>
      <Topbar />
      <Container className="view">
        <EventCreator setEvents={setEvents} />
        <View
          events={events}
          setEvents={setEvents}
          EventCreator={EventCreator}
        />
      </Container>
    </main>
  );
}
