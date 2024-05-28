import mongoose from 'mongoose';

const { Schema } = mongoose;

const MediaSchema = new Schema({
    type: {
        type: String,
        required: true  // 'image', 'video', 'text'
    },
    content: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    validUntil: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'active'  // 'active' or 'archived'
    }
});

const Media = mongoose.model('Media', MediaSchema);
export default Media;
