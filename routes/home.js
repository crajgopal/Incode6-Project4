const express = require('express') //import express package 

const router = express.Router(); //Create instance of Router

const db = require('../database')
const bcrypt= require('bcryptjs')



const days =['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday' , 'Sunday']
router.use(express.urlencoded({extended:true}))//middleware to get req body.


const redirectHome=( req, res, next)=>{
    if(req.session.userId)
        res.redirect('/schedules')
    else 
      next()
    }

router.get('/', redirectHome,(req, res) =>{ 

    res.render('pages/index',
    {
        title: "Mr.Coffee's schedule management app"
    })
})



router.get( '/new-user',redirectHome ,(req, res)=>
{
    res.render('pages/new-user')
})

router.get('/logout' ,(req, res)=>
{
    req.session.destroy();
    res.redirect('/')
})






    

module.exports =router;