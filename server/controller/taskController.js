import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import {Task} from "../models/taskSchema.js";

export const createTask = catchAsyncErrors(async(req, res, next) => {
    const {title, description} = req.body;
    const createdBy = req.user._id;
    const task = await Task.create({
        title,
        description,
        createdBy,
    });
    res.status(200).json({
        success: true,
        task,
        message: "Task created",
    });
});

export const deleteTask = catchAsyncErrors(async(req, res, next) => {
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task not found!", 400));
    }
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task Deleted!",
    });
});

export const updateTask = catchAsyncErrors(async(req, res, next) => {
     const {id} = req.params;
    let task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task not found!", 400));
    }
    await Task.findByIdAndUpdate(req.params.id, req.body, {
  returnDocument: "after",
  runValidators: true
});
    res.status(200).json({
        success: true,
        message: "Task updated!",
        task,
    });
});

export const getMyTask = catchAsyncErrors(async(req, res, next) => {
    const user = req.user._id;
    const task = await Task.find({createdBy: user });
    res.status(200).json({
        success: true,
        task,
    });
});

export const getSingleTask = catchAsyncErrors(async(req, res, next) => {
    const {id} = req.params;
    let task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task not found!", 400));
    }
    res.status(200).json({
        success: true,
        task,
    });
});