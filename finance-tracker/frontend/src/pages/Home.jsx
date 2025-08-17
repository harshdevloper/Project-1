import React from "react";
import { TrendingUp, PieChart, DollarSign, BarChart3, Target, Shield } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <PieChart size={32} />,
      title: "Smart Expense Tracking",
      description: "Automatically categorize and track your daily expenses with intelligent insights."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Income Management",
      description: "Monitor multiple income streams and track your financial growth over time."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Visual Reports",
      description: "Beautiful charts and graphs to visualize your spending patterns and trends."
    },
    {
      icon: <Target size={32} />,
      title: "Budget Goals",
      description: "Set and track budget goals to achieve your financial objectives."
    },
    {
      icon: <Shield size={32} />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and protected with bank-level security."
    },
    {
      icon: <DollarSign size={32} />,
      title: "Investment Tracking",
      description: "Keep track of your investments and portfolio performance."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "$2.5M", label: "Money Tracked" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8★", label: "User Rating" }
  ];

  return (
    <div className="home-container">
      <style jsx>{`
        .home-container {
          background: #e7edf4ff;
          min-height: 100vh;
          width: 100%;
          position: relative;
        }

        .hero-section {
          text-align: center;
          padding: 60px 30px 40px;
          background: linear-gradient(135deg, #ffffffff 0%, #fff6edff 25%, #fed7aa 50%, #fb923c 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 60%;
          height: 200%;
          background: radial-gradient(circle, rgba(251,146,60,0.2) 0%, transparent 60%);
          animation: float 8s ease-in-out infinite;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .logo-container {
          margin-bottom: 24px;
        }

        .logo-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #1565C0, #fb923c);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          animation: pulse 2s infinite;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .main-title {
          font-size: 2.8rem;
          font-weight: 900;
          color: #212121;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .title-highlight {
          background: linear-gradient(45deg, #1565C0, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .btn-group {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
          border: none;
        }

        .btn-primary {
          background: #1565C0;
          color: white;
          box-shadow: 0 4px 12px rgba(21,101,192,0.3);
        }

        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(21,101,192,0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #1565C0;
          border: 2px solid #1565C0;
        }

        .btn-secondary:hover {
          background: #1565C0;
          color: white;
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 24px;
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
          color: #333;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 900;
          display: block;
          margin-bottom: 6px;
          color: #1565C0;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #555;
          font-weight: 500;
        }

        .features-section {
          padding: 50px 30px;
          background: #f1f5f9;
        }

        .section-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          color: #212121;
          margin-bottom: 16px;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 40px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid #e0e0e0;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .feature-icon {
          color: #1565C0;
          margin-bottom: 16px;
          display: flex;
          justify-content: flex-start;
        }

        .feature-title {
          font-size: 1.3rem;
          color: #212121;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .feature-description {
          color: #555;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .welcome-section {
          background: white;
          padding: 40px 30px;
          border-top: 1px solid #e0e0e0;
        }

        .welcome-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .welcome-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #212121;
          margin-bottom: 16px;
        }

        .welcome-text {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.05); 
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(3deg); 
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.2rem;
          }
          
          .hero-section {
            padding: 40px 20px 30px;
          }
          
          .features-section {
            padding: 40px 20px;
          }
          
          .btn-group {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 200px;
          }
          
          .features {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 30px 15px 20px;
          }
          
          .main-title {
            font-size: 1.8rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-icon">
              <DollarSign size={28} />
            </div>
          </div>
          
          <h1 className="main-title">
            Finance <span className="title-highlight">Tracker</span>
          </h1>
          
          <p className="hero-subtitle">
            Take complete control of your financial future with smart tracking, 
            powerful insights, and beautiful visualizations 🚀
          </p>
          
          <div className="btn-group">
            <button className="btn btn-primary">
              Get Started Free
            </button>
            <button className="btn btn-secondary">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-content">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to master your finances in one beautiful platform
          </p>
          
          <div className="features">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">Ready to Transform Your Finances?</h2>
          <p className="welcome-text">
            Join thousands of users who have already taken control of their financial future. 
            Start tracking, analyzing, and optimizing your money today.
          </p>
          <div className="btn-group">
            <button className="btn btn-primary">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;