import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  pageNumber: number;
  setPage(page: number): void;
}
const PaginationPage = ({ pageNumber, setPage }: Props) => {
  // const {totalPage}=props
  // console.log(Math.ceil(pageNumber))
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Stack sx={{ margin: "20px auto" }} spacing={1}>
      <Pagination
        onChange={handleChange}
        count={Math.ceil(pageNumber)}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
};

export default PaginationPage;
