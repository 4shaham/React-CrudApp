const express=require('express')
const router = express.Router();
const userController = require('../Controller/Controller')

router.post('/api/createUser', userController.createUser)

router.post('/api/login',userController.userAuth)

router.post('/api/adminLogin',userController.adminAuth)


router.get('/api/userDetails',userController.userDetails)

router.delete('/api/deletUser',userController.deletUser)


module.exports=router;