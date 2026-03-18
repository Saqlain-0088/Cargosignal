import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Clock, CheckCircle2, Map, Zap, FileText, Anchor } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold tracking-tight">CargoSignal</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
          <a href="#benefits" className="hover:text-blue-600 transition-colors">Benefits</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">Log in</a>
          <Button>Sign Up</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-white"></div>
          <Badge variant="info" className="mb-6 py-1 px-3 text-sm border-blue-200">
            ✨ The new standard in logistics
          </Badge>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
            Intelligent Supply Chain <span className="text-blue-600">Visibility</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 md:text-xl">
            CargoSignal empowers global shippers to track, manage, and optimize their ocean freight in real-time. Reduce demurrage costs and avoid supply chain disruptions proactively.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button className="h-12 px-8 text-base shadow-lg shadow-blue-500/20">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="secondary" className="h-12 px-8 text-base">
              Sign Up for Free
            </Button>
          </div>
          
          {/* Subtle Product Preview / Illustration Placeholder */}
          <div className="w-full max-w-5xl mx-auto mt-16 rounded-xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
             <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <div className="text-xs font-mono text-slate-400 ml-4">app.cargosignal.com/dashboard</div>
             </div>
             <div className="aspect-[21/9] bg-gradient-to-br from-slate-50 to-slate-100 relative p-8 flex items-center justify-center">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                <div className="flex flex-col items-center opacity-40 text-slate-500 font-medium">
                  <Map className="w-16 h-16 mb-4 text-blue-500" />
                  [ Interactive Map & Dashboard Preview ]
                </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Comprehensive Tools for Modern Trade</h2>
              <p className="mt-4 text-lg text-slate-600">Everything you need to orchestrate your global shipments effortlessly.</p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Real-Time Tracking", desc: "Monitor containers globally with precise carrier and AIS data integration.", icon: Globe },
                { title: "Predictive ETA", desc: "AI-driven algorithms to forecast accurate arrival times and potential delays.", icon: TrendingUp },
                { title: "Customs Clearance Automation", desc: "Seamlessly manage document workflows and track entry status.", icon: ShieldCheck },
                { title: "Demurrage Alerts", desc: "Get intelligent warnings before free time expires at ports and terminals.", icon: Clock },
                { title: "Document Management", desc: "Centralized repository for Bills of Lading, Commercial Invoices, and packing lists.", icon: FileText },
                { title: "Vessel Analytics", desc: "Detailed insights into vessel performance, port congestion, and route efficiency.", icon: Anchor },
              ].map((feature, idx) => (
                <Card key={idx} className="border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100">
                  <CardHeader className="pb-2">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 bg-slate-50 px-6 border-y border-slate-200/60">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How CargoSignal Works</h2>
            <p className="mt-4 text-lg text-slate-600">Three simple steps to gain control over your supply chain.</p>
            
            <div className="mt-16 grid gap-12 md:grid-cols-3 relative">
               {/* Connecting line for desktop */}
               <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>

               {[
                 { step: "1", title: "Connect", desc: "Link your ERP, freight forwarder, or enter tracking numbers directly to sync your shipments." },
                 { step: "2", title: "Automate", desc: "Our engine orchestrates tracking data from carriers, ports, and customs seamlessly." },
                 { step: "3", title: "Optimize", desc: "Receive proactive alerts and actionable insights to prevent delays and reduce costs." },
               ].map((item, idx) => (
                 <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30 mb-6 border-4 border-slate-50">
                     {item.step}
                   </div>
                   <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                   <p className="text-slate-600">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-white px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="success" className="mb-4">Why CargoSignal?</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Gain a competitive advantage</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Stop reacting to supply chain fires. CargoSignal gives you the foresight needed to build a resilient, cost-effective logistics network.
                </p>
                <ul className="space-y-5">
                  {[
                    "Reduce Demurrage & Detention by up to 40%",
                    "Eliminate manual tracking spreadsheet updates",
                    "Improve customer satisfaction with accurate ETAs",
                    "Detect port congestion anomalies automatically"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-slate-800 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-50 rounded-2xl transform rotate-3"></div>
                <div className="relative rounded-xl bg-white p-8 shadow-xl border border-slate-200">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                       <Zap className="h-6 w-6" />
                     </div>
                     <div>
                       <div className="font-bold text-slate-900">ROI Impact</div>
                       <div className="text-sm text-slate-500">Average customer results</div>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                       <div className="text-3xl font-black text-blue-600 mb-1">15hrs</div>
                       <div className="text-xs text-slate-500 uppercase font-semibold">Saved per week</div>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                       <div className="text-3xl font-black text-green-600 mb-1">3x</div>
                       <div className="text-xs text-slate-500 uppercase font-semibold">Faster resolutions</div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section id="pricing" className="py-24 bg-slate-50 px-6 border-t border-slate-200/60">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-slate-600 mb-12">Start for free, scale when you need to.</p>
            
            <div className="grid sm:grid-cols-2 gap-8 text-left">
              <Card className="border-slate-200 shadow-sm relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <div className="mt-2 text-4xl font-extrabold">$0<span className="text-base font-medium text-slate-500 font-normal"> /mo</span></div>
                  <p className="text-sm text-slate-500 mt-2">Up to 5 shipments/month. Perfect for small businesses.</p>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full mb-6">Create Free Account</Button>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Basic Tracking</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Email Notifications</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 shadow-md relative overflow-hidden ring-1 ring-blue-600">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <CardHeader>
                  <CardTitle className="text-2xl">Professional</CardTitle>
                  <div className="mt-2 text-4xl font-extrabold">$299<span className="text-base font-medium text-slate-500 font-normal"> /mo</span></div>
                  <p className="text-sm text-slate-500 mt-2">Advanced analytics and API integrations.</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-6">Start 14-Day Free Trial</Button>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Up to 500 Shipments</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Predictive ETA & Analytics</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> API Access</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 bg-blue-600 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
          <div className="mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Ready to transform your supply chain?</h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of innovative logistics teams. Create your free account today and track your first 5 shipments on us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-blue-600 hover:bg-slate-50 h-14 px-8 text-lg font-semibold shadow-xl">
                Sign Up for Free
              </Button>
              <Button variant="secondary" className="bg-blue-700 text-white border-blue-500 hover:bg-blue-800 h-14 px-8 text-lg border">
                Talk to Sales
              </Button>
            </div>
            <p className="mt-6 text-blue-200 text-sm">No credit card required. 14-day free trial on premium plans.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16 px-6">
        <div className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded text-white">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">CargoSignal</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              The modern operating system for global ocean freight. Making supply chains visible, predictive, and resilient.
            </p>
            <div className="mt-6 flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors text-slate-400">𝕏</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors text-slate-400">in</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-xs tracking-wider">Product</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-xs tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase text-xs tracking-wider">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <div>© {new Date().getFullYear()} CargoSignal Inc. All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <span>Made with precision for global trade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
