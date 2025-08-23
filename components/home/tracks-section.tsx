'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Cloud, 
  Database, 
  Brain, 
  TrendingUp, 
  Wheat,
  ArrowRight,
  Activity,
  Zap,
  Shield
} from 'lucide-react'

const tracks = [
  {
    name: 'Cloud Infrastructure',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    description: 'Demonstrate cloud-native architecture and DevOps practices with real-time monitoring.',
    features: ['Infrastructure Monitoring', 'CI/CD Pipelines', 'Resource Analytics', 'Multi-region Deployment'],
    href: '/cloud'
  },
  {
    name: 'Data Management',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    description: 'Showcase modern database operations and data modeling with MongoDB Atlas.',
    features: ['Project Management', 'Real-time Collaboration', 'Advanced Search', 'Data Visualization'],
    href: '/database'
  },
  {
    name: 'AI Integration',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    description: 'Demonstrate AI-powered user experiences with Google Gemini integration.',
    features: ['Idea Generation', 'Code Review', 'Natural Language Queries', 'Smart Recommendations'],
    href: '/ai'
  },
  {
    name: 'Quantitative Finance',
    icon: TrendingUp,
    color: 'from-yellow-500 to-orange-500',
    description: 'Showcase algorithmic trading and financial data analysis capabilities.',
    features: ['Backtesting Engine', 'Market Data Viz', 'Risk Assessment', 'Portfolio Optimization'],
    href: '/finance'
  },
  {
    name: 'Agricultural AI',
    icon: Wheat,
    color: 'from-emerald-500 to-green-500',
    description: 'Demonstrate AI applications in agriculture and sustainability.',
    features: ['Yield Prediction', 'Weather Analysis', 'Soil Assessment', 'Supply Chain Optimization'],
    href: '/agriculture'
  }
]

export function TracksSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Innovation Tracks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Explore cutting-edge technologies across five specialized domains, 
            each designed to showcase the future of innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${track.color}`}>
                      <track.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{track.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {track.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {track.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link href={track.href}>
                      Explore Track
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
            <p className="text-muted-foreground">
              Monitor all platform activities, user engagement, and system performance in real-time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center space-y-4"
          >
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">High Performance</h3>
            <p className="text-muted-foreground">
              Optimized for speed and scalability with advanced caching and CDN integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-4"
          >
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Enterprise Security</h3>
            <p className="text-muted-foreground">
              Bank-level security with encryption, authentication, and comprehensive audit trails.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}