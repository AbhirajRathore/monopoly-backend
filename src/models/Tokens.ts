import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        ip: { type: String, required: true },
        userAgent: { type: String, required: true },
        isValid: { type: Boolean, default: true },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        admin: {
            type: mongoose.Types.ObjectId,
            ref: 'Admin',
        },
    },
    { timestamps: true }
)

export = mongoose.model('Token', TokenSchema)
