// Nivel: aplicación
// Objetivo: Ocultar register/login de nav bar si el usuario esta logueado

const db = require('../src/database/models')
 
async function userLoggedMiddleware(req,res,next)  {
        
    // Pregunto si hay alguien en session, si lo esta, le muestro una parte de la nav bar
    // Creo en locals el false para el usuario logueado (no está logueado)
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie){
        let userLogged = await db.User.findOne({
            where:{
                email: emailInCookie
            }
        });
        req.session.userLogged = userLogged 
    };


    
    // Si hay alguien en session, cambio el valor para mostrar nav bar de usuario
    if (req.session.userLogged) {
        res.locals.isLogged = true;         
        // Tambien paso lo que tengo en session a una variable local para utilizar en las vistas
        // Por ejemplo, para que en la nav bar cuando esta logueado aparezca su img y nombre (1h 34')
        res.locals.userLogged = req.session.userLogged;
    };


    next();
};

module.exports = userLoggedMiddleware;