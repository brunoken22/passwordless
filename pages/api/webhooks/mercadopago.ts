import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "lib/order";

export default async function (req, res) {
   const { id, topic } = req.boy;
   if (topic == "merchant_order") {
      const order = await getMerchantOrder(10028313247);
      if (order.order_status == "paid") {
         const orderId = order.external_reference;
         const newOrder = new Order(orderId);
         await newOrder.pull;
         newOrder.data.status = "closed";
      }
   }
}
