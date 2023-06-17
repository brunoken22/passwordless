import { format, parseISO, differenceInDays } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import gen from "random-seed";

export default function (req: NextApiRequest, res: NextApiResponse) {
   // const fechaInicio = parseISO("2023-06-10");
   // const fechaFin = parseISO("2023-06-15");
   // const diferencia = differenceInDays(fechaFin, fechaInicio);
   // console.log(diferencia);
   // const seed = "My Secret String Value";
   // const rand = gen.create(seed);
   // const result = rand.floatBetween(100, 200);
   // console.log(result);

   res.send("process.env.Name");
}
