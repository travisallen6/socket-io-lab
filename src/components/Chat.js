import React, { Component } from 'react';
import io from 'socket.io-client'
import Modal from './Modal'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        messageInput: '',
        userInput: '',
        messages: [],
        userName: ''
    };
  }

  componentDidMount(){
     this.socket = io(); // Remove when not running two servers
     this.socket.on('message', (message) => {
         this.setState({messages: [message, ...this.state.messages]})
     })
  }

  handleInput = ({target:{value, name}}) => {
    this.setState({
        [name]: value
    })
  }

  userSubmit = (e) => {
      e.preventDefault();
      this.setState({
          userName: this.state.userInput
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {messages, messageInput: text, userName} = this.state
    if(text){
        const newMessage = {
            body: text,
            from: 'me'
        }
        this.socket.emit('message', {body: text, from: userName})
        this.setState({
            messages: [newMessage, ...messages],
            messageInput: ''
        })
    }
  }

  setUser = (e) => {
      const {userInput} = this.state
      e.preventDefault();
      this.setState({
          userInput: '',
          userName: userInput

      })
  }

  render() {
      const displayMessages = this.state.messages.map( (msg, i) => {
          const msgClass = msg.from === 'me' ? 'user' : 'other';
            return (
                <div key={i} class={'chat-msg ' + msgClass}>
                    <p>{msg.body}</p>
                    <p className='chat-msg-from'>{msg.from}</p>
                </div>
            )
        })

    return (
        <div>
            {/* <div>
                <p>ID: {this.state.id}</p>
                <p>User Name: {this.state.userName}</p>
                <form  onSubmit={this.userSubmit}>
                    <label htmlFor="userInput">Pick User Name</label><br />
                    <input type="text" name="userInput" onChange={this.handleInput}/>
                    <button type="submit">Set Username</button>
                </form>
            </div> */}
            <div className='chat-msg-container'>
                {displayMessages}
            </div>
            <form className='chat-form' onSubmit={this.handleSubmit}>
                <input className='chat-input' type='text' value={this.state.messageInput} name='messageInput' onChange={this.handleInput} />
                <button type='submit'>Send</button>
            </form>
            { !this.state.userName && 
            <Modal 
                updateUser={this.handleUserInput}
                handleInput={this.handleInput}
                userName={this.state.userInput}
                setUser={this.setUser}
            /> 
            }
        </div>
    )
  }
}

export default Chat;
