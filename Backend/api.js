const mongoose=require('mongoose')
const dotenv=require('dotenv')
const { HRModel,JTModel,JNTModel,AdModel }=require('./Schema')

dotenv.config();

//establish connection with databse
const connectDB = async ()=>{
    try{
   await mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   }).then(()=>{
        console.log('Database Connected ')
    })
}
catch(error){
    console.error('Error Connecting to MongoDB',error)
   // process.exit(1);
}
}

//get all users 
const getALL=async ()=>{
    try{
        const HRData=await HRModel.find().lean();
        const TechData=await JTModel.find().lean();
        const NontechData=await JNTModel.find().lean();
        const AdminData=await AdModel.find().lean();
        // Combine the results into one object
        const combinedData = {
            collection1: HRData,
            collection2: TechData,
            collection3: NontechData,
            collection4: AdminData,
          };
        
       return combinedData;
        
            }
            catch(error){
               return error
            }
        
}

//Add a specific user
const addUser= async (req,res) =>{
    const dept=req.body.department;
    const {emp_id,first_name,last_name,email,gender,department,password} =req.body;
if(dept.substring(0,2)==='HR'){
    try{
  await HRModel.create({
   emp_id,
   first_name,
   last_name,email,gender,department,password,
  }).then(user =>
    res.status(200).json({
      message: "User successfully created",
      user,
    })
  )
}
catch(err){
    res.status(401).json({
        message: "User not successful created",
        error: err.mesage,
      })
    }
}
else if(dept.substring(0,2)==='Ad'){
    try{
    await AdModel.create({
        emp_id,
        first_name,
        last_name,email,gender,department,password,
       }).then(user =>
        res.status(200).json({
          message: "User successfully created",
          user,
        })
      )
    }
    catch(err){
        res.status(401).json({
            message: "User not successful created",
            error: err.mesage,
          })
        }
}
else if(dept.substring(0,2)==='JT'){
    try{
        await JTModel.create({
            emp_id,
            first_name,
            last_name,email,gender,department,password,
           }).then(user =>
            res.status(200).json({
              message: "User successfully created",
              user,
            })
          )
        }
        catch(err){
            res.status(401).json({
                message: "User not successful created",
                error: err.mesage,
              })
            }
}
else if(dept.substring(0,3)==='JNT'){
    try{
        await JNTModel.create({
            emp_id,
            first_name,
            last_name,email,gender,department,password,
           }).then(user =>
            res.status(200).json({
              message: "User successfully created",
              user,
            })
          )
        }
        catch(err){
            res.status(401).json({
                message: "User not successful created",
                error: err.mesage,
              })
        }
}
else{
    res.send('Provided Department is not correct')
}
}

const updateUser=async(req,res)=>{
const {id,dept}=req.params;
const updateFields=req.body;
if(dept.substring(0,2)==='HR'){
    try{
        const updatedDocument=await HRModel.findOneAndUpdate({emp_id:id},{$set:updateFields},{new:true});
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
          }
          res.send(updatedDocument);
        } catch (error) {
          res.status(500).send('Error updating document: ' + error.message);
        }
    }
else if(dept.substring(0,2)==='Ad'){
    try{
        const updatedDocument=await AdModel.findOneAndUpdate({emp_id:id},{$set:updateFields},{new:true});   
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
            }
            res.send(updatedDocument);
        } catch (error) {
            res.status(500).send('Error updating document: ' + error.message);
        }
    }
else if(dept.substring(0,2)==='JT'){
    try{
        const updatedDocument=await JTModel.findOneAndUpdate({emp_id:id},{$set:updateFields},{new:true});
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
            }
            res.send(updatedDocument);
        } catch (error) {
            res.status(500).send('Error updating document: ' + error.message);
        }
    }
else if(dept.substring(0,3)==='JNT'){
    try{
        const updatedDocument=await JNTModel.findOneAndUpdate({emp_id:id},{$set:updateFields},{new:true});
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
            }
            res.send(updatedDocument);
        } catch (error) {
            res.status(500).send('Error updating document: ' + error.message);
        }
    }
    else{
        res.send('Department not matched')
    }
}

const deleteUser=async(req,res)=>{
    const {id,dept}=req.params;
    console.log(id,dept)
if(dept.substring(0,2)==='HR'){
    try{
        const updatedDocument=await HRModel.findOneAndDelete({emp_id:id});
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
          }
          res.send(updatedDocument);
        } catch (error) {
          res.status(500).send('Error updating document: ' + error.message);
        }
    }
else if(dept.substring(0,2)==='Ad'){
    try{
        const updatedDocument=await AdModel.findOneAndDelete({emp_id:id});   
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
            }
            res.send(updatedDocument);
        } catch (error) {
            res.status(500).send('Error updating document: ' + error.message);
        }
    }
else if(dept.substring(0,2)==='JT'){
    try{
        const updatedDocument=await JTModel.findOneAndDelete({emp_id:id});
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
            }
            res.send(updatedDocument);
        } catch (error) {
            res.status(500).send('Error updating document: ' + error.message);
        }
    }
else if(dept.substring(0,3)==='JNT'){
    try{
        const updatedDocument=await JNTModel.findOneAndDelete({emp_id:id});
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
            }
            res.send(updatedDocument);
        } catch (error) {
            res.status(500).send('Error updating document: ' + error.message);
        }
    }
    else{
        res.send('Department not matched')
    }
}

const checkUser=async (emp_ids,password)=>{
    if(emp_ids.substring(0,2)==='HR'){
        try{
            const updatedDocument=await HRModel.findOne({emp_id:emp_ids});
           if (updatedDocument.password===password){
                return updatedDocument
            }
            else {
                return 401
            }
            } catch (error) {
                return 500
            }
        }
    else if(emp_ids.substring(0,2)==='Ad'){
        try{
            const updatedDocument=await HRModel.findOne({emp_id:emp_ids});
            if (updatedDocument.password===password){
                return 200
            }
            else {
                return 401
            }
            } catch (error) {
                return 500
            }
        }
    else if(emp_ids.substring(0,2)==='JT'){
        try{
            const updatedDocument=await HRModel.findOne({emp_id:emp_ids});
            if (updatedDocument.password===password){
                return 200
            }
            else {
                return 401
            }
            } catch (error) {
                return 500
            }
        }
    else if(emp_ids.substring(0,3)==='JNT'){
        try{
            const updatedDocument=await HRModel.findOne({emp_id:emp_ids});
            if (updatedDocument.password===password){
                return 200
            }
            else {
                return 401
            }
            } catch (error) {
              return 500
            }
        }
        else{
            return 505
        }

}
module.exports={connectDB,getALL,addUser,updateUser,deleteUser,checkUser};