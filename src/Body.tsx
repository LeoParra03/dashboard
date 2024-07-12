import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';

function Body() {
  let [indicators, setIndicators] = useState([]);
  let [rowsTable, setRowsTable] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=7609ca8e4a0f92c157b6c2f3ecdfca9e`);
      let savedTextXML = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      let dataToIndicators = [];

      let location = xml.getElementsByTagName("location")[1];
      let geobaseid = location.getAttribute("geobaseid");
      dataToIndicators.push(["Location", "geobaseid", geobaseid]);

      let latitude = location.getAttribute("latitude");
      dataToIndicators.push(["Location", "Latitude", latitude]);

      let longitude = location.getAttribute("longitude");
      dataToIndicators.push(["Location", "Longitude", longitude]);

      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator key={element[1]} title={element[0]} subtitle={element[1]} value={element[2]} />
      );

      setIndicators(indicatorsElements);

      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];
        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");

        return { "rangeHours": rangeHours, "windDirection": windDirection };
      });

      arrayObjects = arrayObjects.slice(0, 8);
      setRowsTable(arrayObjects);
    })();
  }, []);

  return (
    <main className='main-content'>
      <Grid container spacing={5}>
      <Grid xs={6} sm={4} md={3} lg={2}>{indicators[0]}</Grid>
          <Grid xs={6} sm={4} md={3} lg={2}>{indicators[1]}</Grid>
          <Grid xs={6} sm={4} md={3} lg={2}>{indicators[2]}</Grid>
          <Grid xs={6} sm={4} md={3} lg={2}>{indicators[0]}</Grid>
          <Grid xs={6} sm={4} md={3} lg={2}>{indicators[1]}</Grid>
          <Grid xs={6} sm={4} md={3} lg={2}>{indicators[2]}</Grid>

        <Grid xs={6} sm={4} md={3} lg={2}><Summary /></Grid>
        <Grid xs={12} sm={6} md={6} lg={9}><BasicTable rows={rowsTable} /></Grid>
        <Grid xs={12} lg={2}><ControlPanel /></Grid>
        <Grid xs={12} lg={10}><WeatherChart /></Grid>
      </Grid>
    </main>
  );
}

export default Body;
