import React, {useState, useEffect} from "react";
import useStyles from "./styles";
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from "react-file-base64"
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../actions/posts";
    

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));// if id se specified that means user wants to update so fill the form with existing values else show empty form
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
      if(post){
        setPostData(post);
      }
    }, [post]);

    const handleSubmit =  async (e) => {
        e.preventDefault();
        // if id exists user is editing the post otherwise he is creating a new one
        if(!currentId){
          dispatch(createPost({...postData, name: user?.result?.name}));
        } else {
          dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }

        clear();
    }

    const clear = () => { // after submitting the form all fields should get cleared
      setCurrentId(0);// user's job is finished so set the id to 0 again, id will be non-zero only when they are updating a post
      setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    // if user is not signed in show this message
    if(!user?.result?.name){ 
      return(
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">You are not signed in. To create a post or like other's post please sign in.</Typography>
        </Paper>
      );
    }

    return (
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? "Editing the Memory" : "Creating a Memory" }</Typography>
            {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */} 
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
      );
};

export default Form;

