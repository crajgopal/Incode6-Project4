   //loading and initialising library

   const pgp = require('pg-promise')()

   //connection string 
   const con = 'postgres://postgres:rajgopal@localhost:5432/project4'

   //create new instance of database 
   const db = pgp(con)

   //exporting the database
   module.exports = db
