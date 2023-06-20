import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { findOrCreateAuth, sendCode } from "lib/controllers/auth";

export default methods({
   async post(req: NextApiRequest, res: NextApiResponse) {
      if (req.body.email) {
         const aleat = await sendCode(req.body.email, req.body.name);
         res.send(aleat);
      } else {
         res.send("Falta DATOS");
      }
   },
});
