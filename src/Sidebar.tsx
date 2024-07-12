import React from 'react';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudIcon from '@mui/icons-material/Cloud';
import MonitorIcon from '@mui/icons-material/Monitor';

function Sidebar({ openSidebarToggle}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          ClimaticTime
        </div>
       
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
        <a href=""><ThermostatIcon className='icon'/>Indicadores</a>
        </li>
        <li className='sidebar-list-item'>
          <a href=""><BarChartIcon className='icon'/>Grafico</a>
        </li>
        <li className='sidebar-list-item'>
          <a href=""><CloudIcon className='icon'/>Pronostico</a>
        </li>
        <li className='sidebar-list-item'>
          <a href=""><MonitorIcon className='icon'/>Monitoreo</a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
