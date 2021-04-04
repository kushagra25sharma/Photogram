import React, {useState} from "react";
import {Avatar, Grid, Paper, Container, Button, Typography} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from "./Input";
import {GoogleLogin} from "react-google-login";
import Icon from "./Icon";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signUp, signIn} from "../../actions/auth";
import cId from "../../env";


const Auth = () => {
    const classes = useStyles();
    const [isSignUp, setSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: "", confirmPassword: ""});
    const dispatch = useDispatch();
    const history= useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(formData);

        if(isSignUp){
            dispatch(signUp(formData, history));
        } else {
           // console.log(" go go ");
            dispatch(signIn(formData, history));
        }
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleShowPassword = () => {
        setShowPassword((prev) => {return !prev});
    }

    const switchState = () => {
        setFormData({firstName: "", lastName: "", email: "", password: "", confirmPassword: ""});
        setSignUp((prev) => {return !prev});
       // console.log(signUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        // console.log(res);
        const result = res?.profileObj; // ?. returns the result (profileObj) if res exists else returns undefined
        // if we do not use ? then if res doesn't exists it will return error cannot find profileObj property of undefined
        const token = res?.tokenId;

        try {
            dispatch({type: "AUTH", data: {result, token}});
            history.push("/"); // takes us to the provided link ("/") after dispatch is executed
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Sign in with google was unsuccessfull. Try again later");
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && (
                            <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                        )}
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                        clientId={cId.clientId}
                        render={(renderProps) => (
                        <Button 
                           variant="contained"
                           color="primary"
                           fullWidth
                           className={classes.googleButton}
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                           startIcon={<Icon />}>
                           Google Sign In
                        </Button>
                    )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchState}>
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
