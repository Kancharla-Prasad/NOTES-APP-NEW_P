import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Addnotemodal({token,setShowmodal}) {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState();
    const navigate = useNavigate();

    //Related to tags
    const addNewTag = () => {
        // // console.log(tag.trim());
        if(tag === "")
            return;
        else if(tag.trim()!== "")
        {
            setTags([...tags,tag.trim()]);
            setTag(" ");
        }
    }
    const removeTag = (newTag) => {
        // console.log("hello pras"+newTag);
        const newTags = tags.filter((mytag,index)=>{ return  mytag !== newTag});
        setTags(newTags);
    }


    const closeModal = () => {

    }

    //addnewnote function

    const addNewNote = async() => {
        // console.log("not token");
        try {
            const url = "http://localhost:3012/api/notes/addnote";
            const data ={
                title,
                content,
                tags
            }
            const res = await axios.post(url,data,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
            console.log(res);
            // navigate('/');
            setShowmodal(false);
            // if(res.data.Message){
            //     navigate('/');
            // }
            // else
            //     alert("Something is went wrong...");
        } catch (error) {
            console.log("Error in add New Note: "+error.message);
        }
    }
   



    return (
        <div className='modal-wrapper'>
            <div className='modal-div'>
                <div className='modal-header'>
                    <h1 className='modal-heading' >Add Note  </h1>
                    <IoMdClose style={{
                        display: "block",
                        fontSize: "35px",
                        cursor:"pointer"
                    }} onClick={()=>setShowmodal(false)} />
                </div>
                <div >
                    <label className='modal-label'>Title</label>
                    <br />
                    <input type='text' className='modal-title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div>
                    <label className='modal-label'>Content</label>
                    <br />
                    <textarea
                        rows={5}
                        className='modal-content'
                        value={content} onChange={(e) => { setContent(e.target.value) }}
                    />
                </div>
                <div>
                    <label className='modal-label'>Tags:</label><br />
                    <div className='added-tags'>
                    {
                        tags.length > 0 && tags.map((myTag, index) => {
                            return <p key={index} className='tag-list'>
                               <span> #{myTag} </span>
                                <IoMdClose onClick={() => removeTag(myTag)}  className='remove-tag-btn'/>
                            </p>
                        })
                    }
                    </div>
                </div>
                <div className='tag-div'>
                    <input type='text' value={tag} className='modal-tag' onChange={(e) => { setTag(e.target.value) }} />
                    <button className='tag-btn' onClick={addNewTag}>
                        <FaPlus />
                    </button>
                </div>
                <button type='button' className='modal-add-btn' onClick={addNewNote}>Add</button>
            </div>
        </div>
    )
}

export default Addnotemodal;
