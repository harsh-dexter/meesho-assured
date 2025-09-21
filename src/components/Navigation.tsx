import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  User,
  Menu,
  X,
  Store,
  BarChart3
} from "lucide-react";
import meeshoLogo from "@/assets/meesho-logo.png";

interface NavigationProps {
  currentView: "products" | "seller";
  onViewChange: (view: "products" | "seller") => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={meeshoLogo} alt="Meesho" className="h-8" />
            <Badge variant="secondary" className="text-xs">
              Assured Demo
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant={currentView === "products" ? "default" : "ghost"}
              onClick={() => onViewChange("products")}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Shop Products
            </Button>
            
            <Button
              variant={currentView === "seller" ? "default" : "ghost"}
              onClick={() => onViewChange("seller")}
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Seller Dashboard
            </Button>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            <Button
              variant={currentView === "products" ? "default" : "ghost"}
              onClick={() => {
                onViewChange("products");
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start gap-2"
            >
              <Search className="h-4 w-4" />
              Shop Products
            </Button>
            
            <Button
              variant={currentView === "seller" ? "default" : "ghost"}
              onClick={() => {
                onViewChange("seller");
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Seller Dashboard
            </Button>
            
            <div className="pt-2 border-t">
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};