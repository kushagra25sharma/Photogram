import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

// middleware func => do something and then move to next
const auth = async (req, res, next) => {
    try {
        // we will check if the user has token only then he can perform the actions
        const token = req.headers.authorization.split(" ")[1]; //token is present at 1 index
        //console.log(token);
        const isCustom = token.length < 500 // to check if the token is ours(custom) or google's

        let decodedData;

        if(token && isCustom){
            decodedData = jwt.verify(token, secret);// will give us the data of the token that are id and email
            //console.log(decodedData);
            // now with decodedData we know ehich user is loggedIN and performin actions
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; // sub is specific name for google's id that differentiates every gmail user  
        }
        //re.userId we are populating the request so that we can use userId in the next func
        next();
        // if user wants to like a post, they will click the like button
        // middleware will check for the authoriztion and "next" will be called
        // only then the action of liking the post will be executed
    } catch (error) {
        console.log(error);
    }
}

export default auth;