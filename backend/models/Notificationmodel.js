
const mongoose=require('mongoose')




const NotificationSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true,
        
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
},
{ timestamps: true }
)

const Notification=mongoose.model("Notification",NotificationSchema)

module.exports=Notification