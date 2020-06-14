import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";

export default function UserCard(props) {
  const {
    user: { email, first_name, last_name, avatar },
    classes,
  } = props;

  return (
    <>
      <Grid container item xs={6} sm={3}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography>{email}</Typography>

            <Typography>
              {first_name} {last_name}
            </Typography>

            <CardMedia
              className={classes.media}
              image={avatar}
              title={last_name}
              loading="lazy"
            />
            <Avatar alt={last_name} src={avatar} loading="lazy" />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
