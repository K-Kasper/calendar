import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { nanoid } from 'nanoid';

import Topbar from './components/Topbar';
import EventCreator from './components/EventCreator';
import View from './components/View';
// import Toaster from './components/Toaster';

let saving = false;

export default function App() {
  const [events, setEvents] = useState([
    {
      id: nanoid(),
      date: '5.6.2022',
      name: 'Your first event',
      startTime: '20:00',
      endTime: '21:15',
      description: 'Description',
      progress: 1,
    },
  ]);

  useEffect(() => {
    if (saving === true) {
      localStorage.setItem('calendar', JSON.stringify(events));
    }
  }, [events]);

  useEffect(() => {
    async function allowSaves() {
      if (localStorage.getItem('calendar') !== null) {
        await setEvents(JSON.parse(localStorage.getItem('calendar')));
        saving = true;
      }
    }
    allowSaves();
  }, []);

  const inputFields = [
    'name',
    'date',
    'startTime',
    'endTime',
    'description',
    'progress',
  ];

  var today = new Date();

  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  return (
    <main>
      <Topbar />
      <Container className="view">
        <div className="mt-3 mb-3 d-flex justify-content-between">
          <EventCreator fields={inputFields} setEvents={setEvents} />
          <h3>
            {time} | {date}
          </h3>
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
