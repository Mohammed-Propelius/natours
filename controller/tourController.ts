const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

 exports.getAllTours = (req,res) => {
  res.status(200).json({
    requestedAt:req.requestTime,
    status:"sucess",
    results:tours.length,
    data:{
      tours
    }
  })
}



 exports.getTours = (req,res) => {
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

 exports.createTour = (req,res) => {
  const newId = tours[tours.length - 1].id+1
  const newTour = Object.assign({id:newId},req.body)
  tours.push(newTour)
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
    res.status(201).json({
      status:"sucess",
      data:{
        tour:newTour
      }
    })
  })
}

 exports.patchingTour  = (req,res) => {
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

 exports.deleteTour = (req,res )=> {
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
