const express = require('express') //import express package 

const router = express.Router(); //Create instance of Router

const db = require('../database')



const days =['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday' , 'Sunday']
router.use(express.urlencoded({extended:true}))//middleware to get req body.



router.get('/', (req, res) =>{ 

    res.render('pages/index',
    {
        title: "Mr.Coffee's schedule management app"
    })
})



router.get( '/new-user' ,(req, res)=>
{
    res.render('pages/new-user')
})

router.get('/logout' ,(req, res)=>
{
    res.redirect('/')
})




    

module.exports =router;