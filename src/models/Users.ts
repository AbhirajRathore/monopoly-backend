import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: [3, "Username should have at least 3 characters"],
        maxlength: [60, "Username cannot have more than 15 characters"]
    },
    score:{
        type : Number,
        default : 0
    },
    balance:{
        type : Number,
        default : 0
    },
    wallet_address:{
        type : String
    },
    verificationToken: String,
    bio: {
        type: String,
    },
    instagram: {
        type: String,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
    friends: {
        type: [],
    },
    backgroundUrl: String,
    isAdmin: {
        type:Boolean,
        default : false
    },
    avatar: {
        type : String
    },
    nonce: String,
},
    { timestamps: true }
);

export = mongoose.model('Users', UserSchema)