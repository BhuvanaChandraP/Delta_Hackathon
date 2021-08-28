const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
var validateEmail = function(email) {
    var re =  /^\d{9}@nitt.edu/ ;
    return re.test(email)
};

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
       
    },   
   


});


UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',UserSchema);
module.exports = User ;

// validate: [validateEmail, 'Please fill a valid email address'],
// match: [/^\d{9}@nitt.edu/, 'Please fill a valid email address']
// validate: {
//     validator: (value) => /^\d{9}@nitt.edu/.test(value),
//     message: () => "please enter valid webmail",
//   }