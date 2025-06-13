
// const apress= require('express');

// const Router= exress.Router;
//or
const z= require('zod');

const {Router}= require('express');

const {userModel, purchaseModel, courseModel} = require("../db");

const jwt= require("jsonwebtoken");
const bcrypt= require('bcrypt');

const {userMiddlewares}= require('../middlewares/user')


// this is new things 

// const JWT_USER_PASSWORD="user@123"

const {JWT_USER_PASSWORD} = require("../config");




const userRouter=Router();

const userSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    firstName: z.string().min(1, 'First name is required').max(50, 'Too long'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Too long'),
  });






userRouter.post("/signup",async function(req,res){

    // this is shortcut
    // add the zod validartions => done
    // const {email,password,firstName,lastName,}= req.body;

    const parseDataWithSuccess= userSchema.safeParse(req.body);

    if(!parseDataWithSuccess.success)
    {
        res.json({
            message:"Incorrect format",
            error:parseDataWithSuccess.error
        })
        return 
    }

      const {email,password,firstName,lastName,}= parseDataWithSuccess.data;

    // hash the password => this is we want to do  => done
    //use a try catch block

    const  hashPassword= await bcrypt.hash(password,5);
    console.log(hashPassword);

    

    try{
        await  userModel.create({
            email:email,
            password:hashPassword,
            firstName:firstName,
            lastName:lastName
        })

        res.json({
            message:"signup succedd"
    })
    }catch(e){
      res.json({
        message: "signup failed"
      }) 
    }
  


    


   
})
    
userRouter.post("/signin",async function(req,res){
    
    const {email,password}= req.body;

    // Ideallly password should be hashed and you cantr compare the 
    // user provided password and the database password

    const user= await userModel.findOne({ // either the user or undefined 

        email:email,
        
    })

    console.log(user);

    if(!user){
        res.status(403),json({
            message:"User does not exist"
        })
    }

    //here we compare the password with the DB password
    const passwordMatch= await bcrypt.compare(password,user.password);


    if(passwordMatch)
    {
        const token=  jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);

        // do coockie logic 



        res.json({
            token:token
        })

    }
    else
    {
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
    
   
})
    
userRouter.get("/purchases",userMiddlewares,async  function(req,res){
    
    const userId= req.userId;

const purchases= await purchaseModel.find({
        userId,
    })

const courseData= await courseModel.find({
    _id:{$in: purchases.map(x=>x.courseId)}
})

     res.json({
            purchases,
            courseData
    })
})
    


module.exports={
    userRouter: userRouter
}


// It you want to do the authentication using the google and facebook 
// then we have to use passport in nodejs


// Start coding yourself
// tutorilas are everywhere

// today 24/4/25
// I done here the zod validations and hashpassword=> done
