import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  capital: string;
}

const CapitalWeather = ({ capital }: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleWeather = (): void => {
    const url = `http://api.weatherstack.com/current?access_key=fa027a9e31b44b9c048365d0fa283661&query=${capital}`;
  };

  return (
    <div>
      <Button sx={{ border: "1px solid black" }} onClick={handleOpen}>
        See Raw Data
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Raw Data
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CapitalWeather;