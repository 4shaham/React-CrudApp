const express=require('express')
const router = express.Router();
const controller = require('../Controller/Controller')
const myMiddleware=require('../Middileware/middileware')

router.post('/api/createUser',controller.createUser)

router.post('/api/login',controller.userAuth)

router.post('/api/adminLogin',controller.adminAuth)

router.post('/api/adminCreateUser',myMiddleware.routeProtect,controller.adminCreateUser)

router.get('/api/userDetails',controller.userDetails)

router.delete('/api/deletUser',controller.deletUser)

router.get('/api/editUserData',myMiddleware.routeProtect,controller.AdminEditUserData)

router.put('/api/editUserAdmin',myMiddleware.routeProtect,controller.AdminEdit)


module.exports=router;