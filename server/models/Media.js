import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    type: { type: String, required: true, enum: ['text', 'image'] },
    content: { type: String, required: true },
    duration: { type: Number, required: true }, // in seconds
    validuntil: { type: Date, required: true }, // ISO date string
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference to User
    status: { type: String, enum: ['active', 'archived'], required: true }
}, {
    timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);
export default Media;
