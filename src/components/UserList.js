import React from 'react';

const UserList = (props) => {
    
    return ( 
        <div className="userlist-container">
            <div>
                <h2>Users</h2>
                <h4>{props.user}</h4>
                {
                    props.users
                    .filter( ( user ) => {
                        if(!user.name || user.id === props.socketId) return false;
                        else return true;
                    }).map( ({id, name, selected}) =>{
                        const userStyle = selected ? {backgroundColor: 'dodgerblue' } : {} 
                        return <p key={id} style={userStyle} onClick={() => props.selectItem(id)}>{name}</p>
                    })
                }
            </div>
        </div> 
     );
}
 
export default UserList;