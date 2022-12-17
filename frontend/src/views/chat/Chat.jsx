import React from 'react'
import socket from '../../common/Socket';


export const Chat = () => {
    socket.off('receive_messagesss').on('receive_messagesss', (data)=>{
        // setName({...name, receive:data.name})
        // setChat([...chat, {messages : data.message, flag:'receive', avatar:data.avatar, name:data.name}]) 
        console.log(data);
    
    })
  return (
    <div>Chat</div>
  )
}
