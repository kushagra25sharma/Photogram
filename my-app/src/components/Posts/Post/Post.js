//This will create the post which the user will see i.e. a card of the
// entries filled by user along with the like, delete and update button

import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment"; // library for working with time
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [showMore, setShowMore] = useState(false);
  const displayRead = (
    <Button
      size="small"
      color="default"
      style={{textDecoration: "underline"}}
      onClick={() => {
        setShowMore((prev) => !prev);
      }}
    >
      {showMore ? "Read Less" : "Read More"}
    </Button>
  );

  const Likes = () => {
    if (post.likes?.length > 0) {
      // if the post has atleast 1 like
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? ( //checking if the likes array contains the user id
        <>
          <ThumbUpAltIcon fontSize="small" />
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </> //show you and n others liked it
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    // else return simply like option
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography> */}
        <Typography variant="body2" color="textSecondary" component="p">
          {showMore ? post.message : post.message.substring(0, 200)}
          {post.message.length > 200 && displayRead}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default Post;
