import React, { useState } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { WeddingProvider } from './context/WeddingContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For demo purposes, we'll show the landing page by default
  // In a real app, this would be managed by authentication state
  if (!isLoggedIn) {
    return <Landing />;
  }

  // This is the logged-in dashboard view (existing functionality)
  return (
    <WeddingProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img 
              src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Wedding" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A49]/50 to-[#1E2A49]/70"></div>
          </div>
          
          <Header />
          
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-6xl text-white font-serif mb-4">
                Emma & Michael
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                August 15, 2025
              </p>
              <div className="inline-block bg-white/90 backdrop-blur-sm px-6 py-3 rounded-md shadow-lg">
                <p className="text-[#1E2A49] font-medium">
                  We're getting married!
                </p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <a 
              href="#dashboard"
              className="animate-bounce bg-white/30 backdrop-blur-sm p-2 rounded-full"
              aria-label="Scroll down"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
        
        <main id="dashboard" className="flex-grow container mx-auto px-4 py-8">
          <Dashboard />
        </main>
        
        <Footer />
      </div>
    </WeddingProvider>
  );
}

export default App;