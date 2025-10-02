import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} onCollapse={setIsSidebarCollapsed} />
      <main className={`transition-all duration-300 pt-16 px-8 py-6 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome to the Platform</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
