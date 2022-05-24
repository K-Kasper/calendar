import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { nanoid } from 'nanoid';

import Topbar from './components/Topbar';
import EventCreator from './components/EventCreator';
import View from './components/View';
// import Toaster from './components/Toaster';

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
        <div className="mt-3 mb-3 d-flex justify-content-between">
          <EventCreator fields={inputFields} setEvents={setEvents} />
          <DropdownButton id="dropdown-basic-button" title="View">
            <Dropdown.Item href="#/action-1">1 day</Dropdown.Item>
            <Dropdown.Item href="#/action-2">3 days</Dropdown.Item>
            <Dropdown.Item href="#/action-3">7 days</Dropdown.Item>
          </DropdownButton>
        </div>
        <View events={events} fields={inputFields} setEvents={setEvents} />
      </Container>
    </main>
  );
}
