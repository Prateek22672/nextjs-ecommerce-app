import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data/products.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return Response.json(data);
}

export async function POST(req: Request) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const filePath = path.join(process.cwd(), "data/products.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const body = await req.json();
  const newProduct = {
    id: Date.now().toString(),
    ...body,
    price: Number(body.price),
    inventory: Number(body.inventory),
    lastUpdated: new Date().toISOString(),
  };

  data.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return new Response("Created", { status: 201 });
}
