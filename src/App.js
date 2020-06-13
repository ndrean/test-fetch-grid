// https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
//import CardActionArea from "@material-ui/core/CardActionArea";
//import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import IconButton from "@material-ui/core/IconButton";
import Loader from "./loader";
import "./App.css";

import NewInput from "./newinput";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  media: {
    height: 140,
  },
}));

function App() {
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState("");
  const [test2, setTest2] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://reqres.in/api/users?delay=2";

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      return await fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
    fetchData().then((data) => {
      if (data) setUsers(data);
    });
  }, []);

  function onInput(e, setState) {
    setState(e.target.value);
  }

  function doSubmit(e) {
    e.preventDefault();
    setData([...data, { t1: test, t2: test2 }]);
    setTest2("");
    setTest("");
  }
  const classes = useStyles();
  return (
    <>
      <div className="App">
        <div>
          <form onSubmit={doSubmit}>
            <NewInput
              attr="one"
              handleInput={(e) => onInput(e, setTest)}
              val={test}
            >
              JUST A TEST
            </NewInput>

            <NewInput
              attr="two"
              handleInput={(e) => onInput(e, setTest2)}
              val={test2}
            >
              JUST A TEST
            </NewInput>

            <input type="submit" value="Go!" />
            <p>{JSON.stringify(data)}</p>
          </form>

          <p>loading: {isLoading.toString()}</p>
        </div>

        <h3>Responsive grid</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={10} style={{ padding: "40px" }}>
            {/* added 'users && ...' returns false until fetch arrives to stop rendering before fetch */}
            {users &&
              users.map((user) => (
                <Grid container item key={user.id} xs={6} sm={3}>
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography>{user.email}</Typography>

                      <Typography>
                        {user.first_name} {user.last_name}
                      </Typography>

                      <CardMedia
                        className={classes.media}
                        image={user.avatar}
                        title={user.last_name}
                        loading="lazy"
                      />
                      <Avatar
                        alt={user.last_name}
                        src={user.avatar}
                        loading="lazy"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </div>

      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {users.map((user) => (
            <GridListTile key={user.id}>
              <img src={user.avatar} alt={user.name} />
              <GridListTileBar
                title={<span>{user.name}</span>}
                subtitle={<span>{user.email}</span>}
                // classes={{
                //   root: classes.titleBar,
                //   title: classes.title,
                // }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </>
  );
}

export default App;
