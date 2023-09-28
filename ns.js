var express = require('express')  
var app = express()  
app.use(express.static('public'));
const bp = require("body-parser");
const ph = require("password-hash");
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}));

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
initializeApp({
    credential: cert(serviceAccount)
  });
const db = getFirestore();
app.get('/signup', function (req, res) {
    res.sendFile( __dirname + "/public/" + "signup.html" );
    
})
app.post('/signupsubmit', function (req, res) {  
    
    db.collection("Users")
    .where('Email', '==' , req.body.email)
    .get()
    .then((docs) => {
        if(docs.size > 0){
            res.send("A user already exists with this email use another")
        }
        else{
            db.collection("Users").add({
                name:req.body.name,
                Email:req.body.email,
                Password:ph.generate(req.body.password)
            }).then(() => {
            res.sendFile( __dirname + "/public/" + "login.html" );

            })
            
        }
    });
})    
app.get('/login', function (req, res) {  
    res.sendFile( __dirname + "/public/" + "login.html" );
})
  
app.post('/loginsubmit', function (req, res) {  
    const email=req.body.email;
    const pswrd=req.body.password;
    
    db.collection("Users")
    .where('Email','==',email)
    .get()
    .then((docs) => {
        let verified=false;
        docs.forEach(doc=>{
        verified=ph.verify(pswrd, doc.data().Password);
    })
    if(verified){
        res.sendFile(__dirname + "/public/" + "index.html");
    }
    else{
        res.send('Please check login credentials');
    }
    })
})
app.listen(8080);