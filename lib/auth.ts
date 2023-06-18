import { firebase } from "./firebase";

const collection = firebase.collection("auth");
export class Auth {
   ref: FirebaseFirestore.DocumentData;
   data: any;
   constructor(id?: string) {
      if (id) {
         this.ref = collection.doc(id);
      }
   }

   async pull() {
      const snap = await this.ref.get();
      this.data = snap.data();
   }

   async push() {
      this.ref.update(this.data);
   }

   async create(data) {
      const newUser = await collection.add({
         ...data,
      });
      // this.data = newUser;
      return newUser;
   }

   static async findByEmail(email: string) {
      const cleanEmail = email.trim().toLowerCase();
      const user = await collection.where("email", "==", cleanEmail).get();
      if (user.docs.length) {
         const first = user.docs[0];
         const newAuth = new Auth(first.id);
         newAuth.data = first.data();
         console.log(first);
         return newAuth;
      }
      return null;
   }
}
