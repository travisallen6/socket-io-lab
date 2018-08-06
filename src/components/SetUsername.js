import React from 'react';
import Modal from './ModalUI'

const SetUsername = (props) => {
    return ( 
        <Modal>
            <h1>Pick a Username</h1>
            <form className='modal-form' onSubmit={props.setUser}>
                <input
                    className='modal-input' 
                    type="text" 
                    value={props.userName} 
                    onChange={props.handleInput} name='userInput' 
                />
                <br />
                <button className='modal-button' type="submit">Update User</button>
            </form>
        </Modal>
     );
}
 
export default SetUsername;