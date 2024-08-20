const express = require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

let conn=mongoose.connect(`mongodb+srv://kannannaidu73:rqhHqLFEPV4RwIpE@cluster0.d3cju.mongodb.net/Userinfo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connection');
})
const app = express()
const port = 3000

//Schema 
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    number:Number
 });

 //Store as a model
 const user=mongoose.model("user",userSchema);

 //middleware
 app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
})

app.post('/submit',(req,res)=>{

    const {name ,email,password,number}=req.body;
    user.findOne({email :email}).then((found)=>{
        if(found){
            res.sendFile(__dirname+"/error.html");
        }
        else{
            const newuser =new user({name,email,password,number});
            newuser.save()
            .then(()=>{
                res.sendFile(__dirname+"/submit.html");
            })
            .catch((err)=>{
                res.send('Error saving user: ' + err.message);
            })
        }
    })
    .catch((error)=>{
        res.send('Error checking email: ' + error.message);
    })
   
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
