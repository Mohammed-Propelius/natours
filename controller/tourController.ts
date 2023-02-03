import { Request, Response } from 'express';

const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req: any, res: any, next: () => void, val: number) => {
  if (val * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (
  req: { Request: Request; requestTime: any },
  res: Response
) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'sucess',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTours = (
  req: { Request: Request; params: { id: number } },
  res: Response
) => {
  const id = 1 * req.params.id;
  const tour = tours.find((index: { id: number }) => index.id === id);
  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: {
      tour,
    },
  });
};

exports.createTour = (req: Request, res: Response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (
  req: { Request: Request; params: { id: number } },
  res: Response
) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tours ....>',
    },
  });
};

exports.deleteTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
