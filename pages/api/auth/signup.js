import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

export default async (req, res) => {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Dont have form data..!" })
        const { username, email, password } = req.body;

        // checck user
        const users = await prisma.users.findFirst({
            where:{
                email: email
            }
        })
        
        if (users) return res.status(422).json({ message: "User Already Exist..!" })

        // store data to database
        const hash = await bcrypt.hash(password, 0);
        await prisma.users.create({
            data: {
                username: username,
                email: email,
                password: hash
            }
        });
        return res.status(200).json({ message: "Success fully create user!" });

    }
    else {
        return res.status(405).json({ error: "This request only supports POST requests" })
    }
}