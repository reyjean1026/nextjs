import { prisma } from "../../../common/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {username, password} = req.body
    try {
        await prisma.user.findUnique({
            where: {
                // username
            }
        })
        res.status(200).json({message: 'Note Created'})
    }catch(error){
        console.log("failure")
    }
}