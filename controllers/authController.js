import User from '../models/user.js';

export const registerController = async (req, res, next) => {
        const {firstName, lastName, email, password} = req.body;
    if(!firstName){
        next('first name is required');
    }

    if(!lastName){
        next('last name is required');
    }

    if(!email){
        next('email is required');
    }

    if(!password){
        next('password is required and should be greater than six characters');
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        next('Email already registered plz login');
    }

    const newUser = await User.create({firstName, lastName, email, password});
    return res.status(201).send({
        success: true,
        message: 'User Created Successfully',
        newUser
    });  
}
