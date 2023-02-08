import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/image/logo.png'
import { Box, TextField } from "@mui/material";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';


const Contacts = (props) => {
    const [currentUserName, setCurrentUserName] = useState(null)
    const [currentUserImage, setCurrentUserImage] = useState(null)
    const [currentSelected, setCurrentSelected] = useState(null)

    useEffect(()=>{
        if(props.currentUser){
            setCurrentUserImage(props.currentUser.avatarImage)
            setCurrentUserName(props.currentUser.username)
        }
    },[props.currentUser])
    const changeCurrentChat = (index, contact) => {

    }
  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
              <Box className='brand'>
                <img src={Logo} alt="Logo" />
                <h3>TempChat</h3>
              </Box>
              <PerfectScrollbar>
                <Box className='contacts'>
                  {
                    props.contacts.map((contact, index)=>{
                      return(
                        <Box className={`contact ${index === currentSelected?'selected':''}`} key={index}>
                          <Box className='avatar'>
                            <img 
                              src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                              alt="avatar"  />
                          </Box>
                          <Box className='username'>
                            <h3>{contact.username}</h3>
                          </Box>
                        </Box>
                      )
                    })
                  }
                </Box>
              </PerfectScrollbar>

              <Box className='current-user'>
              <Box className='avatar'>
                <img 
                  src={`data:image/svg+xml;base64,${currentUserImage}`} 
                  alt="avatar"  />
              </Box>
              <Box className='username'>
                <h3>{currentUserName}</h3>
              </Box>
              </Box>
          </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
    /* display: grid; */
    /* grid-template-rows: 10% 75% 15%; */
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    padding: 10px;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(6.5px);
    -webkit-backdrop-filter: blur(6.5px);
    .brand{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      img{
        height: 2rem;
      }
      h3{
        color: #234a59;
      }
    }
    .contacts{
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      .contact{
        min-height: 4rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.2rem;
        gap: 1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        &:hover{
          background-color: #c8ffff;
        }
        .avatar{
          display: flex;
          img{
            height: 3rem;
          }
        }
        .username{
          h3{
            color: #234a59;
          }
        }
      }
      .selected{
        background-color: #234a59;
      }
    }
    .current-user{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #234a59;
      gap: 2rem;
      .avatar{
        img{
          height: 4rem;
          max-inline-size: 100%;
        }
      }
      .username{
        h2{
          color: #234a59;
        }
      }
    }

`

export default Contacts