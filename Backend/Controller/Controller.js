
const UserDb=require('../Model/userSchema');
const { use } = require('../Router/UserRouter');
const jwt = require('jsonwebtoken');


const createUser=async(req,res)=>{


    try{

        const{userName,password,email,url}=req.body

        if(!userName || !password){
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

         userName:userName,
         email:email,
         password:password,
         imageUrl:url

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

    console.log(email,password);
    
    // if(!email.trim()=='' || password.trim()==''){
    //     return res.json(
    //         {
    //             err:'The field is required'
    //         }
    //     )
    // }  


    const user=await UserDb.findOne({email:email})

    if(!user){

        return res.json({
           err:'The email is not valid'
        })

    }

    if(user.email == email && user.password == password ){

        let jwtSecretKey =process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userName: user.userName,
            userId: user._id,
          };
          
          const token = jwt.sign(data, jwtSecretKey, { expiresIn: '1h' });
          return res.json({
            isLogin: true,
            userData: user,
            jwtToken: token,
          });

    }else{

        return res.json({
            err:'Your password is not Match'
        })

    }
}


// admin side


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

        let jwtSecretKey =process.env.JWT_SECRET_KEY;
        let data = {
            time:Date(),
            email:adminEmail,
        };

        const token = jwt.sign(data, jwtSecretKey, { expiresIn: '1h' });
        return res.json({
            adminIsLoged:'true',
            jwtToken: token,
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

 try{

    
const id=req.query.id
console.log(req.query)
const user=await UserDb.findOne({_id:id})

if(!user){
    return res.json({
        err:'This id user is not matched'
    })
}

const deltedUser=await UserDb.deleteOne({_id:id})
const find=await UserDb.findOne({_id:id})
console.log(deltedUser,find)
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

 }catch(err){
    console.log(err)
 }   



}


const adminCreateUser=async(req,res)=>{
   
    try{

        const{userName,password,email,url}=req.body



        const isUser=await UserDb.findOne({email:email})

        if(isUser){
            return res.status(400).json({
                error: "This email is already used."
              });
        }

        const user=new UserDb({   

         userName:userName,
         email:email,
         password:password,
         imageUrl:url

        })


        await  user.save()
        res.json({registration:true}) 

    }catch(err){
        console.log('yutyt', err);
        res.send(err)

    }

    
}

const AdminEditUserData=async(req,res)=>{

    try{
      const id =req.query.id
      const userData=await UserDb.findOne({_id:id})

      if(userData){
        res.status(200).json({
            userData:userData
          });
      }else{
        res.status(401).json({
            error: "This id user not here."
          });

      }

    }catch(err){
        console.log(err)
    }

}


const AdminEdit=async(req,res)=>{
    try{

        const id=req.query.id 
        const{userName,email,password,url}=req.body
       
        if(!url){
            url=req.body.imageUrl
        }   
        console.log(req.body,url)
        const updated = await UserDb.updateOne(
            { _id: id },
            {
              $set: {
                // userId: editeduserDetails.userId,
                userName:userName,
                email:email,
                password:password,
                imageUrl:url
              }
            }
          );

          return res.json('sucesss')

    }catch(err){
        console.log(err)
    }
    

}



module.exports = {
    createUser,
    userAuth,
    adminAuth,
    userDetails,
    deletUser,
    adminCreateUser,
    AdminEditUserData,
    AdminEdit
}









