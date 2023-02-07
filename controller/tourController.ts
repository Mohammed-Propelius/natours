import { Request, Response } from 'express';
const Tours: any = require('../models/tourModel');

exports.getAllTours = async (
  req: { Request: Request; requestTime: any },
  res: Response
) => {
  try {
    const tours = await Tours.find();
    res.status(200).json({
      requestedAt: req.requestTime,
      status: 'sucess',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTours = async (
  req: { Request: Request; params: { id: number } },
  res: Response
) => {
  try {
    const tour = await Tours.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.createTour = async (req: any, res: Response) => {
  try {
    const newTour = await Tours.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (
  req: {
    body(
      id: number,
      body: any,
      arg2: { new: boolean; newValidator: boolean }
    ): unknown;
    Request: Request;
    params: { id: number };
  },
  res: Response
) => {
  try {
    const tour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tours.findByIdAndDelete(req.params.id, req.body);
    {
      res.status(200).json({
        status: 'success',
        data: null,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'Deletion Fail',
    });
  }
};
