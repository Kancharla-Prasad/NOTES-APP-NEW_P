import express from 'express';
import { middleware } from '../middleware.js';
import { noteModel } from '../models/notes.js';
const router = express.Router();


//ROUTER1:ADD NEW NOTE 
router.post('/addnote',middleware,async(req,res)=>{
    try {
        const{title,content,tags} = req.body;
        // const {id} = req.user;
        const id = req.user._id;

        if(!title){
            return res.json({"error":"true",
                "Message":"Title is Required"
            })
        }

        if(!content){
            return res.json({"error":"true",
                "Message":"Content is Required"
            })
        }

        const newNote = {
            title,content,tags,
            userId:id
        }

        //insert the newNote into database
        const resultNewNote = await noteModel.create(newNote);
        if(!resultNewNote) return res.json({"Error":"True",
            "Message":"Note Not inserted"
        })
        return res.json({
            "Message":"Inserted Succesfully",
            "NewNote":resultNewNote
        })
    } catch (error) {
        console.log(error.message+"addnotes");
    }
})


//ROUTER2: GET ALL NOTES BY SPECIFIC USER
router.get('/get-all-notes',middleware,async(req,res)=>{
    try {
        const id = req.user._id;
        const findAllNotes = await noteModel.find({userId:id});
        if(findAllNotes){
            return res.json({"Data":findAllNotes,
                "Count":findAllNotes.length,
                "Message":"All books retrieved..."
            })
        }
        return res.status(400).send("Not retrieved..");
    } catch (error) {
        return res.json(error.message+"GEt all notes")
    }
})



//ROUTER3: UPDATE A NOTE
router.put('/edit-note/:noteid',middleware,async(req,res)=>{
    try {
        const userid = req.user._id;
        const noteid = req.params.noteid;
        const {title,content,tags} = req.body;
        if(!title || !content){
            return res.json({
                "Error":"True",
                "Message":"Not perfectly updated"
            })
        }

        const noteExist = await noteModel.findOne({"userId":userid,"_id":noteid});
        if(!noteExist){
            return res.json({
                "Error":"True",
                "Message":"NoteBook Not found"
            })
        }

        const updateNoteBook = {
            title,
            content,
            tags,
            userId:userid
        }

        const resultUpdateNote = await noteModel.findByIdAndUpdate(noteid,updateNoteBook);
        if(resultUpdateNote){
            return res.json({
                "Message":"Updated Succesfully"
            })
        }
        
        return res.json({
            "Error":"True",
            "Message":"Not updated Succesfully"
        })



    } catch (error) {
        return res.json({
            "Message":error.message+"in Edit ROuter"
        });
    }
})


//ROUTER4: DELETE A NOTE
router.delete('/delete-note/:noteid',middleware,async(req,res)=>{
    try {
        const noteid = req.params.noteid;
        const userid = req.user._id;

        const noteExist = await noteModel.findOne({"_id":noteid,"userId":userid});
        if(!noteExist){
            return res.json({
                "Error":"True",
                "Message":"Note Not Found"
            })
        }

        //delete that notebook
        const resDeleteNote = await noteModel.findByIdAndDelete(noteid);
        if(resDeleteNote){
            return res.json({
                "Message":"Deleted Succesfully"
            })
        }
        
        return res.json({
            "Error":"True",
            "Message":"Note deleted see again the code"
        })

    } catch (error) {
        return res.json(error.message+"In Delete ROuter");
    }
})



//ROUTER5: GET A SINGLE NOTE BASED ON NOTEID
router.get('/getnote/:noteid',middleware,async(req,res)=>{
    //
    try {
        const noteid = req.params.noteid;
        const userid = req.user._id;

        const noteExist = await noteModel.findOne({"_id":noteid,"userId":userid});
        if(!noteExist){
            return res.json({
                "Error":"True",
                "Message":"Note Not Found"
            })
        }
        
        return res.json({
            "Message":"Retrieved Succesfully",
            "Data":noteExist
        });
    } catch (error) {
        // console.log();
        return res.json(error.message+"in get a single note based on noteid");
    }
})



//ROUTER6: SEARCH NOTES
// router.get('/search-notes/',middleware,async(req,res)=>{
//     //
//     req
// });







export default router;