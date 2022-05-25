import React from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, Theme } from "@material-ui/core";
import Appbar from "../components/NavBar";
import BackIcon from "@material-ui/icons/ArrowBack";
import Media from "react-media";
import { API_URL_NAME, API_URL_CODE } from "../apiCall/ApiCall";
import { ICountry } from "../types/Country";
import { IClassTypes } from "../types/ClassTypes";
const styles: any = (theme: Theme) => ({
  wrapperDetails: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "auto",
    backgroundColor: "transparent",
  },
  header: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "auto",
    margin: `calc(64px + ${theme.spacing(4.5)}px) 0 ${theme.spacing(4.5)}px 0`,
    padding: `0 calc(4vw + ${theme.spacing(2)}px)`,
    backgroundColor: "transparent",
  },
  main: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "1440px",
    height: "auto",
    backgroundColor: "transparent",
    padding: `0 calc(4vw + ${theme.spacing(2)}px)`,
  },
  flag: {
    width: "40%",
    minWidth: "300px",
    objectFit: "cover",
    objectPosition: "center center",
    marginBottom: "3rem",
    aspectRatio: "16 / 9",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  skeleton: {
    width: "100%",
    minWidth: "60%",
    maxWidth: "80%",
    height: "275px",
    borderRadius: "8px",
    backgroundImage: "var(--gradient)",
    boxShadow: "0 0 12px -5px rgb(0 0 0 / 20%)",
    backgroundSize: "600px 104px",
    animation: "shineEffect 1s forwards infinite linear",
    margin: theme.spacing(2),
  },
  wrapperInformation: {
    height: "auto",
    color: "var(--text)",
  },
  wrapperZones: {
    display: "flex",
    flexWrap: "nowrap",
    width: "100%",
    height: "auto",
    backgroundColor: "transparent",
    padding: `0 ${theme.spacing(10)}px`,
  },
  leftZone: {
    height: "auto",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(4),

    "& p": {
      margin: `${theme.spacing(0.5)}px 0`,
    },
  },
  rightZone: {
    height: "auto",

    "& p": {
      margin: `${theme.spacing(0.5)}px 0`,
    },
  },
  borders: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
});

const BackButton = withStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(5)}px`,
    color: "var(--text)",
    backgroundColor: "var(--element)",
    borderRadius: "5px",
    fontSize: "14px",
    textTransform: "none",
    marginBottom: theme.spacing(5),
  },
}))(Button);

const BorderButton = withStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(0.4)}px ${theme.spacing(2.7)}px`,
    color: "var(--text)",
    backgroundColor: "var(--element)",
    borderRadius: "5px",
    fontSize: "14px",
    textTransform: "none",
    margin: theme.spacing(1),
  },
}))(Button);

function CountryDetails(props: {
  classes: IClassTypes;
  state: string;
  setState: Function;
}) {

  const navigate = useNavigate();
  const params = useParams();
  const { classes, state, setState } = props;

  const [country, setCountry] = React.useState<ICountry>();
  const [loading, setLoading] = React.useState(true);
  const [domains, setDomains] = React.useState("");
  const [currencies, setCurrencies] = React.useState("");
  const [languages, setLanguages] = React.useState("");
  const [codes, setCodes] = React.useState([]);

  React.useEffect(() => {
    try {
      (async () => {
        const nameCountry: any = localStorage.getItem("tab");
        const {
          data: [countryData],
        } = await axios.get(API_URL_NAME(nameCountry));

        const countryCodes: ICountry = await axios.get(
          API_URL_CODE(countryData.borders)
        );

        setCountry(countryData);
        setLoading(false);
        setCodes(
          countryCodes.data.map(
            (code: { name: { common: any } }) => code.name.common
          )
        );
        setCurrencies(
          Object.values(countryData.currencies)
            .map((currency: any) => currency.name)
            .join(", ")
        );
        setLanguages(
          Object.values(countryData.languages)
            .map((language) => language)
            .join(", ")
        );
        setDomains(countryData.tld.join(", "));
      })();
    } catch (err: any) {
      console.log(err.message);
    }
  }, [params]);

  const handleBorder = (event: React.MouseEvent<HTMLButtonElement>) => {
    const url: any = event.target;
    localStorage.setItem("tab", String(url.textContent));
    navigate(`/${String(url.textContent)}`);
  };

  const backButton = () => {
    localStorage.setItem("tab", "/");
    navigate("/");
  };

  return (
    <Grid container className={classes.wrapperDetails}>
      <Appbar state={state} setState={setState} />
      <Grid container className={classes.header}>
        <BackButton
          variant="contained"
          startIcon={<BackIcon />}
          onClick={backButton}
        >
          Back
        </BackButton>
      </Grid>
      {loading ? (
        <Grid container className={classes.skeleton}></Grid>
      ) : (
        <main className={classes.main}>
          <img
            className={classes.flag}
            src={country?.flags?.svg}
            alt="Country Flag"
            loading="lazy"
          />

          <Media query={{ maxWidth: 849 }}>
            {(matches) =>
              matches ? (
                <Grid
                  container
                  className={classes.wrapperInformation}
                  style={{ width: "100%", flexDirection: "column" }}
                >
                  <Typography
                    variant="h1"
                    component="h1"
                    style={{ paddingLeft: "0", marginBottom: "1rem" }}
                  ></Typography>
                  <Grid
                    container
                    className={classes.wrapperZones}
                    style={{ flexDirection: "column", padding: "0" }}
                  >
                    <div className={classes.leftZone} style={{ width: "auto" }}>
                      <p>
                        <Typography variant="body2" component="span">
                          Native Name:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.name?.official}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Population:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.population}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Region:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.region}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Sub Region:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.subregion}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Capital:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.capital}
                        </Typography>
                      </p>
                    </div>
                    <div
                      className={classes.rightZone}
                      style={{ width: "auto" }}
                    >
                      <p>
                        <Typography variant="body2" component="span">
                          Top Level Domain:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {domains}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Currencies:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {currencies}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Languages:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {languages}
                        </Typography>
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    container
                    className={classes.borders}
                    style={{ paddingLeft: "0", marginTop: "32px" }}
                  >
                    Border Countries:{" "}
                    {codes.map((code) => (
                      <BorderButton
                        key={code}
                        variant="contained"
                        onClick={handleBorder}
                      >
                        {code}
                      </BorderButton>
                    ))}
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  className={classes.wrapperInformation}
                  style={{ width: "60%", flexDirection: "row" }}
                >
                  <Typography
                    variant="h1"
                    component="h1"
                    style={{ paddingLeft: "80px", marginBottom: "1rem" }}
                  ></Typography>
                  <Grid
                    container
                    className={classes.wrapperZones}
                    style={{ flexDirection: "row" }}
                  >
                    <div className={classes.leftZone} style={{ width: "auto" }}>
                      <p>
                        <Typography variant="body2" component="span">
                          Native Name:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.name?.official}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Population:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.population}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Region:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.region}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Sub Region:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.subregion}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Capital:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {country?.capital}
                        </Typography>
                      </p>
                    </div>
                    <div
                      className={classes.rightZone}
                      style={{ width: "auto", marginLeft: "32px" }}
                    >
                      <p>
                        <Typography variant="body2" component="span">
                          Top Level Domain:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {domains}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Currencies:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {currencies}
                        </Typography>
                      </p>
                      <p>
                        <Typography variant="body2" component="span">
                          Languages:{" "}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {languages}
                        </Typography>
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    container
                    className={classes.borders}
                    style={{ paddingLeft: "80px", marginTop: "0" }}
                  >
                    Border Countries:{" "}
                    {codes.map((code) => (
                      <BorderButton
                        key={code}
                        variant="contained"
                        onClick={handleBorder}
                      >
                        {code}
                      </BorderButton>
                    ))}
                  </Grid>
                </Grid>
              )
            }
          </Media>
        </main>
      )}
    </Grid>
  );
}

export default withStyles(styles)(CountryDetails);
