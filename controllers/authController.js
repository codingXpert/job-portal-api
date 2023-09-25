import User from '../models/user.js';

export const registerController = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    // try-catch is automatically handling by the package "express-async-errors"
    const newUser = await User.create({firstName, lastName, email, password});
    const token = newUser.createJWT();
    return res.status(201).send({
        success: true,
        message: 'User Created Successfully',
        newUser,
        token
    });  
}


export const loginController = async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        next('please provide all the required fields');
    }
    const user = await User.findOne({email}).select('+password'); //removing the password from response
    if(!user) {
        next('Invalid Username or Password');
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        next('Invalid Username or Password');
    }

    user.password = undefined;
    const token = user.createJWT();
    return res.status(200).json({
        success: true,
        message: 'Login Successfully',
        user,
        token
    });
}


export const updateUserController = async (req, res, next) => {
  const { firstName, email, lastName, location } = req.body;
  if (!firstName || !email || !lastName || !location) {
    next("Please Provide All Fields");
  }
  const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, { new: true });
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};