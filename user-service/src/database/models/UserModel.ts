import mongoose, {Schema, Document} from "mongoose";
import validator, { isLowercase, trim } from "validator";

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    createAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required: [true, "Name must be provided"],
            minlength: 3,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            isLowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please provide valid Email"],
        },
        password:{
            type: String,
            trim: false,
            required: [true, "Password must be provided"],
            //select: false,
            minlength: 8,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model<IUser>("User",UserSchema);
export default User