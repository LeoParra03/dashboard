import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';



export default function Summary(){
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const utcOffset = -5 * 60 * 60 * 1000*0; 
    
    const timeInUTC5 = new Date(time.getTime() + utcOffset);

    const formattedTime = timeInUTC5.toLocaleTimeString([], { hour12: false });
    const formattedDate = timeInUTC5.toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
   
    const hour = timeInUTC5.getHours();
    let timeOfDay = "";

    if (hour >= 7 && hour < 12){
        timeOfDay = 'Guayaquil: Mañana';
     
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'Guayaquil: Tarde';
      
    } else if (hour >= 17 && hour < 19) {
        timeOfDay = 'Guayaquil: Atardecer';
       
    } else if (hour >= 19 && hour < 4){
        timeOfDay = 'Guayaquil: Noche';
    }else {
        timeOfDay = 'Guayaquil: Amaneciendo';
    }

    return (
        <Card >
            <CardActionArea>
               
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                    {timeOfDay}
                    </Typography>
                    <Typography component="p" variant="h4">
                    {formattedTime}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                    	en {formattedDate}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
