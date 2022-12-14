import { client } from "../../../utils/client";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/Token';
import { verifyEmailQ } from "../../../utils/query";

export default async function  (req, res) {
    const user = req.body
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt)
    const doc = {...user,password:hash,_type:'user'}
    const query = verifyEmailQ(user.email)

    if (req.method === 'POST') {
    try {
        const user = await client.fetch(query);
        if(user) return res.status(400).json('User with email already exists')
        if(!user){
           await  client.create(doc).then(
                result => {
                res.status(200).json("Registered successfully")
                }
             )
        }
    }catch(err){
        console.log(err)
        res.status(500).json("Unable to proceed further at the moment")
    }
}else{
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');

  }
}