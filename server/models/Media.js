import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    type: { type: String, required: true, enum: ['text', 'image', 'screen1', 'screen2', 'screen3'] },
    content: { type: String, required: true },
    duration: { type: Number, required: true }, // in seconds
    validuntil: { type: Date, required: true }, // ISO date string
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // reference to User, default to null
    status: { type: String, enum: ['active', 'archived'], required: true }
}, {
    timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);
export default Media;


