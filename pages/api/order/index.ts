import { NextApiRequest, NextApiResponse } from "next";
import { authMiddelware } from "lib/middelware";
import { Order } from "lib/order";
import { createPreference } from "lib/mercadopago";
import methods from "micro-method-router";

const products = {
   title: "Casa Bruno",
   price: 50000,
};
async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
   const order = await Order.create({
      userId: token.id,
      productId: req.query.productId,
      aditionalInfo: req.body,
      status: "pending",
   });
   const preference = await createPreference({
      items: [
         {
            title: products.title,
            description: "description de prueba",
            picture_url: "http://www.myapp.com/myimage.jpg",
            category_id: "car_electronics",
            quantity: 1,
            currency_id: "ARS",
            unit_price: products.price,
         },
      ],
      back_urls: {
         success: "https://desafio-m8-d396d.web.app",
         pending: "https://desafio-m8-d396d.web.app/login",
      },
      external_reference: order.id,
      notification_url:
         "https://passwordless-sooty.vercel.app/api/webhooks/mercadopago",
   });
   res.send({ url: preference.init_point });
}
const met = methods({
   post: handler,
});
export default authMiddelware(met);
