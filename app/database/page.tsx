'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Database, 
  Users, 
  FileText, 
  BarChart3, 
  Search,
  Plus,
  Filter,
  Download,
  Server
} from 'lucide-react'
import * as Progress from '@radix-ui/react-progress'

const projectStats = [
  { name: 'Total Projects', value: 127, change: '+12%', icon: FileText },
  { name: 'Active Users', value: 89, change: '+8%', icon: Users },
  { name: 'Data Points', value: '2.4M', change: '+23%', icon: BarChart3 },
  { name: 'Queries/sec', value: 1247, change: '+5%', icon: Database }
]

const recentProjects = [
  { name: 'AI-Powered Crop Monitor', team: 'AgriTech Innovators', status: 'Active', progress: 78 },
  { name: 'Quantum Trading Algorithm', team: 'FinTech Pioneers', status: 'Review', progress: 92 },
  { name: 'Cloud Migration Tool', team: 'DevOps Masters', status: 'Active', progress: 45 },
  { name: 'Smart City Dashboard', team: 'Urban Tech', status: 'Completed', progress: 100 }
]

const regions = [
  {
    name: 'US East',
    latency: '20ms',
    uptime: '99.99%',
    status: 'Healthy'
  },
  {
    name: 'Europe West',
    latency: '50ms',
    uptime: '99.95%',
    status: 'Warning'
  },
  {
    name: 'Asia Pacific',
    latency: '100ms',
    uptime: '99.90%',
    status: 'Healthy'
  },
  {
    name: 'South America',
    latency: '150ms',
    uptime: '99.85%',
    status: 'Critical'
  }
]

export default function DatabasePage() {
  return (
    <div className="container px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Data Management Hub</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced project management and collaboration tools powered by MongoDB Atlas
        </p>
      </motion.div>

      {/* Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Management Interface */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Project Management Dashboard</CardTitle>
              <CardDescription>
                Real-time collaboration and project tracking
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="projects" className="space-y-4">
            <TabsList>
              <TabsTrigger value="projects">Active Projects</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="flex-1 px-3 py-2 border rounded-md bg-background"
                />
              </div>
              
              <div className="space-y-3">
                {recentProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.team}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Active' ? 'bg-green-100 text-green-700' :
                        project.status === 'Review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress.Root value={project.progress} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Query Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Response Time</span>
                        <span className="font-medium">23ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Queries per Second</span>
                        <span className="font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cache Hit Rate</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Storage Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Storage</span>
                        <span className="font-medium">2.4 TB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Documents</span>
                        <span className="font-medium">1.2M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Collections</span>
                        <span className="font-medium">47</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="collaboration" className="space-y-4">
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Real-time Collaboration</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with team members and collaborate on projects in real-time
                </p>
                <Button>Start Collaborating</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Regional Infrastructure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-blue-500" />
            <span>Global Infrastructure</span>
          </CardTitle>
          <CardDescription>
            Multi-region deployment status and performance metrics
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
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{region.name}</h4>
                  <div className={`w-2 h-2 rounded-full ${
                    region.status === 'Healthy' ? 'bg-green-500' : 
                    region.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency</span>
                    <span className="font-medium">{region.latency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium">{region.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className={`font-medium ${
                      region.status === 'Healthy' ? 'text-green-600' :
                      region.status === 'Warning' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {region.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}