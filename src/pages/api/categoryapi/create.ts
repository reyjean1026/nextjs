import { NextApiRequest, NextApiResponse } from "next";
//import { prisma } from "../../common/prisma";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{
    const session = await getSession({req})
    if(!session){
        res.status(401).json({error:'Unauthorized User'})
    }else{
        if (req.method === 'POST'){
            const {code,category_name} = req.body
            const pip = await prisma.category.create({
                data:{
                    code: code,
                    category_name: category_name,
                    status:"1"
                }
            })
            res.status(200).json(pip)
    
        }
    }
}

export default handler