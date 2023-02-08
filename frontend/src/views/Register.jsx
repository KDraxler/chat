import { Box, TextField, Button } from '@mui/material'
import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/image/logo.png'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { RegisterRoute } from '../utils/APIRoutes'

const Register = () => {
    const navigate = useNavigate()
    const [values, setValues]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(handleValidation()){
            const {username, email, password}=values;
            const {data}= await axios.post(RegisterRoute,{
                username,email,password
            })

            if(data.status===false){
                toast.error(data.msg, optionAlert)
                return false;
            }

            if(data.status===true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/login')
            }

        }
    }
    const handleChange=(e)=>{
        setValues({...values, [e.target.name]:e.target.value})
    }
    const optionAlert={
        position:'bottom-right',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:'light'

    }
    const handleValidation=()=>{
        const {username, email, password, confirmPassword}=values;

        if(username.length<3){
            toast.error('Username must be greater than 3.', optionAlert)
            return false;
        }
        else if(password.length<8){
            toast.error('Password must be greater than 8.', optionAlert)
            return false;
        }else if(password!=confirmPassword){
            toast.error('Password and confirm password must be same', optionAlert)
            return false;
        }
        return true;
    }
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    },[])
   
  return (
    <>
    <FormContainer>
        <Box component='form' onSubmit={(e)=> handleSubmit(e)}>
            <Box className='brand'>
                <img component='img' src={Logo} alt='Logo' />
                <h1>TempChat</h1>
            </Box>
            <PerfectScrollbar>
                <TextField
                    required
                    label="Username"
                    name='username'
                    id="standard-username-small"
                    size="small"
                    variant="standard"
                    onChange={(e)=>handleChange(e)}
                />
                <TextField
                    required
                    type='email'
                    label="Email"
                    name='email'
                    id="standard-email-small"
                    size="small"
                    variant="standard"
                    onChange={(e)=>handleChange(e)}
                />
                <TextField
                    required
                    type='password'
                    label="Password"
                    name='password'
                    id="standard-password-small"
                    size="small"
                    variant="standard"
                    onChange={(e)=>handleChange(e)}
                />
                <TextField
                    required
                    type='password'
                    label="Confirm Password"
                    name='confirmPassword'
                    id="standard-confirmPassword-small"
                    size="small"
                    variant="standard"
                    onChange={(e)=>handleChange(e)}
                />
                <Button fullWidth type='submit' variant="contained">
                    Register
                </Button>
                <Box component='span'>Already have account? <Link to='/login'>Login</Link> </Box>
            </PerfectScrollbar>
        </Box>
    <ToastContainer/>
    </FormContainer>
    </>
  )
}
const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .brand{
        display: flex;
        align-items: center;
        gap: 0.8rem;
        justify-content: center;
        h1{
            color: #234a59;
        }
        img{
            height: 70px;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        height: 450px;
        width: 350px;
        border-radius: 16px;
        padding: 30px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(6.5px);
        -webkit-backdrop-filter: blur(6.5px);
        .scrollbar-container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;
            
            button{
                /* background:linear-gradient(173deg, rgba(33, 150, 243, 1) 0%, rgba(21, 101, 192, 1) 100%); */
                background:#2196f3;
                color: #c8ffff;
            }
            span{
                color: #234a59;
                align-self: flex-end;
                a{
                    color: #234a59;
                    text-decoration: none;
                    font-weight: 600;
                    &:hover{
                        color: #2196f3;
                    }
                }
            }
            
        }
    }
`
export default Register