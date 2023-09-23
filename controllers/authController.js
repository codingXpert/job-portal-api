import User from '../models/user.js';

export const registerController = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
    if(!firstName){
        return res.status(400).send({success: false, message: 'plz provide first name'});
    }

    if(!lastName){
        return res.status(400).send({success: false, message: 'plz provide last name'});
    }

    if(!email){
        return res.status(400).send({success: false, message: 'plz provide email'});
    }

    if(!password){
        return res.status(400).send({success: false, message: 'plz provide first password'});
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(200).send({
            success: false,
            message: 'Email already registered plz login'
        });
    }

    const newUser = await User.create({firstName, lastName, email, password});
    return res.status(201).send({
        success: true,
        message: 'User Created Successfully',
        newUser
    });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while registration',
            error: error
        });
    }
    
}
