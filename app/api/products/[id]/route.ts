import fs from "fs";
import path from "path";

export async function PUT(req: Request, context: any) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  // ✅ Await params because params is now async
  const { id } = await context.params;

  const filePath = path.join(process.cwd(), "data/products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const body = await req.json();

  const updatedProducts = products.map((p: any) =>
    p.id === id
      ? {
          ...p,
          ...body,
          price: Number(body.price),
          inventory: Number(body.inventory),
          lastUpdated: new Date().toISOString(),
        }
      : p
  );

  fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));

  return Response.json({ success: true });
}


export async function DELETE(req: Request, context: any) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;

  const filePath = path.join(process.cwd(), "data/products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedProducts = products.filter((p: any) => p.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));

  return Response.json({ success: true });
}
