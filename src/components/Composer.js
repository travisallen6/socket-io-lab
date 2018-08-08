import React, {Component} from 'react';

export default class Composer extends Component {
    constructor() {
        super();
        this.state = {
            messageInput: '',
            dropdown: 'general'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {userName, socket} = this.props
        const {messageInput: text} = this.state

        if(text){
            const newMessage = {
                body: text,
                from: 'me'
            }
            this.props.updateMessages(newMessage)
            socket.emit('message', {body: text, from: userName})
            }
            this.setState({
                messageInput: ''
            })
        }

      handleInput = ({target:{value, name}}) => {
        this.setState({
            [name]: value
        })
      }

    render(){
        return ( 
            <form 
                className='chat-form' 
                onSubmit={this.handleSubmit}
            >
                <input 
                    className='chat-input' 
                    type='text' 
                    value={this.state.messageInput} 
                    name='messageInput' 
                    onChange={this.handleInput} 
                />
                <button 
                    type='submit'
                >
                Send
                </button>
            </form>
        );
    }
}