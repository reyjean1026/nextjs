import { NextApiRequest, NextApiResponse } from "next";
//import { prisma } from "../../common/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const pip = await prisma.pip.findMany()
    res.status(200).json(pip)
    
}