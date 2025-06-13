const express= require('express');

const mongoose= require('mongoose');




//Routing in express => Read it yourself 
// How this is useful






//Instance of an express http server
const app=express();

 app.use(express.json());

 require("dotenv").config();

 app.use(express.static('public'));



const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

 

 console.log(process.env.MONGO_URL);


const { userRouter} = require('./routes/user');

const {courseRouter}= require('./routes/course');

const { adminRouter} = require("./routes/admin");


//  but the best way to do the routing is below
//usually backne dare written like this 
app.use("/user", userRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);


async function main(){
    //environment file 
   await  mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);

    console.log("listening on port 3000");

}

main();









// createUserRoutes(app);
// createCourseRoutes(app);














//1:29:00 remaining

