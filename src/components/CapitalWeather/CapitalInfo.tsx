import React,{useEffect,useState} from 'react'
import { useParams,Link} from "react-router-dom";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


interface Capita {
    [key: string]: any;
  }

export default function CapitalInfo() {
    const [weather, setWeather] = useState<Capita>({});
    const { capital } = useParams();

    useEffect(() => {
        const url = `http://api.weatherstack.com/current?access_key=fa027a9e31b44b9c048365d0fa283661&query=${capital}`;
        const url2=`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_YOUR_ACCESS_KEY}&query=${capital}`;
        console.log(url2);
        fetch(url)
          .then((res) => res.json())
          .then((data) => setWeather(data));
      }, [capital]);
      console.log(weather)
  
  return (
    <>
       <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "400px",
          margin:'50px'

        }}
      >
        <Card sx={{ width: "500px", padding: "20px" }}>
          <CardMedia
            component="img"
            height="140"
            image={weather?.current?.weather_icons[0]}
            alt="green iguana"
          />
          <CardContent>
          <Typography gutterBottom variant="h3" component="div">
           Capital: {capital}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
            Wind Speed: {weather?.current?.wind_speed}
            </Typography>
            <Typography variant="h6">
            Temperature:{weather?.current?.temperature}
            </Typography>
            <Typography variant="h6">
            Precip:{weather?.current?.precip} 
            </Typography>
           

        
          </CardContent>
          <CardActions>
            <Link to='/'>
            <Button size="large">
             Back
            </Button>
            </Link>
           
          </CardActions>
        </Card>
      </Box>
  
   
    </>
  )
}
