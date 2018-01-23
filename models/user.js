var bcrypt = require("bcrypt-nodejs");

// Our user model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        bio: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });

    // Before we create a new user we will hash 
    // their password on the way into the database
    User.beforeCreate(function(model, options){
        return new Promise (function(resolve, reject){
            bcrypt.hash(model.password, null, null, function(err, hash) {
                if(err) return reject(err);

                model.password = hash;
                return resolve(model, options);
            });
        });
    });

    return User;
};