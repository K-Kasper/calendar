import { useState, useEffect } from 'react';

import EventModal from './EventModal';

export default function EventModifier(props) {
  const [input, setInput] = useState({});

  useEffect(() => {
    const fields = { ...props.event };
    delete fields.id;
    setInput(fields);
  }, [props.event]);

  function handleSave() {
    props.setEvents((prevEvents) => [
      {
        id: props.event.id,
        ...input,
      },
      ...prevEvents.filter((event) => event.id !== props.event.id),
    ]);
  }

  const title = `Editing: ${props.event.name}`;

  return (
    <EventModal
      input={input}
      setInput={setInput}
      handleSave={handleSave}
      title={title}
    />
  );
}
