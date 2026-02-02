import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        if(!name || !email || !password){
           return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(existingUser){
            return res.status(401).json({message: "Useralready exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await prisma.user.create({
           data: {
             name ,
            email,
            password: hashedPassword
           }
        })

        const {password: _, ...safeUser} = user;

        res.status(500).json({
            message: "User response",
            data: safeUser
        })
        
    }catch(error){
         res.status(500).json({ message: "Server error", error: error.message });
    }

}



export const login = async(req,res)=>{
    try {
        const {email , password}  = req.body

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = prisma.user.findUnique({
            where: {email}
        })

        if(!existingUser){
              return res.status(400).json({message: "Email or password invalid"})
        }


        const isUserValid = await bcrypt.compare(password, user.password)

        if(!isUserValid){
              return res.status(400).json({message: "Email or password invalid"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{expiresIn: "7days"})

        res.json({
            data: token,
            message: "Login Success"
        })


    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}



export const getAllUsers = async (res,req) =>{
    try{
       const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
       })

       res.json({
        data: users,
        message: "Fetched user list",
        count: users.length,
       })
    }catch{
          res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const updateUser = async(req,res) =>{
    const {email, password}  = req.body

    if(!email || !password){
        
    }
}