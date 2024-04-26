
const jwt = require('jsonwebtoken');
const routeProtect = (req, res, next) => {

    const token = req.headers.authorization;
    console.log('hi muthew angana keri ponda');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
      // Verify the token
      
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.user = decoded; 
        console.log('Token verified:',decoded);
        next();
      });




};


module.exports={

   routeProtect

}