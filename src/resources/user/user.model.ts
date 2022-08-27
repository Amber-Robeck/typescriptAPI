import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String, 
        },
        role: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);


export default model<User>('User', UserSchema);

