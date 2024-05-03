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

const groupSchema = new Schema ({
    name: { type: String},
    address: { type: String}
});

const cameraSchema = new Schema ({
    Group: [groupSchema]
});

const ImageSchema = new mongoose.Schema({
    image_name: String,
    data: Buffer
});


module.exports = {
    RolesModel: mongoose.model('Role', rolesSchema, 'users'),
    CameraModel: mongoose.model('Group', cameraSchema, 'camera_addresses'),
    PhotoModel: mongoose.model('Image', ImageSchema, 'Photo_test')
};