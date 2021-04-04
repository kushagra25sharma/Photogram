import React, {useState, useEffect} from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import {Link, useHistory, useLocation} from "react-router-dom";
import photogram from "../../images/PhotogramIcon.jpg";
import useStyles from "./styles";
import decode from "jwt-decode";


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const history = useHistory();
    const location = useLocation();// gives the location of the link at which we are currently

    const logout = () => {
        localStorage.clear();
        setUser(null);
        history.push("/");
    }

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp*1000 < new Date().getTime()){
                logout();
            }
        }
        
        setUser(JSON.parse(localStorage.getItem("profile")));
// eslint-disable-next-line
    },[location]);

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
           <div className={classes.brandContainer}>
              <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">Photogram</Typography>
              <img className={classes.image} src={photogram} alt="photogram" height="60"/>
           </div>
           <Toolbar className={classes.toolbar}>
               {user ? (
                   <div className={classes.profile}>
                       <Avatar className={classes.purple} src={user?.result?.imageUrl} alt={user?.result?.name}>{user?.result?.name.charAt(0)}</Avatar>
                       <Typography className={classes.name} variant="h6">{user?.result?.name}</Typography>
                       <Button className={classes.logout} color="secondary" variant="contained" onClick={logout}>Logout</Button>
                   </div>
               ) : (
                   <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
               )}
           </Toolbar>
        </AppBar>
    );
}

export default Navbar;