import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';


import Box from '@mui/material/Box';
import { autocompleteClasses } from '@mui/material';

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
        (element) => <Indicator key={element[1]} title={element[1]} subtitle={element[0]} value={element[2]} />
      );

      setIndicators(indicatorsElements);


			console.log(dataToIndicators)
    })();
  }, []);

  return (
    <main className='main-content'>

      <Grid container spacing={5}>
      <Grid xs={12} sm={12} md={12} lg={12}><h2 className="h2" id='tiempo'>Tiempo actual de Guayaquil</h2></Grid>
      <Grid xs={12} sm={12} md={12} lg={12}>
                    <Summary></Summary>
             </Grid>
        <Grid xs={12} sm={12} md={12} lg={12}><h2 className="h2" id='indicadores'>Indicadores del día de hoy</h2></Grid>


     
        <Grid xs={6} sm={4} md={3} lg={4}> {indicators[0]}</Grid>
        <Grid xs={6} sm={4} md={3} lg={4}> {indicators[1]}</Grid>
        <Grid xs={6} sm={4} md={3} lg={4}> {indicators[2]}</Grid>
       

        <Grid xs={12} sm={12} md={12} lg={12}><h2 className="h2" id='graficos'>Graficos con datos</h2></Grid>
        <Grid xs={12} lg={12}>
        <Box bgcolor= "lightgray" p={2} borderRadius={2}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <ControlPanel setSelectedVariable={setSelectedVariable} />
            <WeatherChart selectedVariable={selectedVariable} />

        </div> 
        </Box>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12}><h2 className="h2" id="pronostico">Pronosticos para los siguientes dias</h2></Grid>
        
        <Grid xs={12} sm={12} md={12} lg={12}><BasicTable/></Grid>
        
      </Grid>
    </main>
  );
}

export default Body;
