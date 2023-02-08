import { Box, TextField, Button } from '@mui/material'
import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Loader from '../../assets/Loader.svg'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { AvatarRoute } from '../../utils/APIRoutes'
import { Buffer } from 'buffer'
import { defAvatar } from './def'

const Avatar = () => {
    const api= 'https://api.multiavatar.com/45678945'
    const navigate=useNavigate()

    const [avatars,setAvatars]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [selAvatar,setSelAvatar]=useState(null)

    const optionAlert={
        position:'bottom-right',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:'light'

    }

    const setProfilPic = async ()=>{
        if(selAvatar===null){
            toast.error('Plese select avatar', optionAlert)
            return false;
        }else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'))
            const {data} = await axios.post(`${AvatarRoute}/${user._id}`,{
                image:avatars[selAvatar]
            })
            console.log(data)
            if(data.isSet){
                user.isAvatar=true
                user.avatarImage=data.image
                localStorage.setItem('chat-app-user', JSON.stringify(user))
                navigate('/')
            }else{
                toast.error('Failed to set avatar, please try again.', optionAlert)
            }
        }
    }
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login')
        }
    },[])
    useEffect( ()=>{
        const random = async () => {
            const data =[]
            let valid =true
            for (let i = 0; i < 4; i++) {
                try {
                    const image = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    )
                    const buffer = new Buffer(image.data)
                    data.push(buffer.toString('base64'))    
                } catch (error) {
                    valid=false
                }
                
            }
            if(valid===false){
                setAvatars(defAvatar)
            }else{
                setAvatars(data)
            }
            
            setIsLoading(false)
        }
        random();
    },[])
  return (
    <>
    
    <Container>
        <Box className='container-box'>
        
            <Box className='title-container'>
                <h1>Pick your avatar</h1>
            </Box>
            
            <Box className='avatars'>
                {   
                    isLoading 
                    ?
                    <img src={Loader} alt="loader" />
                    :
                    avatars.map((avatar,index)=>{
                        return(
                            <Box 
                                key={index} 
                                className={`avatar ${selAvatar===index?'selected':''}`}
                            >
                                <img 
                                    src={`data:image/svg+xml;base64,${avatar}`} 
                                    alt="avatar" 
                                    onClick={()=>setSelAvatar(index)}

                                />
                            </Box>
                        )
                    })
                }
            </Box>
            <Button type='submit' variant="contained" onClick={setProfilPic}>
                Set as profile picture
            </Button>
        </Box>

    </Container>
    <ToastContainer/>
    </>
        
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        height: fit-content;
        width: fit-content;
        border-radius: 16px;
        padding: 30px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(6.5px);
        -webkit-backdrop-filter: blur(6.5px);
        .loader{
            max-inline-size: 100%;
        }
        .title-container{
            h1{
                color: #234a59;
            }
        }
        .avatars{
            display: flex;
            gap: 1rem;
            
            .avatar{
                border: 0.4rem solid transparent;
                padding: 0.4rem;
                border-radius: 5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.5s ease-in-out;
                img{
                    height: 6rem;
                }
            }
            .selected{
                border: 0.4rem solid #c8ffff;
                border-radius: 6rem;
                
            }
        }
        button{
            /* background:linear-gradient(173deg, rgba(33, 150, 243, 1) 0%, rgba(21, 101, 192, 1) 100%); */
            background:#2196f3;
            color: #c8ffff;
        }
    }
    
`
export default Avatar