import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema ({
    googleId : { type: String , required: true},
    displayName : { type: String , required: true},
    emails : { type: String , required: true},
    images : { type: String , required: true},
    firstName : { type: String , required: true},
    lastName : { type: String , required: true}
},{ timestamps : true} )

const User = mongoose.model("users", user);
export default User;