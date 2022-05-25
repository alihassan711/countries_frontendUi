import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Theme } from "@material-ui/core";
import { IClassTypes } from "../types/ClassTypes";

const styles: any = (theme: Theme) => ({
  skeleton: {
    width: "100%",
    maxWidth: "265px",
    height: "313px",
    borderRadius: "8px",
    backgroundImage: "var(--gradient)",
    boxShadow: "0 0 12px -5px rgb(0 0 0 / 20%)",
    backgroundSize: "800px 104px",
    animation: "shineEffect 1.2s forwards infinite linear",
    margin: theme.spacing(2),
  },
});

function CountriesSkeleton(props: { classes: IClassTypes }) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
      <Grid container className={classes.skeleton}></Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(CountriesSkeleton);
