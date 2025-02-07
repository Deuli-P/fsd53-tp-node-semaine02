import mongoose from "mongoose";
const {Schema, model} = mongoose

const UserSchema = new mongoose.Schema({

   firstname:{
    type : String,
    required: true,
    minLength : 3,
    maxLength : 255
   },
   lastname:{
    type : String,
    required: true,
    minLength : 3,
    maxLength : 255

   },
    email:{
      type : String,
      required: true,
      unique: true,
      lowercase: true,
      maxLength : 255

    },
    password:{
      type : String,
      required: true,
      minLength : 8,
      maxLength : 255
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;