import { NextApiRequest, NextApiResponse } from "next";
import { authMiddelware } from "lib/middelware";
import { User } from "lib/user";

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
   const user = new User(token.id);
   await user.pull();
   res.send(user.data);
}

export default authMiddelware(handler);
