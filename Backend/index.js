const express=require('express');
const {connectDB,getALL,addUser,updateUser,deleteUser, checkUser}=require('./api')
var cors=require('cors')

var bodyParser=require('body-parser')
require('dotenv').config();

const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
const PORT =process.env.SERVER_PORT || 5001

// app.post("/login",async (req,res)=>{
//     console.log(req.query.email,req.query.password)
//     await User.find({email:req.query.email,password:req.query.password}).then((results)=>res.json(results)).catch((error)=>res.status(400).json({error}))
// })


app.get("/getAll",async (req,res)=>{
 const finalData=await getALL();
 //access values like finalData.collection1[0].params
    try{
   res.send(finalData)
    }
    catch(err){
        res.send(err)
    }
})

app.post("/addUser",async(req,res)=>{
    try{
        await addUser(req,res);
    }
    catch(err){
        res.send(err)
    }

  
})

app.put("/:id/:dept",async(req,res)=>{
try{
await updateUser(req,res)
}
catch(err){
    res.send(err)
}
})

app.delete("/:id/:dept",async(req,res)=>{
try{
    await deleteUser(req,res)
}
catch(err){
    res.send(err)
}
}
)
const startServer =async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

app.get("/user/:emp_id/:password",async (req,res)=>{
const emp_id=req.params.emp_id;
const password=req.params.password;
try{
const resp=await checkUser(emp_id,password);
res.send(resp)
}
catch(err){
    console.log(err)
    res.send(err)
}

})

startServer();