const User=require('../models/mongo-schema')
const userfetch = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, 'username email _id');
    } catch (error) {
        return res.status(500).json({ message: 'Fetching failed, please try again.' }); // Change 1
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
const userSignup=async (req, res, next)=>{
    const {username, password, email}=req.body
    let existingUser
    try {
        existingUser=await User.findOne({email: email})
    } catch (error) {
        console.error('Error finding user:', error); // Improved error logging
        return res.status(500).json({ message: 'Fetching user details failed, please try again later.' }); // Change 2
    }
    if (existingUser){
        return res.status(401).json({ message: 'User already exists with this email.' }); // Change 3

    }
    const createdUser=new User({
        username: username,
        password: password,
        email: email
    })
    try {
        await createdUser.save()
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(422).json({ message: 'Registering user failed, please try again.' }); // Change 4

    }
    req.session.user = createdUser._id;
    res.status(201).json({ user: createdUser.toObject({ getters: true }) });

}
const userlogin = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ message: 'Unexpected error occurred, please try again.' }); // Change 5
    }
    if (!existingUser || existingUser.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials, please try again.' }); // Change 6
    }
    req.session.user = existingUser._id;

    res.json({ user: existingUser.toObject({ getters: true }) });
};
const userLogout=async (req, res, next)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(400).json({message: 'Logout failed'})
        }
        res.status(200).json({message: 'logout successful'})
    })
}


exports.userfetch=userfetch
exports.userSignup=userSignup
exports.userlogin=userlogin
exports.userLogout=userLogout
