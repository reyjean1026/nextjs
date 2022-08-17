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
        const pip = await prisma.article.findMany({
            where:{
                status:{
                    contains: "1"
                }
            },
            include:{
                category: true,
            }
    })
        res.status(200).json(pip)
    }
}

export default handler
