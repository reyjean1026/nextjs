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
            const {id,articleId,description,date_acquired,property_number,quantity,unit_value,received_date,registered_status,temp_name,status,attachment,remarks,pipSid} = req.body
            const pip = await prisma.inventory.create({
                data:{
                    id:id,
                    articleId: Number(articleId),
                    description: description,
                    date_acquired: date_acquired, 
                    property_number: property_number,
                    quantity: Number(quantity),
                    unit_value: Number(unit_value),
                    received_date: received_date,
                    registered_status: "YES",
                    temp_name: temp_name,
                    status: status,
                    attachment: attachment,
                    remarks: remarks,
                    pipSid : pipSid,
                    in_status:"1"
                }
            })
            res.status(200).json(pip)
    
        }
    }
}

export default handler