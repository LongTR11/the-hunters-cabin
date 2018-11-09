const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    isAdmin: {type: Boolean, default: false}
    
});

userSchema.methods.serialize = function() {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        isAdmin: this.isAdmin || false
    };
};

// Compares user's input password to the stored password
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// Takes user password from registration and encrypts password
userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = {User};