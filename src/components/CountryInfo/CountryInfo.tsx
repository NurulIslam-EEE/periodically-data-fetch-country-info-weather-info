import React, { ChangeEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useParams,Link} from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import CapitalWeather from "../CapitalWeather/CapitalWeather";

interface Capi {
  [key: string]: any;
}
const CountryInfo = () => {
  const [capital, setCapital] = useState<string>("dhaka");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [singleCountry, setSingleCountry] = useState<any[]>([]);
 

  const { country } = useParams();
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
  
    console.log(country);
  };
  console.log(country);
  useEffect(() => {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSingleCountry(data);
        setCapital(data[0]?.capital[0]);
        console.log("Here", data[0]?.capital[0], capital);
      });
  }, [isChanged,country]);
  const handleSearch = (event: React.ChangeEvent<unknown>): void => {
    event.preventDefault();
    setIsChanged(!isChanged);
    console.log(country, singleCountry);
  };
 

 

  return (
    <div>
     
      {/* Country info card */}

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
            image={singleCountry[0]?.flags?.png}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Country:{singleCountry[0]?.name?.common}
            </Typography>
            <Typography variant="h6">
              Capital:{singleCountry[0]?.capital[0]}
            </Typography>
            <Typography variant="h6">
              Latitude:{singleCountry[0]?.latlng[0]}
            </Typography>
            <Typography variant="h6">
              Longitude:{singleCountry[0]?.latlng[1]}
            </Typography>

            <Typography variant="h6">
              Population:{singleCountry[0]?.population}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/capitalInfo/${capital}`}>
            <Button size="large">
              See Capital Info
            </Button>
            </Link>
           
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default CountryInfo;
