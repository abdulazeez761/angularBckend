const express = require('express');
const bodyParser = require('body-parser');
const core = require('cors')
const mysql = require('mysql2')
const app = express(); 

app.use(core());
app.use(bodyParser.json());

//database connection
const pool = mysql.createConnection({
    host:'localhost',
    user:'azeez',
    database:'angular',
    password:'Abd26!2003',
    port:'3306'
})

//check database connection
pool.connect(function(err){
    if(err){
        console.log(err,'dberr')
    } 
    console.log('connection established')
})

//get all data from database connection
app.get('/users', function(req, res){
    
    let qry = `select * from info`
    pool.query(qry, function(err, result){
        if(err){
            console.error
        } 

        if(result.length>0){
            res.send({
                message: 'users data', 
                data:result
            })
        }
    })
})

//fetches  a single user
app.get('/users/:id', function(req, res){
    // console.log(req.params.id)
    let userId = req.params.id;
    let qry = `select * from info where id = ${userId}`
    pool.query(qry, function(err, result){
        if(err){
            console.error
        } 

        if(result.length>0){
            res.send({
                message: `${result[0]['fullname']}'s data`, 
                data:result
            })
        } else {
            res.send({message:'data not found'})
        }
    })
})

//creat data
app.post('/users' , (req , res)=>{
    
    let fullname = req.body.fullname,
        email = req.body.email,
        mobile = req.body.mobile

    // console.log(fullname , email , mobile)
    // console.log(req.body)
        let qry = `insert into info (fullname,email,mobile) values('${fullname}' ,'${email}'  ,'${mobile}') `

        pool.query(qry , (err , result)=>{
            if(err) console.log(err)
            res.send({message:'data has been inserted'})    
        })

})

//edit the data
app.put('/users/:id', (req , res)=>{
    let fullname = req.body.fullname,
    email = req.body.email,
    mobile = req.body.mobile,
    userId = req.params.id;

    let qry = `update info set fullname = '${fullname}', email = '${email}', mobile ='${mobile}' where id= ${userId}`

    pool.query(qry , (err, result)=>{
        if(err) console.log(err)

        res.send({message:'data has been updated'})
    })
})

//delete singale data
app.delete('/users/:id', (req , res)=>{

    let userId = req.params.id;

    let qry = `delete from info where id = ${userId}`

    pool.query(qry , (err,result)=>{
        if(err) console.log(err)

        res.send({message:'data has been deleted'})
    })
})




app.listen(3000 , ()=>{
    console.log('listening on http://localhost:3000')
})