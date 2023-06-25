import { firebase } from "./firebase";

const collection = firebase.collection("orders");
export class Order {
   ref: FirebaseFirestore.DocumentReference;
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

   static async create(data) {
      const newUserSnap = await collection.add(data);
      const newUser = new Order(newUserSnap.id);
      newUser.data = data;
      return newUserSnap;
   }
}
