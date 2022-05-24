import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { nanoid } from 'nanoid';

import Topbar from './components/Topbar';
import EventCreator from './components/EventCreator';
import View from './components/View';
import Toaster from './components/Toaster';

export default function App() {
  const [events, setEvents] = useState([
    {
      id: nanoid(),
      name: 'Your first event',
      startTime: '20:00',
      endTime: '21:15',
      description: 'Description',
      progress: 1,
    },
  ]);

  const inputFields = [
    'name',
    'startTime',
    'endTime',
    'description',
    'progress',
  ];

  return (
    <main>
      <Topbar />
      <Container className="view">
        <EventCreator fields={inputFields} setEvents={setEvents} />
        <View events={events} fields={inputFields} setEvents={setEvents} />
      </Container>
    </main>
  );
}
