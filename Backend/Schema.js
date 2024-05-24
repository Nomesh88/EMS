const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String
})

const HRSchema=mongoose.Schema({
    emp_id:String,
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    department:String,
    password:String

},{collection:'HR'})

const TechSchema=mongoose.Schema({
    emp_id:String,
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    department:String,
    password:String
},{collection:'Technical'})

const NonTechSchema=mongoose.Schema({
    emp_id:String,
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    department:String,
    password:String
},{collection:'Non-Technical'})

const AdminSchema=mongoose.Schema({
    emp_id:String,
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    department:String,
    password:String
},{collection:'Admin'})

const userModel=mongoose.model("users",userSchema);
const HRModel=mongoose.model("HR",HRSchema);
const JTModel=mongoose.model("Technical",TechSchema);
const JNTModel=mongoose.model("Non-Technical",NonTechSchema);
const AdModel=mongoose.model("Admin",AdminSchema);

module.exports={
    userModel,
    HRModel,
JTModel,
JNTModel,
AdModel
};