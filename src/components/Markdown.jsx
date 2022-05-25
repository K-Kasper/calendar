import { useEffect, useState } from 'react';

import { marked } from 'marked';

export default function Markdown(props) {
  const [mdText, setMdText] = useState('');

  useEffect(() => {
    if (props.input) {
      setMdText(props.input);
    }
  }, [props.input]);

  marked.setOptions({
    breaks: true,
  });

  // function handleChange(e) {
  //   setMdText(e.target.value);
  // }

  return (
    // <div
    // style={{
    //   display: 'flex',
    //   flexDirection: 'column',
    //   flexWrap: 'wrap',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   paddingTop: '60px',
    //   gap: '10px',
    // }}
    // >
    //   <textarea
    //     // style={{ width: '80%', rezise: 'none' }}
    //     id="editor"
    //     rows="20"
    //     value={mdText}
    //     onChange={handleChange}
    //   />
    <div
      // style={{ width: '80%', rezise: 'none' }}
      id="preview"
      dangerouslySetInnerHTML={{ __html: marked.parse(mdText) }}
    />
    // <div>
  );
}
