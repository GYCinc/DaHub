/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/Header';
import { DashboardContent } from './components/DashboardContent';
import { LearningHub } from './components/LearningHub';
import { LoginScreen } from './components/LoginScreen';
import { SettingsPage } from './components/SettingsPage';
import { Playground } from './components/Playground'; // New import
import { Statistics } from './components/Statistics'; // New import
import { initialClassesToApprove, initialApprovedClasses, newMockClass } from './mockData';

// This would typically be fetched or stored more securely,
// but for this private app, it's defined here.
const VALID_ACCESS_CODE = 'tasty-badger-eats-lemons';

function App() {
  // Login is bypassed for development speed. Set to 'false' to re-enable the login screen.
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeView, setActiveView] = useState('Inbox');
  const [classesToApprove, setClassesToApprove] = useState(initialClassesToApprove);
  const [approvedClasses, setApprovedClasses] = useState(initialApprovedClasses);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleLogin = (code) => {
    if (code.trim().toLowerCase() === VALID_ACCESS_CODE) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Optionally reset view to default on logout
    setActiveView('Inbox');
  };

  const handleApproveClass = (approvedClass) => {
    setClassesToApprove(prev => prev.filter(c => c.id !== approvedClass.id));
    // FIX: Explicitly convert Date objects to numbers for subtraction to satisfy TypeScript's type checker.
    setApprovedClasses(prev => [approvedClass, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };
  
  const handleAddNewClass = () => {
    const newClass = {
      ...newMockClass,
      id: Date.now(), // Use a unique ID for the new class
      date: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
    setClassesToApprove(prev => [newClass, ...prev]);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Accomplishments':
        return <LearningHub approvedClasses={approvedClasses} />;
      case 'Playground': // New case for Playground
        return <Playground />;
      case 'Statistics': // New case for Statistics
        return <Statistics />;
      case 'Settings':
        return <SettingsPage onLogout={handleLogout} theme={theme} setTheme={setTheme} />;
      case 'Inbox':
      default:
        return <DashboardContent 
          classesToApprove={classesToApprove}
          approvedClasses={approvedClasses}
          onApproveClass={handleApproveClass}
          onAddNewClass={handleAddNewClass}
        />;
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen font-body text-dark-blue-text dark:text-dark-text-primary">
      <Header 
        activeLink={activeView} 
        onNavigate={setActiveView} 
        onLogout={handleLogout} 
        theme={theme}
        setTheme={setTheme}
        inboxCount={classesToApprove.length}
      />
      <main className="flex-grow p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);