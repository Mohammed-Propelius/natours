import { Request, Response } from 'express';
const Tours: any = require('../models/tourModel');

exports.getAllTours = async (
  req: {
    query: any;
    Request: Request;
    requestTime: any;
  },
  res: Response
) => {
  try {
    // Filtering
    const queryObject = { ...req.query };
    const exculdedFields = ['sort', 'page', 'limit', 'fields'];
    exculdedFields.forEach((el) => delete queryObject[el]);

    // Advanced Filtering with operators
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Query
    let query = Tours.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-_id');
    }

    //  Field Limit
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select('name duration price');
    } else {
      query = query.select('-__v');
    }

    // Paginations
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tours.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    const tours = await query;

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
