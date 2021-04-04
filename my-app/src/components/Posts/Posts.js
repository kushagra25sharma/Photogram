// This will fetch all the post and display it if there are no post submitted
// from the user it will display the circular progress

import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import {useSelector} from "react-redux";
import {CircularProgress, Grid} from "@material-ui/core";


const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log("posts: ", posts)
    return (
        !posts.length ? <CircularProgress /> : (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        )
    );
 };
    
export default Posts;
