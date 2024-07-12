
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudIcon from '@mui/icons-material/Cloud';
import MonitorIcon from '@mui/icons-material/Monitor';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Sidebar() {
  return (
    <aside id="sidebar">
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          ClimaticTime
        </div>
       
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
        <a href="#tiempo"><AccessTimeIcon className='icon'/>Tiempo</a>
        </li>
        <li className='sidebar-list-item'>
        <a href="#indicadores"><ThermostatIcon className='icon'/>Indicadores</a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#graficos"><BarChartIcon className='icon'/>Grafico</a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#pronostico"><CloudIcon className='icon'/>Pronostico</a>
        </li>
        <li className='sidebar-list-item'>
          <a href=""><MonitorIcon className='icon'/>Monitoreo</a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
