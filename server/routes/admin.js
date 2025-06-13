
const {Router} = require('express');

const express= require('express');


const {adminModel, courseModel}= require('../db');

const {adminMiddlewares}= require('../middlewares/admin')
const jwt= require("jsonwebtoken");

const bcrypt= require('bcrypt');

const z= require('zod');
// const JWT_ADMIN_PASSWORD= "admin@123";

const {JWT_ADMIN_PASSWORD} = require("../config");

const adminRouter= Router();
// adminRouter.use(adminMiddleware);

//bcrypt, zod , jsonwebtoken

adminRouter.use(express.json());

const adminSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    firstName: z.string().min(1, 'First name is required').max(50, 'Too long'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Too long'),
  });


adminRouter.post("/signup",async function(req,res){

     // this is shortcut
    // add the zod validartions
    // const {email,password,firstName,lastName,}= req.body;
    // hash the password => this is we want to do 
    //use a try catch block

    const parseDataWithSuccess= adminSchema.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        res.json({
            message:"Incorrect format",
            error:parseDataWithSuccess.error
        })
        return 
    }

    const {email,password,firstName,lastName,}= parseDataWithSuccess.data;

      const  hashPassword= await bcrypt.hash(password,5);
        console.log(hashPassword);

   
    
    try{
        await  adminModel.create({
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
    
adminRouter.post("/signin",async function(req,res){
    
    
    const {email,password}= req.body;

    // Ideallly password should be hashed and you cantr compare the 
    // user provided password and the database password

    const admin= await adminModel.findOne({ // either the user or undefined 
        
        email:email,
        
    })

    if(!admin){
        res.status(401).json({
            message:"admin not exist"
        })
    }

    const passwordMatch= await bcrypt.compare(password,admin.password);


    if(passwordMatch)
    {
        const token=  jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD);

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

adminRouter.post("/course",adminMiddlewares,async function(req,res){
    try{

        const adminId= req.userId;

        const {title, description,price,imageUrl}= req.body;
    
        // Here we are using the image url insted we can use the 
        // image also for this we should watch the video of 
        // creating a web3 saas in 6 hours
    
     const course=   await courseModel.create({
           title: title,
           description:description,
           price :price,
           imageUrl:imageUrl,
           createrId:adminId
        })
        res.json({
            
            courseId: course._id
    
        })

    }catch(error)
    {
        console.log("error ",error);
        res.status(500).json({
            message:"error while creatring ther course"
        })
    }
   
})

adminRouter.put("/course",adminMiddlewares,async function(req,res){

    const adminId= req.userId;
   

    const {title, description,price,imageUrl,courseId}= req.body;

    const course=  await courseModel.updateOne({
        _id:courseId,
        createrId:adminId
    },{
        title: title,
        description: description,
        price:price,
        imageUrl: imageUrl,
        

    })

    if(!course){
        res.json({
            message:"There is eror while updatin gthe course"
        })
    }

    res.json({
        message:"Course create successfully",
        courseId:course._id
    })


})

adminRouter.get("/course/bulk",adminMiddlewares, async function(req,res){

    const adminId= req.userId;

    const courses=  await courseModel.find({
     
    createrId:adminId

    })

    res.json({
        
        courses
    })


})


module.exports={
    adminRouter:adminRouter,
    
}
