const express = require('express')
const app = express()
const tourRoute  = require('./routes/tourRoutes')
const userRoute = require('./routes/userRoutes')

app.use('/api/v1/tours',tourRoute)
app.use('/api/v1/users',userRoute)
// listing on port
const port = 3000
app.listen(port,()=>{
    console.log(`Listing on the ${port}`)
})

