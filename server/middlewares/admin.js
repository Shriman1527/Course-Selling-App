

const jwt = require("jsonwebtoken");

const {JWT_ADMIN_PASSWORD}= require("../config");





function adminMiddlewares(req,res,next)
{

    try{
        const token = req.headers.token

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }


        console.log(token);
    
    
        const decoded= jwt.verify(token,JWT_ADMIN_PASSWORD);
    
    
        if(decoded)
        {
            req.userId=decoded.id;
            next();
    
        }
        else
        {
            res.status(403).json({
                message:"You are not signed in"
            })
        }
    } catch(error)
    {
        console.log("Erroer");
        return res.status(403).json({ message: "Invalid or expired token" });
    }
  



}

module.exports={
    adminMiddlewares:adminMiddlewares
}