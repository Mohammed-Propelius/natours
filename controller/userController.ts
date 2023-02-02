import {Request,Response} from 'express';

exports.getAllUsers = (req:Request,res:Response) => {
  res.status(500).json({
    status:'error',
    message:'This route is not defined'
  })
}

exports.createUsers = (req:Request,res:Response) => {
  res.status(500).json({
    status:'error',
    message:'This route is not defined'
  })
}

exports.getUser = (req:Request,res:Response) => {
  res.status(500).json({
    status:'error',
    message:'This route is not defined'
  })
}

exports.updateUser = (req:Request,res:Response) => {
  res.status(500).json({
    status:'error',
    message:'This route is not defined'
  })
}

exports.deleteUser = (req:Request,res:Response) => {
  res.status(500).json({
    status:'error',
    message:'This route is not defined'
  })
}
