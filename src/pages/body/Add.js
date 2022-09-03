import {  ModeNight } from "@mui/icons-material";
import { Fab, Tooltip, Switch } from "@mui/material";

  const Add = ({mode,setMode}) => {
    return (
      <>
      <Tooltip
        onChange={e=>setMode(mode === "light" ? "dark" : "light")}
        title=""
        sx={{
          position: "fixed",
          bottom: 20,
          right: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab variant="extended" size="small" color="primary" aria-label="theme">
                <ModeNight />
                <Switch />
        </Fab>
      </Tooltip>
          
      </>
    );
  };
  
  export default Add;