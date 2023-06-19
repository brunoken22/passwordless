import jwt from "jsonwebtoken";
export function token(id: number) {
   const token = jwt.sign({ id }, process.env.JWT_SECRECT);
   return token;
}

export function decode(token: string) {
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRECT);
      return decoded;
   } catch (e) {
      return null;
   }
}
