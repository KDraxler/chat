import {useState, useEffect} from 'react'
import socket from '../../utils/Socket';
import axios from 'axios';
import { Box, TextField } from "@mui/material";
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../../utils/APIRoutes';
import Contacts from '../../component/Contacts';

export const Chat = () => {
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const localStrg = async () => {
            if(!localStorage.getItem('chat-app-user')){
                navigate('/login')
            }else{
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
            }

        }
        localStrg();
    },[])

    useEffect(()=>{
        const getUser = async () => {
            if(currentUser){
                if(currentUser.isAvatar){
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                    setContacts(data.data)
                }else{
                    navigate('/avatar')
                }
            }
        }

        getUser();
    },[currentUser])



  return (
    <Container>
        <Box className='container-box'>
            <Contacts contacts={contacts} currentUser={currentUser}/>

        </Box>
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .container-box{
        display: grid;
        grid-template-columns: 25% 75%;
        gap: 1rem;
        height: 85vh;
        width: 85vw;
        border-radius: 16px;
        padding: 30px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(6.5px);
        -webkit-backdrop-filter: blur(6.5px);

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
            
        }
    }
`
