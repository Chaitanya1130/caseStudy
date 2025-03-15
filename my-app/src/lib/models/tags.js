import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({

    categories: {
        work: {
            type: [String],
            default: [],
        },
        personal: {
            type: [String],
            default: [],
        }
    }
});

let Tag;
if (mongoose.models.Tag) {
    Tag = mongoose.models.Tag;
} else {
    Tag = mongoose.model('Tag', tagSchema);
}

export default Tag;
