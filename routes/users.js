const express = require('express') //import express package 

const router = express.Router(); //Create instance of Router

const db = require('../database')

//importing the package/library to help hash paswords. 
const bcrypt = require('bcrypt')
const session =require('express-session')
const flash =require('express-flash')

router.use(session({
        secret:"secret", //use env variable , it encrypts the info that we store in our session
        resave: false, // to resave session varialbe if nothing is changed 
        saveUninitialised :false //Do you save sesssion details if no value is in session ?

}))

router.use(flash())

router.post('/', (req, res)=>{

    const {firstname , surname, email, password, password1} = req.body
    
    let errors = []
    let messages =[]
   // if(!firstname || !surname || !email || !password || !password1)
   if(!req.body)
    {
    errors.push({message:"Please enter all fields"})
    }
    if(password.length<6)

      {
        errors.push({message:"Password should be atleast 6 characters"})

      }
    if (password!=password1)
    {
        errors.push({message:"passwords do not match"})
    }

    if(errors.length>0){
        res.render('pages/new-user', {errors})
    }
    else 
    {

    
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword =bcrypt.hashSync(password,salt)
         db.any('SELECT * FROM users WHERE email =$1',[email])
        
        .then((users)=>{
           if(users.length>0)
           {
               errors.push({message:"Email already registered"})
           
            res.render('pages/new-user', {errors})
           }
           else {
            //add user to db
            db.none('INSERT INTO users(firstname,surname,email, password) VALUES($1,$2,$3,$4);' ,[firstname,surname, email, hashedPassword])
            .then((users)=> {
             //req.flash("success_msg", "You are now registered . Please login ")
             
             messages.push({message:"You are now registered . Please login "})
             res.redirect('/',{messages})         
            })       
                 
            .catch((error)=>{
         
             console.log(error)
             
           //  res.redirect("/error?message=" + error.message)
           res.redirect('/')         
     
        })
             

           }

        })
        .catch((error)=>{
 
            console.log(error)
            
            res.redirect("/error?message=" + error.message)
                })
        
       

    }
})





module.exports= router