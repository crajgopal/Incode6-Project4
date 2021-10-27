const express = require('express') //import express package 

const router = express.Router(); //Create instance of router

const db = require('../database')


router.get('/', (req, res) =>{ 

    res.render('pages/index',
    {
        title: "Mr.Coffee's schedule management app"
    })
})





module.exports =router;