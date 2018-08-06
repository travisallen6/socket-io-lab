import React from 'react';

const Tabs = (props) => {
    const genTabClass = !props.tabSecret ? 'tab-selected' : 'tab-other';
    const SecTabClass = props.tabSecret ? 'tab-selected' : 'tab-other';
    return ( 
            <div className="chat-tabs">
                <button 
                    className={`chat-tabs-btn ${genTabClass}`}
                    onClick={() => props.updateRoom(false)}
                >
                General
                </button>
                <button 
                    className={`chat-tabs-btn ${SecTabClass}`}
                    onClick={() => props.updateRoom(true)}
                >Secret</button>
            </div>        
     );
}
 
export default Tabs;