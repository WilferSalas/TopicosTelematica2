'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    create: (req, res) => {
    
        User.findOne({email: req.body.email}, (err, userFound) => {
            if (req.body.password != req.body.confirmPassword){
                res.render('signup' , {
                    message: ('signupMessage', 'Contraseñas no coinciden'),
                    error: true
                });
            }else if (userFound) {
                res.render('signup' , {
                    message: ('signupMessage', 'Usuario ya existe'),
                    error: true
                });
            }
            else {
                var userToCreate = new User();
    
                userToCreate.name = req.body.name;
                userToCreate.email = req.body.email;
                userToCreate.password = req.body.password;

                
    
                userToCreate.save((errS, userSaved) => {
                    if (errS) return res.render('signup' , {
                        message: ('signupMessage','Error al crear usuario'),
                        error: true
                    });
                    res.render('login' , {
                        message: ('signupMessage','Usuario creado'),
                        error: false,
                        user: userSaved
                    });
                });
            }
        });
    }

};