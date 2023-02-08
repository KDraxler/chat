import styled from "styled-components";

export const ContainerChat = styled.div`
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 50%;
    border-radius: 16px;
    padding: 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(6.5px);
    -webkit-backdrop-filter: blur(6.5px);
`

export const ChatList = styled.div`
    /* background-color: green; */

`   

export const InputForm = styled.div`

    padding-top: 10px;
    /* background-color: aqua; */
    display: flex;
    gap: 20px;
`

