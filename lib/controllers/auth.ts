import { User } from "lib/user";
import { Auth } from "lib/auth";
import gen from "random-seed";
import addMinutes from "date-fns/addMinutes";

const str = "BrunoKen";
const ramdom = gen.create(str);
export async function findOrCreateAuth(email: string) {
   const cleanEmail = email.trim().toLowerCase();
   const auth = await Auth.findByEmail(cleanEmail);

   if (auth) {
      // const first = user.docs[0].data;
      console.log("Existe");
      return auth;
   } else {
      console.log("Creando");
      const user = new User();
      const auth = new Auth();
      const newUser = await user.create({ email: cleanEmail });
      const newAuth = await auth.create({
         email: cleanEmail,
         userId: newUser.id,
      });
      return auth;
   }
}

export async function sendCode(email: string) {
   const auth = await findOrCreateAuth(email);

   const aleat = ramdom.intBetween(10000, 99999);
   const now = new Date();
   const temp = addMinutes(now, 60);
   auth.data.code = aleat;
   auth.data.expires = temp;
   await auth.push();
   return auth;
}
