import { NextApiRequest, NextApiResponse } from "next";
import Empresa from "../../models/empresa.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  try {
    const create = await Empresa.findAll();
    console.log(create);
    res.status(200).send(create);
  } catch (error: any) {
    res.status(404).send(error);
  }
}
