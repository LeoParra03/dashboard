import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Body from './Body'; // Importa el nuevo componente Body

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <div className="main-container">
        <Sidebar openSidebarToggle={openSidebarToggle} />
        <Body /> 
      </div>
    </div>
  );
}

export default App;

