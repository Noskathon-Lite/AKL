const User =require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'email and password are required.' });
    const foundUser = await User.findOne({ email: email}).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const role =foundUser.role;
        // create JWTs
        const accessToken = jwt.sign(
            {
                "email":foundUser.email,
                "role":role,
                "id":foundUser._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3d' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '12d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken= refreshToken;
        const result= await foundUser.save();
        console.log(result);
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };