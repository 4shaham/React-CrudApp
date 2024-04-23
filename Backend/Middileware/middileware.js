

const routeProtect = (req, res, next) => {

    console.log('Middleware executed');
    next(); 
};


module.exports={

   routeProtect

}