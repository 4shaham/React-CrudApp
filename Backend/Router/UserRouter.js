const express=require('express')
const router = express.Router();
const controller = require('../Controller/Controller')
const myMiddleware=require('../Middileware/middileware')

router.post('/api/createUser',myMiddleware.routeProtect,controller.createUser)

router.post('/api/login',controller.userAuth)

router.post('/api/adminLogin',controller.adminAuth)

router.post('/api/adminCreateUser',controller.adminCreateUser)

router.get('/api/userDetails',controller.userDetails)

router.delete('/api/deletUser',controller.deletUser)


module.exports=router;