import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const user = await prisma.empresa.findMany();
    if (user) {
      user.forEach((empresa) => (empresa.password = undefined));
      res.status(200).send(user);
    } else {
      res
        .status(400)
        .send("No hay empresas, hay que esperar a que se registren");
    }
  }
}
