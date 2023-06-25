import mercadopago from "mercadopago";

mercadopago.configure({
   access_token: process.env.MP_TOKEN,
});
async function createPreference(data) {
   const respuesta = await mercadopago.preferences.create(data);
   return respuesta.body;
}

export default async function getMerchantOrder(id: number) {
   const respuesta = await mercadopago.merchant_orders.get(id);
   return respuesta.body;
}
export { createPreference, getMerchantOrder };
