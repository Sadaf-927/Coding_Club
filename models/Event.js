const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const eventSchema = new Schema ({
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    tagline:String,
    duration:String,
    description:String
});

const Event= mongoose.model("Event",eventSchema);
module.exports=Event;