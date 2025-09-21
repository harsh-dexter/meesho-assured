import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TierBadge } from "./TierBadge";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Star, 
  Clock, 
  RotateCcw,
  Gift,
  Headphones,
  ChevronRight,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

// TODO: Replace with API endpoints
// GET /api/seller/profile - Get seller profile and metrics
// GET /api/seller/products - Get seller's product listings
// GET /api/seller/analytics - Get performance analytics  
// PUT /api/seller/tier - Update seller tier based on metrics
// POST /api/seller/metrics - Update seller performance metrics
// Mock seller data
const sellerData = {
  name: "Fashion Hub Store",
  tier: "gold" as const,
  qualityScore: 82,
  nextTierThreshold: 90,
  metrics: {
    returnRate: 8.2,
    avgRating: 4.3,
    rtoRate: 12.5,
    onTimeDispatch: 89.2,
  },
  trends: {
    returnRate: -1.2,
    avgRating: 0.1,
    rtoRate: -2.3,
    onTimeDispatch: 3.1,
  },
  productsCount: {
    total: 247,
    assured: 156,
    pending: 28,
  },
  benefits: {
    current: [
      "5% shipping discount",
      "Priority customer support", 
      "Enhanced product visibility",
      "Weekly performance reports"
    ],
    nextTier: [
      "10% shipping discount",
      "Dedicated account manager",
      "Premium seller badge",
      "Advanced analytics dashboard"
    ]
  }
};

const MetricCard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  suffix = "", 
  isGood 
}: {
  title: string;
  value: number;
  trend: number;
  icon: any;
  suffix?: string;
  isGood: boolean;
}) => {
  const isPositiveTrend = trend > 0;
  const trendColor = (isGood && isPositiveTrend) || (!isGood && !isPositiveTrend) 
    ? "text-trust" 
    : "text-destructive";

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}{suffix}</p>
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className={`flex items-center mt-2 text-sm ${trendColor}`}>
          {isPositiveTrend ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {Math.abs(trend)}{suffix} from last month
        </div>
      </CardContent>
    </Card>
  );
};

export const SellerDashboard = () => {
  const progressPercentage = (sellerData.qualityScore / 100) * 100;
  const nextTierProgress = ((sellerData.qualityScore - 75) / (sellerData.nextTierThreshold - 75)) * 100;

  // TODO: Replace with real API calls
  // const { data: sellerProfile } = useQuery('/api/seller/profile');
  // const { data: analytics } = useQuery('/api/seller/analytics');
  // const { data: products } = useQuery('/api/seller/products');

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {sellerData.name}</p>
        </div>
        <TierBadge tier={sellerData.tier} size="lg" />
      </div>

      {/* Quality Score Section */}
      <Card className="border-trust/20 bg-trust-light/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-trust" />
            Quality Score Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your Score: {sellerData.qualityScore}/100</span>
              <span className="text-trust font-medium">{sellerData.tier.toUpperCase()} Tier</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Platinum</span>
              <span>{sellerData.nextTierThreshold - sellerData.qualityScore} points to go</span>
            </div>
            <Progress value={nextTierProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Return Rate"
          value={sellerData.metrics.returnRate}
          trend={sellerData.trends.returnRate}
          icon={RotateCcw}
          suffix="%"
          isGood={false}
        />
        <MetricCard
          title="Avg. Rating"
          value={sellerData.metrics.avgRating}
          trend={sellerData.trends.avgRating}
          icon={Star}
          isGood={true}
        />
        <MetricCard
          title="RTO Rate"
          value={sellerData.metrics.rtoRate}
          trend={sellerData.trends.rtoRate}
          icon={Package}
          suffix="%"
          isGood={false}
        />
        <MetricCard
          title="On-time Dispatch"
          value={sellerData.metrics.onTimeDispatch}
          trend={sellerData.trends.onTimeDispatch}
          icon={Clock}
          suffix="%"
          isGood={true}
        />
      </div>

      {/* Products Overview & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Product Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Products</span>
              <span className="font-medium">{sellerData.productsCount.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Meesho Assured</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-trust" />
                <span className="font-medium text-trust">{sellerData.productsCount.assured}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending Review</span>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{sellerData.productsCount.pending}</span>
              </div>
            </div>
            {/* TODO: Navigate to product management page with GET /api/seller/products */}
            <Button variant="outline" className="w-full mt-4">
              Manage Products
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Benefits Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Tier Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-trust mb-2">Current Benefits (Gold)</h4>
              <ul className="space-y-1">
                {sellerData.benefits.current.map((benefit, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-trust" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="font-medium text-sm text-platinum mb-2">Unlock at Platinum</h4>
              <ul className="space-y-1">
                {sellerData.benefits.nextTier.map((benefit, index) => (
                  <li key={index} className="text-sm flex items-center gap-2 text-muted-foreground">
                    <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* TODO: POST /api/support/ticket - Create support ticket */}
            <Button className="w-full mt-4">
              <Headphones className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};