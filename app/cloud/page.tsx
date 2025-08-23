'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Cloud, 
  Server, 
  Activity, 
  Cpu, 
  HardDrive, 
  Network,
  Globe,
  Shield,
  Zap
} from 'lucide-react'

const infrastructureMetrics = [
  { name: 'CPU Usage', value: 67, icon: Cpu, color: 'text-blue-500' },
  { name: 'Memory Usage', value: 45, icon: Activity, color: 'text-green-500' },
  { name: 'Storage Usage', value: 78, icon: HardDrive, color: 'text-yellow-500' },
  { name: 'Network I/O', value: 34, icon: Network, color: 'text-purple-500' }
]

const regions = [
  { name: 'US East', status: 'Healthy', latency: '12ms', uptime: '99.9%' },
  { name: 'EU West', status: 'Healthy', latency: '8ms', uptime: '99.8%' },
  { name: 'Asia Pacific', status: 'Warning', latency: '45ms', uptime: '99.7%' },
  { name: 'US West', status: 'Healthy', latency: '15ms', uptime: '99.9%' }
]

export default function CloudPage() {
  return (
    <div className="container px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <Cloud className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Cloud Infrastructure</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time monitoring and management of cloud resources across multiple regions
        </p>
      </motion.div>

      {/* Infrastructure Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {infrastructureMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metric.value}%</div>
                <Progress value={metric.value} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {metric.value > 80 ? 'High usage' : metric.value > 50 ? 'Moderate usage' : 'Low usage'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Regional Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-500" />
            <span>Multi-Region Status</span>
          </CardTitle>
          <CardDescription>
            Real-time status of infrastructure across global regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{region.name}</h4>
                  <div className={`w-2 h-2 rounded-full ${
                    region.status === 'Healthy' ? 'bg-green-500' : 
                    region.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Latency: {region.latency}</div>
                  <div>Uptime: {region.uptime}</div>
                  <div>Status: {region.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CI/CD Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span>CI/CD Pipeline Status</span>
          </CardTitle>
          <CardDescription>
            Automated deployment pipeline with real-time status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: 'Build', status: 'completed', duration: '2m 34s' },
              { stage: 'Test', status: 'completed', duration: '1m 12s' },
              { stage: 'Security Scan', status: 'running', duration: '0m 45s' },
              { stage: 'Deploy', status: 'pending', duration: '-' }
            ].map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  stage.status === 'completed' ? 'bg-green-500' :
                  stage.status === 'running' ? 'bg-blue-500 animate-pulse' :
                  'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <div className="font-medium">{stage.stage}</div>
                  <div className="text-sm text-muted-foreground">Duration: {stage.duration}</div>
                </div>
                <div className={`text-sm font-medium ${
                  stage.status === 'completed' ? 'text-green-600' :
                  stage.status === 'running' ? 'text-blue-600' :
                  'text-gray-500'
                }`}>
                  {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}