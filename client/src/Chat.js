import React, { useEffect, useState } from 'react'
import {Button, Flex, Input} from  '@chakra-ui/react';
import {ArrowForwardIcon} from '@chakra-ui/icons'
import ScrollToBottom from 'react-scroll-to-bottom'
import './index.scss'
function Chat({socket, usename, room}) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);



    const sendMessage = async () => {
        if(currentMessage !== '') {
            const messageData = {
                room: room,
                username :usename ,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()

            }
            await socket.emit('send_message', messageData)
           setMessageList((list) => [...list, messageData])
           setCurrentMessage(' ')
        }
    }

    
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    },[socket])

  return (
    <div className='chatContainer'>
        <div>
            <p>ChatTime</p>
        </div>
        <div className='messageBody'>
            <ScrollToBottom className='message-container'>
           {messageList.map((messageContent) => {
                return (
                    <div className='messageContainer'
                     id={usename === messageContent.username ? 'You' : 'Other'}>
                        <div className='messageIndividual'>
                            <div className='messageContent'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='messageData'>
                                <p className='time'>{messageContent.time}</p>
                                <p className='username'>{messageContent.username}</p>
                            </div>
                        </div>
                    </div>
                )
           })}
           </ScrollToBottom>
        </div>
        <Flex>
        <Input variant='filled' placeholder='Enter a message....'
            value={currentMessage}
            onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
          onKeyPress={(event) => {event.key === 'Enter' && sendMessage()}}
        />
        <Button colorScheme='messenger' onClick={sendMessage}><ArrowForwardIcon/></Button>
        </Flex>
    </div>
  )
}

export default Chat
