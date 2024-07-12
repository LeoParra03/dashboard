import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Chart } from "react-google-charts";

const WeatherChart = ({ selectedVariable }) => {
    const [chartData, setChartData] = useState([]);
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Realizar la solicitud de datos del clima
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088`);
                let savedTextXML = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

                // Obtener datos generales como la temperatura, velocidad del viento, etc.
                let time = xml.getElementsByTagName('time');
                let temperatureData = [];
                let windSpeedData = [];
                let humidityData = [];
                let cloudinessData = [];
                let precipitationData = [];

                Array.from(time).forEach(timeElement => {
                    const timeFrom = timeElement.getAttribute("from");
                    
                    // Temperatura
                    let temperature = timeElement.getElementsByTagName("temperature")[0];
                    let temperatureValue = parseFloat(temperature.getAttribute("value"));
                    temperatureData.push([new Date(timeFrom), temperatureValue]);

                    // Velocidad del viento
                    let windSpeed = timeElement.getElementsByTagName("windSpeed")[0];
                    let windSpeedValue = parseFloat(windSpeed.getAttribute("mps"));
                    windSpeedData.push([new Date(timeFrom), windSpeedValue]);

                    // Humedad
                    let humidity = timeElement.getElementsByTagName("humidity")[0];
                    let humidityValue = parseFloat(humidity.getAttribute("value"));
                    humidityData.push([new Date(timeFrom), humidityValue]);

                    // Nubosidad
                    let cloudiness = timeElement.getElementsByTagName("clouds")[0];
                    let cloudinessValue = parseFloat(cloudiness.getAttribute("all"));
                    cloudinessData.push([new Date(timeFrom), cloudinessValue]);

                    // Precipitación
                    let precipitation = timeElement.getElementsByTagName("precipitation")[0];
                    if (precipitation) {
                        let precipitationValue = parseFloat(precipitation.getAttribute("value"));
                        precipitationData.push([new Date(timeFrom), precipitationValue]);
                    }
                });

                // Establecer los datos según la variable seleccionada
                switch (selectedVariable) {
                    case -1: // Todas las variables
                        setChartData([
                            ['Fecha-Hora', 'Humedad (%)', 'Temperatura (°C)', 'Velocidad del viento (m/s)', 'Nubosidad', 'Precipitación (mm)']
                        ].concat(temperatureData.map((_, i) => [
                            temperatureData[i][0],
                            humidityData[i][1],
                            temperatureData[i][1],
                            windSpeedData[i][1],
                            cloudinessData[i][1],
                            precipitationData[i] ? precipitationData[i][1] : null
                        ])));
                        break;
                    case 0: // Humedad
                        setChartData([['Fecha-Hora', 'Humedad (%)']].concat(humidityData));
                        break;
                    case 1: // Nubosidad
                        setChartData([['Fecha-Hora', 'Nubosidad']].concat(cloudinessData));
                        break;
                    case 2: // Velocidad del viento
                        setChartData([['Fecha-Hora', 'Velocidad del viento (m/s)']].concat(windSpeedData));
                        break;
                    case 3: // Temperatura
                        setChartData([['Fecha-Hora', 'Temperatura (°C)']].concat(temperatureData));
                        break;
                    case 4: // Precipitación
                        setChartData([['Fecha-Hora', 'Precipitación (mm)']].concat(precipitationData));
                        break;
                    case 5: // Todas las variables
                        setChartData([
                            ['Fecha-Hora', 'Humedad (%)', 'Temperatura (°C)', 'Velocidad del viento (m/s)', 'Nubosidad', 'Precipitación (mm)']
                        ].concat(temperatureData.map((_, i) => [
                            temperatureData[i][0],
                            humidityData[i][1],
                            temperatureData[i][1],
                            windSpeedData[i][1],
                            cloudinessData[i][1],
                            precipitationData[i] ? precipitationData[i][1] : null
                        ])));
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error al cargar datos del clima:', error);
            }
        };

        fetchData();
    }, [selectedVariable]);

    // Configuración de opciones para el gráfico
    const options = {
        title: "Datos Meteorológicos",
        curveType: "function",
        legend: { position: "bottom" },
        hAxis: {
            format: 'dd/MM/yyyy HH:mm',
        },
    };

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Chart
                chartType="LineChart"
                data={chartData}
                width="100%"
                height="400px"
                options={options}
            />
        </Paper>
    );
};

export default WeatherChart;
