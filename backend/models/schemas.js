const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const memberSchema = new Schema ({
    aemail: { type: String},
    userid: { type: String}
});

const roleObject = new Schema({
    Role: { type: String},
    members: [memberSchema], 
    id: { type: String} 
});

const rolesSchema = new Schema({
    Roles: [roleObject]
});

const ImageSchema = new mongoose.Schema({
    image_name: String,
    data: Buffer
});

const MLResultSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    bee_in: Number,
    bee_out: Number
});

module.exports = {
    RolesModel: mongoose.model('Role', rolesSchema, 'users'),
    PhotoModel: mongoose.model('Image', ImageSchema, 'Photo_test'),
    MLResultsModel: mongoose.model('MLResult', MLResultSchema, 'ML_Results')
};