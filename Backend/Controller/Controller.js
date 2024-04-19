const { log } = require('console')
const UserDb=require('../Model/userSchema');
const { use } = require('../Router/UserRouter');


const createUser=async(req,res)=>{


    try{

        const{name,password,email}=req.body

        if(!name || !password){
            console.log('koooo');
            return  res.send('please fill all datas')
        }

        const isUser=await UserDb.findOne({email:email})

        if(isUser){
            return res.status(400).json({
                error: "This email is already used."
              });
        }

        const user=new UserDb({     
         userName:name,
         email:email,
         password:password
        })


        await  user.save()
        res.json({registration:true}) 

    }catch(err){
        console.log('yutyt', err);
        res.send(err)

    }
    
    
 
}


const userAuth=async(req,res)=>{

    const {email,password}=req.body
    
    if(!email.trim()=='' || password.trim()==''){
        return res.json(
            {
                err:'The field is required'
            }
        )
    }


    const user=await UserDb.findOne({email:email})

    if(!user){

        return res.json({
           err:'The email is not valid'
        })

    }

    if(user.email == email && user.password == password ){
        return res.json({
            isLogin:true
        })
    }else{
        return res.json({
            err:'Your password is not Match'
        })
    }
}


const adminAuth=async(req,res)=>{

     const{email,password}=req.body 

     if(email.trim()==''||password.trim()==''){
        return res.json({
            err:'The field is required'
        })
     }
    
     const adminEmail=process.env.ADMIN_EMAIL
     const adminPassword=process.env.ADMIN_PASSWORD

     if(adminEmail==email && adminPassword ==password){
        return res.json({
            adminIsLoged:'true'
        })
     }else{
        return res.json({
            err:'The details not match'
        })
     }


}


const userDetails=async(req,res)=>{
      
    const datas=await UserDb.find()

    if(datas){
        return res.json({
            userDatas:datas
        })
    }

}

const deletUser=async(req,res)=>{

const id=req.query.id

const user=await UserDb.findOne({id:id})

if(!user){
    return res.json({
        err:'This id user is not matched'
    })
}

const deltedUser=await UserDb.deleteOne({id:id})

if(deltedUser.acknowledged=='true'){
    return res.json({
        deltedUser:user,
        delteted:true
    })
}else{
    return res.json({
        err:'The user is not deletd'
    })
}


}




module.exports = {
    createUser,
    userAuth,
    adminAuth,
    userDetails,
    deletUser
}









