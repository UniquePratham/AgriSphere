import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PolySphere</h3>
            <p className="text-sm text-muted-foreground">
              A unified innovation ecosystem where multiple domains converge to create the future.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Innovation Tracks</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cloud" className="hover:text-foreground">Cloud Infrastructure</Link></li>
              <li><Link href="/database" className="hover:text-foreground">Data Management</Link></li>
              <li><Link href="/ai" className="hover:text-foreground">AI Integration</Link></li>
              <li><Link href="/finance" className="hover:text-foreground">Quantitative Finance</Link></li>
              <li><Link href="/agriculture" className="hover:text-foreground">Agricultural AI</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/projects" className="hover:text-foreground">Projects</Link></li>
              <li><Link href="/hackathons" className="hover:text-foreground">Hackathons</Link></li>
              <li><Link href="/community" className="hover:text-foreground">Community</Link></li>
              <li><Link href="/resources" className="hover:text-foreground">Resources</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-foreground">API Reference</Link></li>
              <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 PolySphere. All rights reserved. Built for innovation across domains.</p>
        </div>
      </div>
    </footer>
  )
}