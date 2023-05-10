export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    return res.status(200).send(id);
  }
}
