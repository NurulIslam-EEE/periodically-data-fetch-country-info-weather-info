import React, { useEffect, useState } from "react";
import { setInterval } from "timers/promises";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import RawData from "../RawData/RawData";
import PaginationPage from "../Pagination/PaginationPage";
import CountryInfo from "../CountryInfo/CountryInfo";

function Story() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    btn:{
      padding:'20px 100px !important',
      display:'block !important'
    },
    inputField:{
      width:'200px !important',
      display:'block !important'
    }
  });

  const [story, setStory] = useState<any>([]);
  const [sliceStory, setSliceStory] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  let [fetchPage2, setFetchPage2] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const postPerPage = 20;
  useEffect(() => {
    const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${fetchPage2}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.hits?.length > 0) {
          const newData = data?.hits;
          const totalData = [...story, ...newData];
          setStory(totalData);
        }
        setTotalPage(story?.length / 20);
        // console.log(story, page, sliceStory);
      });
  }, [fetchPage2]);

  const myInterval = window.setInterval(() => {
    setFetchPage2((fetchPage2 += 1));
  }, 10000);
  // if (page > 49) {
  //   clearInterval(myInterval);
  // }

  // pagination

  const indexOfFirst = page * postPerPage;
  const indexOfLast = indexOfFirst + postPerPage;
  useEffect(() => {
    const currentStory = story.slice(indexOfFirst, indexOfLast);
    setSliceStory(currentStory);
    // console.log(fetchPage2,page,sliceStory)
  }, [page, story, fetchPage2]);

  const classes = useStyles();
  console.log(page);

  // country
  const [country, setCountry] = useState<string>("");
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "300px",
        }}
      >
        <Typography gutterBottom variant="h4" component="div">
          Story List
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Story</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">Create At</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Raw Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sliceStory?.map((row) => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.url}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">{row.author}</TableCell>
                <TableCell align="right">
                  <Link to={`/rawData/${row.objectID}/${page}`}>
                    See Raw Data
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "60px",
        }}
      >
        <PaginationPage setPage={setPage} pageNumber={totalPage} />
      </Box>

      {/* Country Information */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px",
        }}
      >
        <Typography gutterBottom variant="h4" component="div">
          Country Details and Weather Details
        </Typography>
      </Box>

      {/* country info */}
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
        
          <TextField
          className={classes.inputField}
            required
            id="outlined-required"
            label="Enter Country"
            defaultValue=""
            onChange={(event) => setCountry(event.target.value)}
          />
          <br/>
          <br/>
          <Link to={`/countryInfo/${country}`}>
          <button className={classes.btn}  disabled={!country} type="submit">
            Submit
          </button>
       
          </Link>
        
      </Box>
    </div>
  );
}

export default Story;
