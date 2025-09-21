import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { SellerDashboard } from "@/components/SellerDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"products" | "seller">("products");

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main>
        {currentView === "products" ? (
          <ProductGrid />
        ) : (
          <SellerDashboard />
        )}
      </main>
    </div>
  );
};

export default Index;
