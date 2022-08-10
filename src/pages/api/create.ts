import { NextApiRequest, NextApiResponse } from "next";
//import { prisma } from "../../common/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type Data = {
    sid: string,
    name_f: string,
    name_m: string,
    name_l: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method === 'POST'){
        const {sid,name_f,name_m,name_l} = req.body
        const pip = await prisma.pip.create({
            data:{
                sid: sid,
                name_f: name_f,
                name_m: name_m,
                name_l: name_l
            }
        })
        res.status(200).json(pip)

    }
   
    
}