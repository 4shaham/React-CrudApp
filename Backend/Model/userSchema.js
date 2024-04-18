const mongoose=require('mongoose')


const schema=mongoose.Schema({

userName:{
    type:String,
    required:true
},
email:{
  type:String,
  required:true,
  unique:true
},
imageId:{
    type:String,
    required:true
}

})

const UserDb = mongoose.model('Product',schema);
export default UserDb;