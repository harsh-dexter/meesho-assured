import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ProductCard } from "./ProductCard";

import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import product5 from "@/assets/product5.jpg";
import product6 from "@/assets/product6.jpg";

// TODO: Replace with API endpoints
// GET /api/products - Fetch all products with pagination
// GET /api/products?assured=true - Filter assured products only
// GET /api/products/search?q={query} - Search products
// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Women's Cotton Kurti Set with Palazzo - Comfortable Daily Wear",
    price: 899,
    originalPrice: 1499,
    rating: 4.3,
    reviewCount: 1247,
    image: product1,
    isAssured: true,
    isFastDispatch: true,
    discount: 40,
  },
  {
    id: "2", 
    name: "Men's Casual Cotton T-Shirt - Premium Quality Fabric",
    price: 399,
    originalPrice: 699,
    rating: 4.1,
    reviewCount: 856,
    image: product2,
    isAssured: false,
    isFastDispatch: false,
    discount: 43,
  },
  {
    id: "3",
    name: "Wireless Bluetooth Headphones - High Quality Sound",
    price: 1299,
    originalPrice: 2499,
    rating: 4.6,
    reviewCount: 2103,
    image: product3,
    isAssured: true,
    isFastDispatch: true,
    discount: 48,
  },
  {
    id: "4",
    name: "Kitchen Storage Containers Set - BPA Free Plastic",
    price: 599,
    originalPrice: 999,
    rating: 4.4,
    reviewCount: 674,
    image: product4, 
    isAssured: true,
    isFastDispatch: false,
    discount: 40,
  },
  {
    id: "5",
    name: "Sports Running Shoes - Lightweight & Comfortable",
    price: 1599,
    originalPrice: 2999,
    rating: 4.2,
    reviewCount: 432,
    image: product5,
    isAssured: false,
    isFastDispatch: true,
    discount: 47,
  },
  {
    id: "6",
    name: "Decorative Wall Clock - Modern Design for Home",
    price: 299,
    originalPrice: 599,
    rating: 4.0,
    reviewCount: 321,
    image: product6,
    isAssured: true,
    isFastDispatch: true,
    discount: 50,
  },
];

export const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assuredOnly, setAssuredOnly] = useState(false);

  // TODO: Replace with API call
  // const { data: products, loading } = useQuery('/api/products', { search: searchTerm, assured: assuredOnly });
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAssured = !assuredOnly || product.isAssured;
    return matchesSearch && matchesAssured;
  });

  const assuredCount = filteredProducts.filter(p => p.isAssured).length;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Meesho Products</h1>
        <p className="text-muted-foreground">Discover quality products with our trust guarantee</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-6">
          {/* Assured Only Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="assured-only"
              checked={assuredOnly}
              onCheckedChange={setAssuredOnly}
            />
            <Label htmlFor="assured-only" className="font-medium">
              Assured Only
            </Label>
          </div>
          
          {/* Filter Button */}
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} products
          {assuredOnly && ` (Assured Only)`}
        </p>
        {assuredCount > 0 && (
          <p className="text-sm text-trust font-medium">
            {assuredCount} Meesho Assured products available
          </p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-foreground">No products found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};