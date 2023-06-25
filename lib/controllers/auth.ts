import { User } from "lib/user";
import { Auth } from "lib/auth";
import gen from "random-seed";
import { addMinutes, differenceInMinutes, format } from "date-fns";
import { sendinblue } from "lib/sendinblue";
import { decode, token } from "lib/jwt";
const ramdom = gen.create();
export async function findOrCreateAuth(email: string, name: string) {
   const cleanEmail = email.trim().toLowerCase();
   const auth = await Auth.findByEmail(cleanEmail);
   if (auth) {
      return auth;
   } else {
      const newUser = await User.create({ email: cleanEmail });
      const newAuth = await Auth.create({
         email: cleanEmail,
         name,
         userId: newUser.id,
         code: "",
         expires: "",
      });

      const newAuthFinal = new Auth(newAuth.id);
      await newAuthFinal.pull();
      return newAuthFinal;
   }
}

export async function sendCode(email: string, name: string) {
   const auth = await findOrCreateAuth(email, name);

   const aleat = ramdom.intBetween(10000, 99999);
   const now = new Date();
   const temp = addMinutes(now, 5);
   auth.data.code = aleat;
   auth.data.expires = temp;
   await auth.push();

   sendinblue({ code: aleat, name, email });
   return auth;
}

export async function generateToken(email: string, code: number) {
   if (!email || !code) {
      return null;
   }
   const auth = await Auth.findByEmail(email);
   await auth.pull();
   const now = new Date();
   const fecha = new Date(
      auth.data.expires._seconds * 1000 +
         Math.floor(auth.data.expires._nanoseconds / 1e6)
   );

   const diferencia = differenceInMinutes(now, fecha);

   if (diferencia >= 0) return "agotado";
   if (auth.data.code == code) {
      const tokenGen = token(auth.data.userId);
      return tokenGen;
   }

   return "ninguno";
}
