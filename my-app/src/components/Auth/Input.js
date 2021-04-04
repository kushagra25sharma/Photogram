import React from "react";
import {Grid, IconButton, TextField, InputAdornment} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";// gives us the icon which is available for showing password
import VisibilityOff from "@material-ui/icons/VisibilityOff";


const Input = ({half, name,handleChange, label, autoFocus, type, handleShowPassword}) => {
    return (
        <Grid item xs={6} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment : (
                        //InputAdornment can be used to add a prefix, a suffix or an action to an input. For instance, you can use an icon button to hide or reveal the password.
                        //by position = end at the end the visiblity icon will be displayed
                        <InputAdornment position="end"> 
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    );
}

export default Input;