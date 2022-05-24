import { useState, useEffect } from 'react';

import EventModal from './EventModal';

import { nanoid } from 'nanoid';

const fields = {};

export default function EventCreator(props) {
  const [input, setInput] = useState({});

  useEffect(() => {
    for (let i = 0; i < props.fields.length; i++) {
      fields[props.fields[i]] = '';
    }
    setInput(fields);
  }, [props.fields]);

  function handleSave() {
    props.setEvents((prevEvents) => [
      {
        id: nanoid(),
        ...input,
      },
      ...prevEvents,
    ]);
    setInput(fields);
  }

  return (
    <EventModal
      input={input}
      setInput={setInput}
      handleSave={handleSave}
      title={'New event'}
      button={'New event'}
    />
  );
}
