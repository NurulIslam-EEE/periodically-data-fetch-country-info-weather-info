import React, { ChangeEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import CapitalWeather from "../CapitalWeather/CapitalWeather";

const CountryInfo = () => {
  const [capital, setCapital] = useState<string>("dhaka");
  const [country, setCountry] = useState<string>("bangladesh");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [singleCountry, setSingleCountry] = useState<any[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCountry(event.target.value);
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
  }, [isChanged]);
  const handleSearch = (event: React.ChangeEvent<unknown>): void => {
    event.preventDefault();
    setIsChanged(!isChanged);
    console.log(country, singleCountry);
  };
  const useStyles = makeStyles({
    btn: {
      padding: "15px 30px",
    },
  });
  const { btn } = useStyles();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px",
          marginBottom: "20px",
        }}
      >
        <form onSubmit={handleSearch}>
          <TextField
            required
            id="outlined-required"
            label="Enter Country"
            defaultValue="Bangladesh"
            onBlur={(event) => setCountry(event.target.value)}
          />
          <button className={btn} type="submit">
            Submit
          </button>
        </form>
      </Box>
      {/* Country info card */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "400px",
        }}
      >
        <Card sx={{ width: "645px", padding: "20px" }}>
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
            <Button size="small">
              <CapitalWeather capital={capital} />
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default CountryInfo;
