'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    update: (req, res) => {

                // User.findOneAndUpdate({email : req.body.email}, {$set: {name: req.body.name,password: req.body.password}}, {new: true}  , function(err, userUpdate){
                //     console.log("usuario " + userUpdate);
                //     if(err) res.render('config', {
                //         message: ('configMessage', 'Error al actualizar el nombre'),
                //         error: true,
                //     });
                //
                //     res.render('config', {
                //         message:('configMessage', 'Usuario Actualizado'),
                //         error: false,
                //         user: userUpdate
                //     });
                // });

    }

};
