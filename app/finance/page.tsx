'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Activity,
  ArrowUp,
  ArrowDown,
  Target,
  Shield
} from 'lucide-react'

const portfolioMetrics = [
  { name: 'Total Value', value: '$2,847,392', change: '+12.4%', positive: true, icon: DollarSign },
  { name: 'Daily P&L', value: '+$23,847', change: '+2.1%', positive: true, icon: TrendingUp },
  { name: 'Sharpe Ratio', value: '1.67', change: '+0.12', positive: true, icon: Target },
  { name: 'Max Drawdown', value: '-4.2%', change: '-0.8%', positive: true, icon: Shield }
]

const strategies = [
  { name: 'Momentum Strategy', performance: 15.7, risk: 'Medium', status: 'Active' },
  { name: 'Mean Reversion', performance: 8.3, risk: 'Low', status: 'Active' },
  { name: 'Arbitrage Bot', performance: 22.1, risk: 'High', status: 'Paused' },
  { name: 'Index Following', performance: 11.2, risk: 'Low', status: 'Active' }
]

export default function FinancePage() {
  return (
    <div className="container px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Quantitative Finance</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced algorithmic trading and financial data analysis platform
        </p>
      </motion.div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                <metric.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className={`flex items-center text-xs ${
                  metric.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.positive ? (
                    <ArrowUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trading Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-yellow-500" />
            <span>Trading Dashboard</span>
          </CardTitle>
          <CardDescription>
            Real-time market data and algorithmic trading strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="strategies" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="backtest">Backtest</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="strategies" className="space-y-4">
              <div className="space-y-3">
                {strategies.map((strategy, index) => (
                  <motion.div
                    key={strategy.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{strategy.name}</h4>
                        <p className="text-sm text-muted-foreground">Risk Level: {strategy.risk}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        strategy.status === 'Active' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {strategy.status}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Performance (YTD)</span>
                        <span className="font-medium text-green-600">+{strategy.performance}%</span>
                      </div>
                      <Progress value={strategy.performance * 2} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="backtest" className="space-y-4">
              <div className="text-center space-y-4">
                <Activity className="w-12 h-12 mx-auto text-yellow-500" />
                <h3 className="text-lg font-medium">Strategy Backtesting</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Test your trading strategies against historical market data to validate performance.
                </p>
                <Button>Run Backtest</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Value at Risk (95%)</span>
                      <span className="font-medium">$47,392</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Beta</span>
                      <span className="font-medium">0.87</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Volatility</span>
                      <span className="font-medium">14.2%</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Correlation Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">S&P 500</span>
                      <span className="font-medium">0.72</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">NASDAQ</span>
                      <span className="font-medium">0.84</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Gold</span>
                      <span className="font-medium">-0.23</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="portfolio" className="space-y-4">
              <div className="text-center space-y-4">
                <PieChart className="w-12 h-12 mx-auto text-yellow-500" />
                <h3 className="text-lg font-medium">Portfolio Optimization</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  AI-powered portfolio optimization using modern portfolio theory and machine learning.
                </p>
                <Button>Optimize Portfolio</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}