const bcrypt = require('bcrypt');
var Role = require('../models/Role.js');
var User = require('../models/User.js');
var UsersHasRoles = require('../models/UsersHasRoles.js');
var Permission = require('../models/Permission.js');
var RolesHasPermissions = require('../models/RolesHasPermissions.js');

async function StartData(){
    //Creating the first role
    try{
        await Role.create({ rol:process.env.ADMIN_ROLE, idrol:process.env.ADMIN_IDROL });
    }
    catch(err){
        console.log(`The role ${process.env.ADMIN_IDRO} already was created`)
    }
    //Creating the first user
    try{
        await User.create({
            iduser: process.env.ADMIN_IDUSER,
            password: bcrypt.hashSync(process.env.ADMIN_PASSWORD,10),
            name: process.env.ADMIN_NAME,
            lastname: process.env.ADMIN_LASTNAME,
            email: process.env.ADMIN_EMAIL,
            telephone: process.env.ADMIN_TELEPHONE,
            iddocument: process.env.ADMIN_IDDOCUMENT,
        });
    }
    catch(err){
        console.log("**--The user "+ process.env.ADMIN_EMAIL +" already was created--**");
    }
    //Asigning the role created to user created
    try{
        await UsersHasRoles.create({
            iduser: process.env.ADMIN_IDUSER,
            idrol: process.env.ADMIN_IDRO,
        });
    }
    catch(err){
        console.log("**--The user "+ process.env.ADMIN_EMAIL +" already have the role admin--**");
    }
    //Updating permissions for all routes on web
    try{
        var routes = require('../routes/routes').routes;
        for(var route of routes){
          try{
            await Permission.create({
                name:route.name,
                path:route.path
            })
          }
          catch(err){
            console.log(`The route ${route.name} already has been created!`)
          }
        }
        res.json(routes);
    }
    catch(err){
        console.log(err)
    }
    //Asigning all permissions of role created
    try{
        var permissionsSavedDB = await Permission.findAll();
        for(var permission of permissionsSavedDB){
            try{
                await RolesHasPermissions.create({idrol: process.env.ADMIN_IDROL , idpermission: permission.idpermission })
            }
            catch(err){
                console.log(`The role ${process.env.ADMIN_IDROL} already have the permission ${permission.name}`)
            }
        }
    }
    catch(err){
        console.log(err)
    }

    console.log("**--Please login with these credentials--**");
    console.log("**--email: "+ process.env.ADMIN_EMAIL +" --**");
    console.log("**--pass: "+ process.env.ADMIN_PASSWORD +" --**");
}

module.exports = StartData();
