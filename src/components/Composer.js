import React from 'react';

const Composer = (props) => {
    return ( 
        <form className='chat-form' onSubmit={this.handleSubmit}>
                    <input 
                        className='chat-input' 
                        type='text' 
                        value={this.state.messageInput} 
                        name='messageInput' 
                        onChange={this.handleInput} 
                    />
                    <button type='submit'>Send</button>
                </form>
     );
}
 
export default Composer;