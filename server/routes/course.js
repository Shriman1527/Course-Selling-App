
const {Router} = require('express');

const {userMiddlewares}= require('../middlewares/user')

const {purchaseModel, courseModel}= require("../db")
const courseRouter= Router();


// should check that the user has actually paid the price 
courseRouter.post("/purchase",userMiddlewares,async function(req,res){

    // you would expect the user to pay you money
    const userId=req.userId;
    const courseId= req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    //Here in this we do not have any course content 
    // but you have to build something like this 

    res.json({
        message:"You have successfully bough a course"
    })
})


courseRouter.get("/preview",async function(req,res){

    const courses= await courseModel.find({});
    res.json({
       courses
    })
})


module.exports={
    courseRouter: courseRouter
}