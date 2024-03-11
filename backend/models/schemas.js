const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const memberSchema = new Schema ({
    aemail: { type: String},
    userid: { type: String}
});

const roleObject = new Schema({
    Role: { type: String},
    members: [memberSchema], 
    id: { type: String} //May Remove
});

const rolesSchema = new Schema({
    Roles: [roleObject]
});

const RolesModel = mongoose.model('Role', rolesSchema, 'users');

module.exports = RolesModel;