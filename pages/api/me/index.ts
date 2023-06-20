import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddelware } from "lib/middelware";
import { User } from "lib/user";

// export default methods({
//    async get(req: NextApiRequest, res: NextApiResponse) {
//       // const user = new User(token.id);
//       // await user.pull();
//       // res.send(user.data);
//    },
// });

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
   const user = new User(token.id);
   await user.pull();
   res.send(user.data);
}

export default authMiddelware(handler);
