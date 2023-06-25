import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "lib/order";

export default async function (req, res) {
   const { id, topic } = req.body;
   console.log(topic.id);

   if (topic == "merchant_order") {
      const order = await getMerchantOrder(id);
      if (order.order_status == "paid") {
         const orderId = order.external_reference;
         const newOrder = new Order(orderId);
         await newOrder.pull;
         newOrder.data.status = "closed";
         await newOrder.push();
      }
   }
}
