import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decode } from "lib/jwt";

export function authMiddelware(callback) {
   return function (req: NextApiRequest, res: NextApiResponse) {
      const token = parseBearerToken(req);
      if (!token) {
         res.status(401).send("No hay Token");
      }

      const tokenVerify = decode(token);

      if (tokenVerify) {
         callback(req, res, tokenVerify);
      } else {
         res.status(401).send("Token invalido");
      }
   };
}
