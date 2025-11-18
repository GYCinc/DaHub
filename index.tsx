/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { DashboardContent } from './components/DashboardContent';
import { LearningHub } from './components/LearningHub';
import { Playground } from './components/Playground';
import { Statistics } from './components/Statistics';
import { SettingsPage } from './components/SettingsPage';
import { LoginScreen } from './components/LoginScreen';
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
    setActiveView('Inbox'); // Reset to default view on logout
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
      case 'Inbox':
        return (
          <DashboardContent 
            classesToApprove={classesToApprove}
            approvedClasses={approvedClasses}
            onApproveClass={handleApproveClass}
            onAddNewClass={handleAddNewClass}
          />
        );
      case 'Accomplishments':
        return <LearningHub approvedClasses={approvedClasses} />;
      case 'Playground':
        return <Playground />;
      case 'Statistics':
        return <Statistics />;
      case 'Settings':
        return <SettingsPage onLogout={handleLogout} theme={theme} setTheme={setTheme} />;
      default:
        return <DashboardContent classesToApprove={classesToApprove} approvedClasses={approvedClasses} onApproveClass={handleApproveClass} onAddNewClass={handleAddNewClass}/>;
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="font-body text-dark-blue-text dark:text-dark-text-primary bg-light-gray-bg dark:bg-dark-bg dark:bg-dark-grid-pattern min-h-screen">
      <Header 
        activeLink={activeView} 
        onNavigate={setActiveView}
        onLogout={handleLogout}
        theme={theme}
        setTheme={setTheme}
        inboxCount={classesToApprove.length}
      />
      <main className="bg-white dark:bg-dark-card rounded-3xl shadow-xl mx-4 mb-4 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);