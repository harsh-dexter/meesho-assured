import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MeeshoAssuredBadge } from "./MeeshoAssuredBadge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    isAssured: boolean;
    isFastDispatch?: boolean;
    discount?: number;
  };
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Card className={cn(
      "group relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      className
    )}>
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Wishlist Button */}
          {/* TODO: POST /api/wishlist - Add/remove from wishlist */}
          <button className="absolute top-3 right-3 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white">
            <Heart className="h-4 w-4" />
          </button>
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 left-3 rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
              {product.discount}% OFF
            </div>
          )}
          
          {/* Fast Dispatch Indicator */}
          {product.isFastDispatch && (
            <div className="absolute bottom-3 left-3 rounded-md bg-orange-500 px-2 py-1 text-xs font-medium text-white">
              Fast Dispatch
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-medium text-sm line-clamp-2 text-foreground leading-relaxed">
              {product.name}
            </h3>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          
          {/* Price and Assured Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          {/* Meesho Assured Badge */}
          {product.isAssured && (
            <MeeshoAssuredBadge size="sm" className="w-fit" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};