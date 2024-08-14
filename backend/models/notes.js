import mongoose from "mongoose";

// import mongoose, { Schema } from "mongoose";

const notesSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags:
    {
        type: [String],
        default: []
    },
    userId:
    {
        type: String,
        required:true,
        ref:"users"
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    isPinned: {
        type: Boolean,
        default: false
    }
})

export const noteModel = mongoose.model("notes", notesSchema);