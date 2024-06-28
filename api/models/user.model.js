import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        photoURL: {
            type: String,
            default: "https://images.app.goo.gl/msUpp6dR595J5m2c8",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    }, {timestamps: true}
);

const User = mongoose.model('User',userSchema);

export default User;