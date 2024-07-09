
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';

function App() {

  {/* Variable de estado y función de actualización */ }

  let [indicators, setIndicators] = useState([])

  {/* 
         1. Agregue la variable de estado (dataTable) y función de actualización (setDataTable).
     */}

  let [rowsTable, setRowsTable] = useState([])

  {/* Hook: useEffect */ }

  useEffect(() => {

    (async () => {

     

        {/* Request */ }

        //let API_KEY = "7609ca8e4a0f92c157b6c2f3ecdfca9e"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=7609ca8e4a0f92c157b6c2f3ecdfca9e`)
        let savedTextXML = await response.text();


      {/* XML Parser */ }

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {/* Arreglo para agregar los resultados */ }

      let dataToIndicators = new Array()

      {/* 
           Análisis, extracción y almacenamiento del contenido del XML 
           en el arreglo de resultados
       */}

      let location = xml.getElementsByTagName("location")[1]

      let geobaseid = location.getAttribute("geobaseid")
      dataToIndicators.push(["Location", "geobaseid", geobaseid])

      let latitude = location.getAttribute("latitude")
      dataToIndicators.push(["Location", "Latitude", latitude])

      let longitude = location.getAttribute("longitude")
      dataToIndicators.push(["Location", "Longitude", longitude])

      // console.log(dataToIndicators)
      {/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }

      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      )

      {/* Modificación de la variable de estado mediante la función de actualización */ }

      setIndicators(indicatorsElements)

      {/* 
                 2. Procese los resultados de acuerdo con el diseño anterior.
                    Revise la estructura del documento XML para extraer los datos necesarios. 
             */}

      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {

        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]

        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")

        return { "rangeHours": rangeHours, "windDirection": windDirection }

      })

      arrayObjects = arrayObjects.slice(0, 8)

      {/* 3. Actualice de la variable de estado mediante la función de actualización */ }

      setRowsTable(arrayObjects)

    })()

  }, [])

  return (
    <Grid container spacing={5}>
      <Grid xs={6} sm={4} md={3} lg={2}>{indicators[0]}</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>{indicators[1]} </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>{indicators[2]}</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>{indicators[0]}</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>{indicators[1]}</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>{indicators[2]}</Grid>
      <Grid xs={6} sm={4} md={6} lg={2}><Summary></Summary></Grid>
      <Grid xs={12} sm={6} md={6} lg={9}><BasicTable rows={rowsTable}></BasicTable>
      </Grid>
      <Grid xs={12} lg={2}>
        <ControlPanel />
      </Grid>
      <Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid>

    </Grid>
  )
}

export default App
