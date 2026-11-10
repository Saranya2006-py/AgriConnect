import { useData } from '@/contexts/DataContext';
import { PriceCard } from '@/components/ui/price-card';
import { TrendingUp, Calendar } from 'lucide-react';

export function PriceGuidance() {
  const { prices } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Market Prices</h2>
          <p className="text-muted-foreground mt-1">Live crop prices updated daily</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {prices.map((price) => (
          <PriceCard key={price.cropName} price={price} />
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Market Insights</h3>
            <p className="text-sm text-muted-foreground">
              Prices are sourced from major agricultural mandis across India. 
              Cotton and Soybean show strong upward trends this week due to increased export demand.
              Farmers are advised to hold cotton stocks for better prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
