const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    role: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);