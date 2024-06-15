const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const taskRoute = require('./route/taskRoute')
const path = require('path');
dotenv.config()

const PORT =  8000

app.use(express.json())

//middleware
app.use('/api', taskRoute)

//routes
app.get('/', (req, res)=>{
    res.send('Hello node')
})
//Use a Custom Templating Engine
app.set("view engine", "ejs");
//Change views default directory 
app.set("views", path.resolve("./src/view"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to mongodb')
    app.listen(PORT, ()=>{
        console.log(`Node API app is running on port ${PORT}`)
    })
}).catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
});