import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import Box from '@mui/material/Box';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudIcon from '@mui/icons-material/Cloud';

function Body() {
  let [indicators, setIndicators] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState(-1);

  useEffect(() => {
    (async () => {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=7609ca8e4a0f92c157b6c2f3ecdfca9e`);
      let savedTextXML = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      let dataToIndicators = [];
      let nombreCiudad = xml.getElementsByTagName("name")[0].textContent;
      let location = xml.getElementsByTagName("location")[1];
      let latitude = location.getAttribute("latitude");
      dataToIndicators.push([nombreCiudad, "Latitude", latitude]);
      let altitud = location.getAttribute("altitude");
      dataToIndicators.push([nombreCiudad, "Altitud", altitud]);
      let longitude = location.getAttribute("longitude");
      dataToIndicators.push([nombreCiudad, "Longitude", longitude]);

      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator key={element[1]} title={element[1]} subtitle={element[0]} value={element[2]}/>
      );

      setIndicators(indicatorsElements);
    })();
  }, []);

  return (
    <main className='main-content'>
      <Grid container spacing={5}>
       
        <Grid xs={12} sm={12} md={12} lg={12} className="summary" id='tiempo'>
          <Summary />
        </Grid>
        <Grid xs={12} className="subtitu"><h2 className="h2" id='indicadores'><ThermostatIcon className='icon'/>Indicadores del día de hoy</h2></Grid>
        <Grid xs={6} sm={4} md={3} lg={4} className="card indi">{indicators[0]}</Grid>
        <Grid xs={6} sm={4} md={3} lg={4} className="card indi">{indicators[1]}</Grid>
        <Grid xs={6} sm={4} md={3} lg={4} className="card indi">{indicators[2]}</Grid>
        <Grid xs={12} className="subtitu"><h2 className="h2" id='graficos'><BarChartIcon className='icon'/>Graficos con datos</h2></Grid>
        <Grid xs={12}>
          <Box bgcolor="lightgray" p={2} borderRadius={2} className="card">
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              <ControlPanel setSelectedVariable={setSelectedVariable} />
              <WeatherChart selectedVariable={selectedVariable} />
            </div>
          </Box>
        </Grid>
        <Grid xs={12} className="subtitu"><h2 className="h2" id="pronostico"><CloudIcon className='icon'/>Pronosticos para los siguientes días</h2></Grid>
        <Grid xs={12} className="card">
          <BasicTable />
        </Grid>
      </Grid>
    </main>
  );
}

export default Body;

