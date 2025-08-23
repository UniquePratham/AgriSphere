'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Lightbulb, 
  Code, 
  MessageSquare, 
  FileText,
  Sparkles,
  Send,
  Cpu,
  Zap
} from 'lucide-react'

const aiFeatures = [
  {
    name: 'Idea Generator',
    description: 'AI-powered project idea generation based on current trends',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Code Review',
    description: 'Intelligent code analysis and optimization suggestions',
    icon: Code,
    color: 'from-blue-500 to-purple-500'
  },
  {
    name: 'Smart Chat',
    description: 'Natural language interface for platform interaction',
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Auto Documentation',
    description: 'Automated generation of project documentation',
    icon: FileText,
    color: 'from-purple-500 to-pink-500'
  }
]

const sampleIdeas = [
  'AI-powered supply chain optimization for sustainable agriculture',
  'Quantum-resistant blockchain for secure financial transactions',
  'Edge computing framework for real-time IoT data processing',
  'Machine learning model for predictive infrastructure maintenance'
]

export default function AIPage() {
  const [selectedIdea, setSelectedIdea] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateIdea = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const randomIdea = sampleIdeas[Math.floor(Math.random() * sampleIdeas.length)]
      setSelectedIdea(randomIdea)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">AI Integration Hub</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Harness the power of Google Gemini AI for intelligent automation and insights
        </p>
      </motion.div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiFeatures.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.name}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Tools Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>AI-Powered Tools</span>
          </CardTitle>
          <CardDescription>
            Interactive AI tools for project development and innovation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generator" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generator">Idea Generator</TabsTrigger>
              <TabsTrigger value="chat">Smart Chat</TabsTrigger>
              <TabsTrigger value="analysis">Code Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator" className="space-y-4">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">AI Project Idea Generator</h3>
                <p className="text-muted-foreground">
                  Generate innovative project ideas based on current technology trends
                </p>
                
                <Button 
                  onClick={generateIdea} 
                  disabled={isGenerating}
                  className="w-full max-w-md"
                >
                  {isGenerating ? (
                    <>
                      <Cpu className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Generate New Idea
                    </>
                  )}
                </Button>
                
                {selectedIdea && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted rounded-lg max-w-2xl mx-auto"
                  >
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <p className="text-left">{selectedIdea}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="space-y-4">
              <div className="border rounded-lg p-4 min-h-[300px] bg-muted/20">
                <div className="space-y-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 p-3 bg-background rounded-lg">
                      <p>Hello! I'm your AI assistant. I can help you with project planning, code review, and technical questions. What would you like to explore today?</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask me anything about your project..."
                    className="flex-1 px-3 py-2 border rounded-md bg-background"
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              <div className="text-center space-y-4">
                <Zap className="w-12 h-12 mx-auto text-purple-500" />
                <h3 className="text-lg font-medium">Code Analysis & Optimization</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Upload your code for AI-powered analysis, optimization suggestions, and best practice recommendations.
                </p>
                <Button variant="outline">
                  Upload Code for Analysis
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}