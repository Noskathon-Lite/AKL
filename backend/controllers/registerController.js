const User =require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, password,role,firstname,lastname} = req.body;
    if (!email || !password || !role || !firstname || !lastname) return res.status(400).json({ 'message': 'email and password are required.' });
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    else{
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create & store the new user
        const result = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "role": role,
            "password": hashedPwd
            });

        console.log(result);

        res.status(201).json({ 'success': 'New user created!' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    console.log(req.body);}
}

module.exports = { handleNewUser };