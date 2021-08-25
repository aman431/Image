/*
   We have make a custom loader and reusable Loader  
*/

import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// css
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    circular: {
      width: "80px",
      height: "80px",
      position: "absolute",
      color: "#ffbe2b",
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);

// circularProgress from material ui
function CustomCircularProgress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.circular} />
    </div>
  );
}

// Loader function
const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      position: "absolute",
      width: "100%",
      zIndex: 99,
    }}
  >
    <CustomCircularProgress />
  </div>
);

export default Loader;
