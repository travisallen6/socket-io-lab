import React, { Component } from 'react';

const Modal = (props) => {
    return ( 
        <div className="modal-shadow">
            <div className="modal-card">
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
            </div>
        </div>
     );
}
 
export default Modal;