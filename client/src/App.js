import io from 'socket.io-client'
import Chat from './Chat'
import { Button, Input, Card, CardHeader, Flex, Divider, Container  } from '@chakra-ui/react';
import { useState } from 'react';
// import { Input } from '@chakra-ui/react'
const socket = io.connect('http://localhost:3001')

function App() {
  const [usename, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if(usename !== '' && room !== ''){
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  
  return (
<>
  {!showChat ? (
  <Container maxW='md' >
    <Card  maxW='md' >
      <CardHeader>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
      <p>Join A chat</p>
      <Button colorScheme='teal' variant='outline' onClick={joinRoom}>Join Room</Button>
      <Input variant='flushed' type="text" placeholder='User' onChange={(event) => {
        setUsername(event.target.value)
      }}/>
      <Input variant='flushed' type="text" placeholder='Room ID'
      onChange={(event) => {
        setRoom(event.target.value)
      }}
      />
      </Flex>
      </CardHeader>
      </Card>
      </Container>
      // <Divider/>
      ) : ( 
      <Chat socket={socket} usename={usename} room={room}/>
      )}
    </>

  );
}

export default App;
