
require('dotenv').config();

const express= require('express')//import express package

const router = express.Router() //Create instance of Router

const db = require('../database')
const bcrypt= require('bcryptjs')

const days =['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday' , 'Sunday']

router.use(express.urlencoded({extended:true}))//middleware to get req body.





//Get all schedules 
router.get('/', (req, res)=>{
    
    db.any("SELECT *, TO_CHAR(start_time,'HH12:MI AM')start_time ,TO_CHAR(end_time,'HH12:MI AM')end_time FROM schedules;")
       .then((schedules) => {
    
        db.any('SELECT * FROM users;')
        .then((users)=>{
    
         res.render('pages/schedules' , {
            title:'Schedule website',
            schedules,
            days,
            users,
            message: req.query.message
    
        });
     })
    
      .catch((error) =>{
    
        console.log(error)
        res.redirect("/error?message ="+ error.message)
      })
      
    
    })
    .catch((error) =>{
    
      console.log(error)
      res.redirect("/error?message ="+ error.message)
    })
    
    })
 


    router.post('/', (req, res)=>{
      console.log(req.session)        
        const {email, password} = req.body
        const cleanedEmail = email.toLowerCase().trim()
        console.log(cleanedEmail)
        let errors = []
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword =bcrypt.hashSync(password,salt)
        
  //  does user exist?

   db.any('SELECT * FROM users WHERE email =$1',[cleanedEmail])

    .then((user)=>{
      console.log(user)
      if (!user) return res.send("Credentials are not correct")

       //  if so, is password correct?
    const checkPassword = bcrypt.compareSync(password, user[0].password)
    if (!checkPassword) return res.send("Credentials are not correct")


     // const user = users.find( user=> user.email===email && user.password===hashedPassword)
      
     //user is valid 
        if(user){
        req.session.userId =user[0].id
        console.log(req.session)
        res.redirect('/schedules')         
        }
        else {
            errors.push({message:"Invalid User"})
            console.log(errors[0].message)
            res.redirect('/')
         }
        
    
    })
    
        .catch((error)=>{
         
            console.log(error)
            
          //  res.redirect("/error?message=" + error.message)
          res.redirect('/new-user')         
    
       })
    })
           
/*

        db.any("SELECT *, TO_CHAR(start_time,'HH12:MI AM')start_time ,TO_CHAR(end_time,'HH12:MI AM')end_time FROM schedules;")
           .then((schedules) => {
        
            db.any('SELECT * FROM users;')
            .then((users)=>{
        
             res.render('pages/schedules' , {
                title:'Schedule website',
                schedules,
                days,
                users,
                message: req.query.message
        
            });
         })
        
          .catch((error) =>{
        
            console.log(error)
            res.redirect("/error?message ="+ error.message)
          })
          
        
        })
        .catch((error) =>{
        
          console.log(error)
          res.redirect("/error?message ="+ error.message)
        })
        
        

    })
    
*/



module.exports = router 