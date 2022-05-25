import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { InputBase, InputAdornment, Theme } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { IClassTypes } from "../types/ClassTypes";
const styles = (theme: Theme) => ({
  lightIcon: {
    color: "var(--text)",
    opacity: "0.7",
  },
  darkIcon: {
    color: "var(--text)",
    opacity: "0.7",
  },
});

const InputSearch = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: "var(--element)",
    width: "400px",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
    padding: `${theme.spacing(1.2)}px ${theme.spacing(2.5)}px`,
    borderRadius: "5px",
    boxShadow: "0 0 12px -5px rgb(0 0 0 / 20%)",
  },
  input: {
    backgroundColor: "transparent",
    fontSize: "14px",
    fontWeight: 300,
    color: "var(--text)",

    "&::placeholder": {
      fontSize: "12px",
      fontWeight: 300,
      color: "var(--text)",
    },
  },
}))(InputBase);

function Search(props: {
  classes: IClassTypes;
  state: string;
  handleFetchSearch: Function;
}) {
  const { classes, state, handleFetchSearch } = props;

  React.useEffect(() => {
    function initListeners() {
      document.getElementById("search")!.addEventListener("input", (e: any) => {
        fetchSearch(e.target.value);
      });
    }

    initListeners();
  }, []);

  const fetchSearch = (name: string) => {
    handleFetchSearch(name);
  };

  return (
    <InputSearch
      id="search"
      placeholder="Search for a country..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon
            fontSize="small"
            className={state === "dark" ? classes.darkIcon : classes.lightIcon}
          />
        </InputAdornment>
      }
    />
  );
}

export default withStyles(styles)(Search);
