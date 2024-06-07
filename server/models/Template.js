import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const templateSchema = new Schema({
    data: { type: Object, required: true },
}, {
    timestamps: true
});

const Template = mongoose.model('Template', templateSchema);
export default Template;
