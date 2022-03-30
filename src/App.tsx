import React, { useEffect, useState } from "react";
import { setInterval } from "timers/promises";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@mui/material/Box";

import PaginationPage from "./components/Pagination/PaginationPage";
import RawData from "./components/RawData/RawData";
import CountryInfo from "./components/CountryInfo/CountryInfo";
function App() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const [story, setStory] = useState<any>([]);
  const [sliceStory, setSliceStory] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  let [fetchPage2, setFetchPage2] = useState(0);
  const [totalPage, setTotalPage] = useState(2);

  const postPerPage = 10;
  useEffect(() => {
    const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${fetchPage2}`;
    // console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.hits?.length > 0) {
          const newData = data?.hits;
          const totalData = [...story, ...newData];
          setStory(totalData);
        }
        setTotalPage(story?.length / 10);
        // console.log(story,page,sliceStory)
      });
  }, [fetchPage2]);

  const myInterval = window.setInterval(() => {
    setFetchPage2((fetchPage2 += 1));
  }, 20000);
  if (page > 49) {
    clearInterval(myInterval);
  }

  // pagination

  const indexOfFirst = page * postPerPage;
  const indexOfLast = indexOfFirst + postPerPage;
  useEffect(() => {
    const currentStory = story.slice(indexOfFirst, indexOfLast);
    setSliceStory(currentStory);
    // console.log(fetchPage2,page,sliceStory)
  }, [page, story, fetchPage2]);

  const classes = useStyles();
  return (
    <div>
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
                  {" "}
                  <RawData row={row} />{" "}
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
          height: "100px",
        }}
      >
        <PaginationPage setPage={setPage} pageNumber={totalPage} />
      </Box>

      {/* Country Information */}
      <CountryInfo />
    </div>
  );
}

export default App;
