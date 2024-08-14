import express from 'express';
import { userModel } from '../models/user.js';
import jwt from 'jsonwebtoken';
import { middleware } from '../middleware.js';
import { SECRET_KEY } from '../config.js';

const router = express.Router();


//ROUTER1; REGISTER USER WITH NAME ,EMAIL,PASSWORD
router.post("/register",async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            // console.log(userExist);
            return res.status(400).send("User already with this email already exits....");
        }

        const newUser = {
            name,
            email,
            password,
        }

        const insertUserData = await userModel.create(newUser);
        if (insertUserData) {
            return res.status(200).send("Inserted Data successfully...");
        }
        else
            return res.status(400).send("Not inserted Data succesfully");
    }
    catch (err) {
        return res.send(err.message);
    }
})



//ROUTER2;LOGIN WITH EMAIL,PASSWORD
router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;

        const userExist = await userModel.findOne({email});
        if(!userExist){
            return res.json({"Erorr":"true","MEssage":"User Not FOund.."})
        }

        if(password != userExist.password){
            return res.json({"Error":"true","Message":"Password is incorrect"});
        }

        const payload = {
            user:{
                _id:userExist._id
            }
        }
        //generate token
        jwt.sign(payload,SECRET_KEY,{"expiresIn":"100d"},
            (err,token)=>{
                if(err) return res.json({"Erorr":"true","Message":"Token is not generated"});
                return res.json({token});
            }
        )
    } catch (error) {
        console.log(error.message);
    }
})



//ROUTER2: GET USER INFO USING MIDDLEWARE
router.get('/myprofile', middleware, async (req, res) => {
    try {
        console.log(req.user);
        let userExist = await userModel.findOne({ "_id": req.user._id });
        if (!userExist) {
            return res.status(400).send("User Not Found...");
        }
        res.json({
            "User":userExist,
            "Message":"Retrieved Succesfully"
        });
        // return res.json("i am in myprofile");
    } catch (error) {
        return res.json({
            "Message":"Internal Server Eroor",
            "Where":"ROuter-myprofile"
        })
    }
})

export default router;