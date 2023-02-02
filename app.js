const express = require('express')
const fs = require('fs')
const app = express()
const morgan = require('morgan')


app.use(express.json()) // middle wear soemthing that can modify the incoming data
// our own middleware
app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next()
})

app.use(morgan('dev'))
// --> Reading The Data [GET API]
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// Methods [Tours]
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

// --> METHODS [USERS]
const getAllUsers = (req,res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
    })
}

const createUsers = (req,res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
    })
}

const getUser = (req,res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
    })
}

const updateUser = (req,res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
    })
}

const deleteUser = (req,res) => {
    res.status(500).json({
        status:'error',
        message:'This route is not defined'
    })
}

//  ---> [ ROUTES ]
const userRoute = express.Router()
const tourRoute = express.Router()
tourRoute('/').get(getAllTours).post(createTour)
tourRoute('/:id').get(getTours).patch(patchingTour).delete(deleteTour)
userRoute('/').get(getAllUsers).post(createUsers)
userRoute('/:id').get(getUser).patch(updateUser).delete(deleteUser)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/tours',tourRoute)
// listing on port
const port = 3002
app.listen(port,()=>{
    console.log(`Listing on the ${port}`)
})

