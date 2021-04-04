const authReducer = (state={authData: null}, action) => {
    switch(action.type){
        case "AUTH":
            localStorage.setItem("profile", JSON.stringify({...action?.data}));//creates a local storage key value pair and store them in web browser eg setItem("lastName", "Sharma") 
            //console.log(action?.data);
            return {...state, authData: action?.data};
        case "LOGOUT":
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;    
    }
}

export default authReducer;