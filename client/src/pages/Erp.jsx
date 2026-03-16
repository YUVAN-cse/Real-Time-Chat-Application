import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Home, 
  Bus, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Bot, 
  Award, 
  Shield, 
  Zap, 
  CheckCircle, 
  TrendingUp,
  MapPin,
  Clock,
  AlertCircle,
  Smartphone,
  Cloud,
  Database,
  Settings,
  MessageCircle,
  Camera,
  Lock,
  Star,
  ArrowRight,
  Play,
  ChevronRight
} from 'lucide-react';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * ERPMainPage is the main component of the ERP Student web application.
 * It renders the hero section, features section, innovations section, technology stack section, and call to action section.
 * It also handles the animation of the background elements and the features section.
 * @returns {JSX.Element} The main component of the ERP Student web application.
 */
/*******  b0953429-0c1e-4224-ba67-a16b1f3a1920  *******/const ERPMainPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Users className="feature-icon" />,
      title: "Smart Admissions",
      description: "Automated document verification with OCR & DigiLocker integration for seamless admission process",
      color: "blue"
    },
    {
      icon: <CreditCard className="feature-icon" />,
      title: "Payment Management",
      description: "Online/offline fee processing with instant verification and automated receipt generation",
      color: "green"
    },
    {
      icon: <Home className="feature-icon" />,
      title: "Hostel Allocation",
      description: "One-click room assignment with intelligent preference matching and warden notifications",
      color: "purple"
    },
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Library System",
      description: "Digital catalog management with proactive stock notifications and automated fine system",
      color: "orange"
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      title: "Analytics Dashboard",
      description: "Real-time insights with predictive analytics and backlog heatmaps for proactive decision making",
      color: "indigo"
    },
    {
      icon: <Bot className="feature-icon" />,
      title: "AI Chatbot",
      description: "24/7 intelligent student support via web, WhatsApp & voice with instant query resolution",
      color: "teal"
    }
  ];

  const innovations = [
    { icon: <TrendingUp className="innovation-icon" />, title: "Predictive Analytics", description: "Student success & backlog insights", color: "primary" },
    { icon: <Award className="innovation-icon" />, title: "Smart Scholarships", description: "Automated eligibility matching", color: "success" },
    { icon: <FileText className="innovation-icon" />, title: "One-Click NOC", description: "Instant document generation", color: "warning" },
    { icon: <MapPin className="innovation-icon" />, title: "Smart Allocation", description: "Automated hostel & transport assignment", color: "danger" },
    { icon: <Clock className="innovation-icon" />, title: "Attendance Heatmap", description: "Visual performance tracking", color: "info" },
    { icon: <Users className="innovation-icon" />, title: "Alumni Connect", description: "Tracking & mentorship network", color: "secondary" }
  ];

  const stats = [
    { value: "90%", label: "Reduced Manual Work", icon: <Zap className="stat-icon" /> },
    { value: "24/7", label: "AI Support", icon: <Bot className="stat-icon" /> },
    { value: "100%", label: "Document Verification", icon: <Shield className="stat-icon" /> },
    { value: "Real-time", label: "Analytics", icon: <BarChart3 className="stat-icon" /> }
  ];

  const techStack = [
    { name: "React", color: "#61DAFB", logo: "⚛️" },
    { name: "MongoDB", color: "#47A248", logo: "🍃" },
    { name: "Node.js", color: "#339933", logo: "📗" },
    { name: "Bootstrap", color: "#7952B3", logo: "🅱️" },
    { name: "Google APIs", color: "#4285F4", logo: "🔍" },
    { name: "DigiLocker", color: "#FF6B35", logo: "🔐" },
    { name: "Cloudinary", color: "#3448C5", logo: "☁️" },
    { name: "Razorpay", color: "#02042B", logo: "💳" }
  ];

  return (
    <div>
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --dark-gradient: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          --glass-bg: rgba(255, 255, 255, 0.1);
          --glass-border: rgba(255, 255, 255, 0.2);
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-attachment: fixed;
          overflow-x: hidden;
        }
        
        .hero-section {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--glass-border);
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .feature-card {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .feature-card:hover::before {
          left: 100%;
        }
        
        .feature-card.active {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        
        .feature-card.active .feature-icon {
          transform: scale(1.1) rotate(10deg);
        }
        
        .feature-icon {
          width: 3rem;
          height: 3rem;
          transition: all 0.3s ease;
        }
        
        .innovation-card {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          padding: 1.5rem;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .innovation-card:hover {
          transform: translateY(-10px) rotate(1deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .innovation-icon {
          width: 2rem;
          height: 2rem;
        }
        
        .stat-card {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          padding: 2rem 1rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: scale(1.05) rotate(-2deg);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .stat-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #fff;
          margin-bottom: 1rem;
        }
        
        .tech-card {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .tech-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .tech-logo {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .section-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: white;
          text-align: center;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #fff, #e3f2fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .section-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .btn-gradient {
          background: var(--primary-gradient);
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .btn-gradient:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
          color: white;
        }
        
        .btn-outline {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.5);
          padding: 1rem 2rem;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          color: white;
          transform: translateY(-3px);
        }
        
        .navbar-brand {
          font-size: 2rem;
          font-weight: 700;
          color: white !important;
        }
        
        .navbar-nav .nav-link {
          color: rgba(255, 255, 255, 0.9) !important;
          font-weight: 500;
          margin: 0 0.5rem;
          transition: all 0.3s ease;
        }
        
        .navbar-nav .nav-link:hover {
          color: white !important;
          transform: translateY(-2px);
        }
        
        .hero-title {
          font-size: 5rem;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 2rem;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 3rem;
        }
        
        .feature-demo {
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .cta-section {
          background: linear-gradient(135deg, rgba(118, 75, 162, 0.9) 0%, rgba(102, 126, 234, 0.9) 100%);
          backdrop-filter: blur(15px);
        }
        
        .footer {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(15px);
          border-top: 1px solid var(--glass-border);
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .section-title { font-size: 2.5rem; }
          .feature-card { padding: 1.5rem; }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Database className="me-2" style={{width: '2rem', height: '2rem'}} />
            ERP<span style={{color: '#4facfe'}}>Student</span>
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="#innovations">Innovations</a></li>
              <li className="nav-item"><a className="nav-link" href="#tech">Technology</a></li>
              <li className="nav-item"><a className="nav-link btn-gradient ms-2" href="#demo">Get Started</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row min-vh-100 align-items-center">
            <div className="col-12 text-center" style={{paddingTop: '100px', paddingBottom: '50px'}}>
              <div className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
                <h1 className="hero-title">
                  Smart <span style={{background: 'linear-gradient(45deg, #4facfe, #00f2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>ERP</span><br />
                  Student Management
                </h1>
                <p className="hero-subtitle mx-auto" style={{maxWidth: '800px'}}>
                  Revolutionary low-cost ERP system that automates 90% of administrative tasks using 
                  AI-powered workflows, predictive analytics, and smart integrations for modern educational institutions.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                  <a href="#demo" className="btn-gradient">
                    <Play style={{width: '1.25rem', height: '1.25rem'}} />
                    Watch Demo
                  </a>
                  <a href="#features" className="btn-outline">
                    Explore Features
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row g-4 pb-5">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-lg-3">
                <div className="stat-card">
                  {stat.icon}
                  <h3 className="text-white mb-2" style={{fontSize: '2.5rem', fontWeight: '700'}}>{stat.value}</h3>
                  <p className="text-white-50 mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-5" style={{background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)'}}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title">Core Features</h2>
              <p className="section-subtitle">Comprehensive solutions for modern educational institutions</p>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="row g-3">
                {features.map((feature, index) => (
                  <div key={index} className="col-12">
                    <div 
                      className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="d-flex align-items-start">
                        <div className="me-4">
                          <div className="p-3 rounded-3" style={{background: 'rgba(255,255,255,0.2)'}}>
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h4 className="text-white mb-2">{feature.title}</h4>
                          <p className="text-white-50 mb-0">{feature.description}</p>
                        </div>
                        <ChevronRight 
                          className={`text-white-50 transition-all ${activeFeature === index ? 'rotate-90' : ''}`}
                          style={{width: '1.5rem', height: '1.5rem', transition: 'transform 0.3s ease'}}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="feature-demo">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div className="p-3 rounded-3 me-3" style={{background: 'var(--primary-gradient)'}}>
                      {features[activeFeature].icon}
                    </div>
                    <div>
                      <h5 className="text-white mb-1">{features[activeFeature].title}</h5>
                      <small className="text-white-50">Active Module</small>
                    </div>
                  </div>
                  <CheckCircle className="text-success" style={{width: '2rem', height: '2rem'}} />
                </div>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-white-50">Automation Level</span>
                    <span className="text-success">90%</span>
                  </div>
                  <div className="progress" style={{height: '8px', background: 'rgba(255,255,255,0.2)'}}>
                    <div className="progress-bar" style={{width: '90%', background: 'var(--success-gradient)'}}></div>
                  </div>
                </div>
                
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-center p-3 rounded-3" style={{background: 'rgba(255,255,255,0.1)'}}>
                      <h4 className="text-white mb-1">24/7</h4>
                      <small className="text-white-50">Availability</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 rounded-3" style={{background: 'rgba(255,255,255,0.1)'}}>
                      <h4 className="text-white mb-1">99%</h4>
                      <small className="text-white-50">Accuracy</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations */}
      <section id="innovations" className="py-5" style={{background: 'rgba(118, 75, 162, 0.3)', backdropFilter: 'blur(15px)'}}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title">Smart Innovations</h2>
              <p className="section-subtitle">AI-powered features that set us apart</p>
            </div>
          </div>

          <div className="row g-4">
            {innovations.map((innovation, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="innovation-card">
                  <div className="d-flex align-items-start">
                    <div className={`me-3 p-3 rounded-3 text-white bg-${innovation.color}`}>
                      {innovation.icon}
                    </div>
                    <div>
                      <h5 className="text-white mb-2">{innovation.title}</h5>
                      <p className="text-white-50 mb-0 small">{innovation.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech" className="py-5" style={{background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)'}}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title">Technology Stack</h2>
              <p className="section-subtitle">Built with modern, reliable technologies</p>
            </div>
          </div>

          <div className="row g-4">
            {techStack.map((tech, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <div className="tech-card">
                  <div className="tech-logo">{tech.logo}</div>
                  <h6 className="text-white mb-0">{tech.name}</h6>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <div className="glass-card d-inline-flex align-items-center gap-4 px-5 py-3">
                <div className="d-flex align-items-center gap-2">
                  <Shield className="text-success" style={{width: '1.5rem', height: '1.5rem'}} />
                  <span className="text-white">Enterprise Security</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Lock className="text-primary" style={{width: '1.5rem', height: '1.5rem'}} />
                  <span className="text-white">JWT Authentication</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Cloud className="text-info" style={{width: '1.5rem', height: '1.5rem'}} />
                  <span className="text-white">Cloud Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="glass-card p-5 text-center">
                <h2 className="section-title mb-4">Ready to Transform Your Institution?</h2>
                <p className="section-subtitle mb-4">
                  Join the revolution in educational management with our AI-powered ERP solution
                </p>
                
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-4">
                  <a href="#demo" className="btn-gradient">
                    <MessageCircle style={{width: '1.25rem', height: '1.25rem'}} />
                    Schedule Demo
                  </a>
                  <a href="#brochure" className="btn-outline">
                    <FileText style={{width: '1.25rem', height: '1.25rem'}} />
                    Download Brochure
                  </a>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-4 text-white-50 small">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle className="text-success" style={{width: '1rem', height: '1rem'}} />
                    <span>Free 30-day trial</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle className="text-success" style={{width: '1rem', height: '1rem'}} />
                    <span>No setup fees</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle className="text-success" style={{width: '1rem', height: '1rem'}} />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <Database className="me-2 text-white" style={{width: '2rem', height: '2rem'}} />
                <span className="navbar-brand mb-0">ERP<span style={{color: '#4facfe'}}>Student</span></span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end gap-4 text-white-50 small mt-3 mt-md-0">
                <span>© 2025 Smart India Hackathon</span>
                <a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a>
                <a href="#" className="text-white-50 text-decoration-none">Terms of Service</a>
                <a href="#" className="text-white-50 text-decoration-none">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default ERPMainPage;