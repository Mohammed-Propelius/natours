const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json()) // middle wear soemthing that can modify the incoming data

// --> Reading The Data [GET API]
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Getting id by the value
app.get('/api/v1/tours/:id',(req,res) => {
    const id = req.params.id * 1;
    const tour = tours.find(index => index.id === id)
    if(id > tours.length){
        res.status(404).json({
            "status":"fail",
            "message":"Invalid ID"
        })
    }
    res.status(200).json({
        status:"sucess", 
        results:tours.length,
        data:{
            tour
        }
    })
})

// -> Requesting to edit Data [POST API]
app.post('/api/v1/tours',(req,res) => {
    const newId = tours[tours.length - 1].id+1
    const newTour = Object.assign({id:newId},req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
        res.status(201).json({
            status:"sucess",
            data:{
                tour:newTour
            }
        })
    }) 
}) 
// listing on port
const port = 3000
app.listen(port,()=>{
    console.log(`Listing on the ${port}`)
})

