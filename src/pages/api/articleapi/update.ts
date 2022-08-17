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
        if (req.method === "POST"){
            const {id,code,article,categoryId} = req.body
            const articles = await prisma.article.update({
                where:{
                    id: id,
                },
                data:{
                    code: code,
                    article: article,
                    categoryId : Number(categoryId),
                }
            })
            res.status(200).json(articles)
            }
    }
}

export default handler