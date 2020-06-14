// https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import Loader from "./loader";
import UserCard from "./usercard";
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
  /* Testing inputs */
  const [test, setTest] = useState("");
  const [test2, setTest2] = useState("");
  const [data, setData] = useState([]);
  /* end testing inputs */

  /* fetching users */
  const [users, setUsers] = useState([]);
  const [kiterArticle, setKiterArticle] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const url = "https://reqres.in/api/users";

  /***** fetching on PAGE LOAD => put INSIDE 'useEffect' *****/
  useEffect(() => {
    async function fetchData() {
      // return await fetch(url + "?delay=1")
      //   .then((res) => res.json())
      //   .then((res) => res.data)
      //   .catch(console.error)
      //   .finally(() => setIsLoading(false));

      /* Equivalent form */
      try {
        const request = await fetch(url + "?delay=1");
        const response = await request.json();
        if (response) {
          return response.data;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData().then((data) => {
      if (data) setUsers(data);
    });
  }, []);

  /****** fetching ON CLICK : put in button_handling_click *****/
  async function handleButtonClick(e) {
    e.preventDefault();
    setIsLoading(true);
    //setLoaded(true);

    return await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setUsers([...res.data]);
          setLoaded(true);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  /***** fetching ON CHANGE => 'useEffect' with s state variable  
  1. the kiter is defined by a 'select', that  calls 'handleUserChange' that sets the kiter
  2. then only at the end, we use 'useEffect' to render once the kiter is set */
  // useEffect(() => {
  //   if (kiterArticle) {
  //     setIsLoading(true);
  //     fetch(url + "/" + kiterArticle.id)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res) {
  //           setKiterArticle({ ...res.data });
  //         }
  //       })
  //       .catch(console.error)
  //       .finally(() => setIsLoading(false));
  //   }
  // }, []);

  function handleUserChange(e) {
    // e.preventDefault();
    setKiterArticle(users.find((user) => user.email === e.target.value));
  }

  /************** TEST INPUT COMPONENT ****************/
  function onInput(e, setState) {
    setState(e.target.value);
  }
  function doSubmit(e) {
    e.preventDefault();
    setData([...data, { t1: test, t2: test2 }]);
    setTest2("");
    setTest("");
  }
  /****************** END TEST INPUT COMPONENT *************/

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

          <h4>
            Data will be fetched on page load. Is loading ?{" "}
            {isLoading.toString()}
          </h4>
        </div>

        <h3>Responsive grid</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={10} style={{ padding: "40px" }}>
            {/* added 'users && ...' returns false until fetch arrives to stop rendering before fetch */}
            {users &&
              users.map((user) => (
                <UserCard user={user} classes={classes} key={user.email} />
              ))}
          </Grid>
        )}
      </div>
      <hr />

      <div>
        <h3>Display selected user</h3>
        <select onChange={handleUserChange} disabled={isLoading}>
          {users &&
            users.map((user) => (
              <option key={user.email} value={user.email}>
                {user.first_name} {user.last_name}
              </option>
            ))}
        </select>
        {kiterArticle && <UserCard user={kiterArticle} classes={classes} />}
      </div>
      <hr />

      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={(e) => handleButtonClick(e)}
          style={{ margin: "40px" }}
        >
          Load users
        </Button>
        <Grid
          container
          spacing={10}
          style={{ padding: "40px" }}
          justify="center"
        >
          {loaded && (
            <GridList className={classes.gridList} cols={2.5}>
              {users &&
                users.map((user) => (
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
          )}
        </Grid>
      </div>
    </>
  );
}

export default App;
