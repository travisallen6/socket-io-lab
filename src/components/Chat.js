import React, { Component } from 'react';
import io from 'socket.io-client'
import SetUsername from './SetUsername'
import UserList from './UserList'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messageInput: '',
        userInput: '',
        userName: '',
        socketId: '',
        messages: [],
        users: []
    };
  }

  componentDidMount(){
     this.socket = io('http://localhost:3010'); // Remove when not running two servers
     this.socket.on('message', (message) => {
         this.setState({messages: [message, ...this.state.messages]})
     })
     this.socket.on('users', users => {
         users = users.map( user => {
             user.selected = false;
             return user;
         })
         this.setState({
             users: users
         })
     })
     this.socket.on('id', socketId => {
         console.log('id: ' + socketId)
         this.setState({ socketId })
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
      e.preventDefault();
      const {userInput} = this.state
      this.setState({
          userInput: '',
          userName: userInput
      })

      this.socket.emit('username', userInput) 
  }

  toggleSelected = (id) => {
      const newUsers = this.state.users.map( user => {
          if(user.id === id) user.selected = !user.selected;
          return user;
      })
      this.setState({users: newUsers})
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
            { !this.state.userName && 
            <SetUsername 
                updateUser={this.handleUserInput}
                handleInput={this.handleInput}
                userName={this.state.userInput}
                setUser={this.setUser}
            /> 
            }
            <div className="chat-upper">
                <UserList 
                    user={this.state.userName}
                    users={this.state.users}
                    socketId={this.state.socketId}
                    selectItem={this.toggleSelected}
                />
                <div className='chat-msg-container'>
                    {displayMessages}
                </div>
                <form className='chat-form' onSubmit={this.handleSubmit}>
                    <input className='chat-input' type='text' value={this.state.messageInput} name='messageInput' onChange={this.handleInput} />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
  }
}

export default Chat;
