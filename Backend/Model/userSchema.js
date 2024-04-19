const mongoose=require('mongoose')


const schema=mongoose.Schema({

userName:{
    type:String,
    required:true
},
email:{
  type:String,
  required:true,
},
password:{
  type:String,
  required:true
}
// imageId:{
//     type:String,
//     required:true
// }
 
})

const UserDb = mongoose.model('Userdb',schema);
module.exports = UserDb;