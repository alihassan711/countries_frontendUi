import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import MoonFillIcon from "@material-ui/icons/Brightness2";
import MoonOutlinedIcon from "@material-ui/icons/Brightness2Outlined";
import { IClassTypes } from "../types/ClassTypes";

const styles: any = (theme: Theme) => ({
  appbar: {
    backgroundColor: "var(--appbar)",
    color: "var(--text)",
    boxShadow: "0 5px 10px -5px rgb(0 0 0 / 10%)",
    padding: `0 calc(4vw + ${theme.spacing(2)}px)`,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  button: {
    color: "var(--text)",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 600,
    mainHeading: {
      [theme.breakpoints.down("xs")]: {
        padding: "6px 0px",
      },
    },
  },
  mainHeading: {
    [theme.breakpoints.down("xs")]: {
      fontWeight: 700,
    },
  },
});

function HideOnScroll(props: { children: any; window: any }) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Appbar(props: { classes: IClassTypes; state: string; setState: Function }) {
  const { classes, state, setState } = props;

  const handleLightMode = () => {
    setState("light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const handleDarkMode = () => {
    setState("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  return (
    <HideOnScroll {...props}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar disableGutters className={classes.spaceBetween}>
          <Typography
            variant="h1"
            component="h1"
            className={classes.mainHeading}
          >
            Where in the world?
          </Typography>
          <Button
            onClick={state === "dark" ? handleLightMode : handleDarkMode}
            className={classes.button}
            startIcon={
              state === "dark" ? <MoonFillIcon /> : <MoonOutlinedIcon />
            }
          >
            Dark Mode
          </Button>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default withStyles(styles)(Appbar);
