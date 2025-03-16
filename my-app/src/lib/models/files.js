// import mongoose from 'mongoose';
//
// function gettime(date) {
//     var year = date.getFullYear();
//     var month = String(date.getMonth() + 1).padStart(2, "0");
//     var day = String(date.getDate()).padStart(2, "0");
//     var hour = String(date.getHours()).padStart(2, "0");
//     var minute = String(date.getMinutes()).padStart(2, "0");
//     var second = String(date.getSeconds()).padStart(2, "0");
//     return `${year}${month}${day} ${hour}${minute}${second}`;
// }
//
// const FileSchema = new mongoose.Schema(
//     {
//         ownerId: { type: String, required: true },
//         title: { type: String, required: true, default: '' },
//         fileName: { type: String, required: true },
//         previewHash: { type: String, required: true },
//         tags: {
//             type: [String],
//             default: [],
//         },
//     },
//     { timestamps: true }
// );
//
//
// FileSchema.path('createdAt').get(gettime);
// FileSchema.path('updatedAt').get(gettime);
//
// let File;
// if (mongoose.models.File) {
//     File = mongoose.models.File;
// } else {
//     File = mongoose.model('File', FileSchema);
// }
// export default File;
