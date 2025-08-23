'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium bg-background/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              Multi-Domain Innovation Platform
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              PolySphere
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            A unified innovation ecosystem where cloud infrastructure, AI, databases, 
            finance, and agriculture converge to create the future of technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Explore Tracks
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              View Projects
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center opacity-60"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-muted-foreground">Innovation Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100+</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">24/7</div>
              <div className="text-sm text-muted-foreground">Platform Uptime</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-emerald-600">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}