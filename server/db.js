

const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const ObjectId= mongoose.ObjectId;




const UserSchema= new Schema({

    email:{
        type:String,
        unique:true
    },
    password:String,
    firstName:String ,
    lastName:String
})

const AdminSchema= new Schema({
    email:{
       type:String,
       unique:true
    },
    password:String,
    firstName:String ,
    lastName:String

})

const CourseSchema= new Schema({
    title:String ,
    description:String,
    price:Number,
    imageUrl:String,
    createrId: ObjectId
})


// till we are not learning the references so we use it 
// below like this 

const purcahseSchema= new Schema({
    courseId:ObjectId,
    userId: ObjectId
})



const userModel= mongoose.model("user", UserSchema);

const courseModel= mongoose.model("course", CourseSchema);

const adminModel= mongoose.model("admin", AdminSchema);

const purchaseModel= mongoose.model("purchase",purcahseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}



// Assignment => use dotenv to store the database connection string


