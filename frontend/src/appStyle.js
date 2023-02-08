import styled from "styled-components";
import background from './assets/image/bg.png'
export const ContainerApp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: ${(props)=>props.backgroundColor}; */
    /* background-image: url(${background}); */
    background-size: cover;
    height: 100vh;
    /* global 94%+ browsers support */
    background:linear-gradient(315deg, rgba(0, 255, 194, 1) 0%, rgba(0, 188, 212, 1) 44%, rgba(238, 130, 232, 1) 100%);

`