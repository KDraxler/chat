import { ContainerApp } from './appStyle';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './views/Register';
import Login from './views/Login';
import { Chat } from './views/chat/Chat';
import Avatar from './views/avatar/Avatar';
import PerfectScrollbar from 'react-perfect-scrollbar'

function App() {
  
  return (
    <ContainerApp backgroundColor='#aef8ff'>
      <PerfectScrollbar>
        <BrowserRouter>
          <Routes>
            <Route path='/Register' element={<Register/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Avatar' element={<Avatar/>} />
            <Route path='/' element={<Chat/>} />
          </Routes>
        </BrowserRouter>
      </PerfectScrollbar>
    </ContainerApp>
  );
}

export default App;
