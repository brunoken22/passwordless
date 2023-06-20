import SibApiV3Sdk from "sib-api-v3-sdk";
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
   process.env.SENDINBLUE;

export function sendinblue(data) {
   new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
         subject: "Aqui esta tu codigo de verificación!",
         sender: { email: "bruno_am_22@hotmail.com", name: "Bruno Ken" },
         replyTo: { email: "bruno_am_22@hotmail.com", name: "Bruno Ken" },
         to: [{ name: data.name, email: data.email }],
         htmlContent: `<h1>Este es tu codigo: ${data.code}</h1>`,
      })
      .then(
         function (data) {
            console.log(data);
         },
         function (error) {
            console.error(error);
         }
      );
   // const apiKey = process.env.SENDINBLUE;
   // const senderEmail = "bruno.am.59@gmail.com";
   // const recipientEmail = data.nombreRecib;
   // const subject = `${data.namePet} fue visto/a`;
   // const content = `<html><body><h2>${data.info}</h2><br><a href="tel:${data.tel}">LLamar : ${data.tel}</a></body></html>`;

   // // Define el cuerpo de la solicitud
   // const send = {
   //    sender: { email: senderEmail, name: recipientEmail },
   //    to: [{ email: data.email, name: data.nombre }],
   //    subject: subject,
   //    htmlContent: content,
   // };
}
