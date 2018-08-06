import React from 'react';

const MessageBox = (props) => {
    const displayMessages = props.messages.map( (msg, i) => {
        const msgClass = msg.from === 'me' ? 'user' : 'other';
          return (
              <div key={i} class={'chat-msg ' + msgClass}>
                  <p>{msg.body}</p>
                  <p className='chat-msg-from'>{msg.from}</p>
              </div>
          )
      })

    return ( 
        <div className='chat-msg-container'>
            {displayMessages}
        </div>
     );
}
 
export default MessageBox;