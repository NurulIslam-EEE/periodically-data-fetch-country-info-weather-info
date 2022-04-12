import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams,Link} from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);



interface Props {
  [key: string]: any;
}

const RawData = () => {
  const { id, page } = useParams();
  console.log(typeof id);
  const [filterStory, setFilterStory] = useState([]);
  useEffect(() => {
    const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const filterData = data?.hits?.filter((d: Props) => d.objectID === id);
        setFilterStory(filterData);
        console.log(data, filterData);
      });
  }, [id, page]);
  const rawData=JSON.stringify(filterStory[0])

  console.log(id, page, filterStory);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardContent>
      
      <Typography variant="body2">
      {rawData}
      </Typography>
    </CardContent>
    <CardActions>
    <Link  to='/'>
                  
                   <Button size="small">Back</Button>
                  </Link>
      
    </CardActions>
      
      </Card>
    </Box>
  );
};

export default RawData;
