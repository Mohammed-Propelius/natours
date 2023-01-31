const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json()) // middle wear soemthing that can modify the incoming data

// our own middleware
app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next()
})



// --> Reading The Data [GET API]
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// Methods
const getAllTours = (req,res) => {
    res.status(200).json({
        requestedAt:req.requestTime,
        status:"sucess",
        results:tours.length,
        data:{
            tours
        }
    })
}


const getTours = (req,res) => {
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
}

const createTour = (req,res) => {
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
}

const patchingTour  = (req,res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'<Update tours ....>'
        }
    })
}

const deleteTour = (req,res )=> {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }
    res.status(200).json({
        status:"success",
        data:null
    })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTours).patch(patchingTour).delete(deleteTour)


// listing on port
const port = 3000
app.listen(port,()=>{
    console.log(`Listing on the ${port}`)
})

