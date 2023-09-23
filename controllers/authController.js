import User from '../models/user.js';

export const registerController = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    // try-catch is automatically handling by the package "express-async-errors"
    const newUser = await User.create({firstName, lastName, email, password});
    return res.status(201).send({
        success: true,
        message: 'User Created Successfully',
        newUser
    });  
}
