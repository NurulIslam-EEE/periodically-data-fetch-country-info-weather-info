import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import CapitalWeather from "../CapitalWeather/CapitalWeather";

const CountryInfo = () => {
  const [country, setCountry] = useState<string>("");
  const [singleCountry, setSingleCountry] = useState<any[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCountry(event.target.value);
    console.log(country);
  };
  console.log(country);

  const handleSearch = (event: React.ChangeEvent<unknown>): void => {
    event.preventDefault();

    const url = `https://restcountries.com/v3.1/name/${country}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSingleCountry(data));
    console.log(country, singleCountry);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <TextField
          required
          id="outlined-required"
          label="Enter Country"
          defaultValue="Bangladesh"
          onChange={(event) => setCountry(event.target.value)}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>

      {/* Country info card */}
      {singleCountry?.length > 0 && (
        <Box>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={singleCountry[0]?.flags?.png}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Capital:{singleCountry[0]?.capital[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capital:{singleCountry[0]?.name?.common}
                Lat:{singleCountry[0]?.latlng[0]}
                Long:{singleCountry[0]?.latlng[1]}
                Population:{singleCountry[0]?.population}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capital:{singleCountry[0]?.name?.common}
                Lat:{singleCountry[0]?.latlng[0]}
                Long:{singleCountry[0]?.latlng[1]}
                Population:{singleCountry[0]?.population}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <CapitalWeather capital={singleCountry[0]?.capital[0]} />
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default CountryInfo;
