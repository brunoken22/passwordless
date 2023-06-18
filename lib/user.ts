import { firebase } from "./firebase";

export class User {
   collection = firebase.collection("users");
   ref: FirebaseFirestore.DocumentData;
   data: any;
   constructor(id?: string) {
      if (id) {
         this.ref = this.collection.doc(id);
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
      const newUser = await this.collection.add(data);
      return newUser;
   }

   async findByEmail(email: string) {
      const cleanEmail = email.trim().toLowerCase();
      console.log(cleanEmail);
      return cleanEmail;
   }
}
