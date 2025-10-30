import products from "@/data/products.json";

export const revalidate = 0; // always fresh (SSR simulation)

export default function Dashboard() {
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, p) => sum + p.inventory, 0);
  const lowStock = products.filter((p) => p.inventory < 10).length;

  return (
    <div className="p-10 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-10 text-center"> Inventory Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        {/* Total Products */}
        <div className="border border-black rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform bg-white">
          <p className="text-sm text-gray-600">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">{totalProducts}</h2>
        </div>

        {/* Total Inventory */}
        <div className="border border-black rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform bg-white">
          <p className="text-sm text-gray-600">Total Inventory Units</p>
          <h2 className="text-3xl font-bold mt-2">{totalInventory}</h2>
        </div>

        {/* Low Stock */}
        <div className="border border-black rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform bg-white">
          <p className="text-sm text-gray-600">Low Stock Items (&lt;10)</p>
          <h2 className="text-3xl font-bold mt-2 text-red-600">{lowStock}</h2>
        </div>
      </div>
    </div>
  );
}
