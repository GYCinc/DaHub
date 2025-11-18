/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// FIX: Import `React` to make the `React.MouseEvent` type available.
import React, { useState, type ReactNode, FC } from 'react';

// FIX: Explicitly typed NavLink as a React.FC with a props type to resolve a TypeScript error where the 'children' prop was not being inferred correctly.
type NavLinkProps = {
    children: ReactNode;
    viewName: string;
    active?: boolean;
    onNavigate: (view: string) => void;
    theme: string; // Add theme prop
};

const NavLink: FC<NavLinkProps> = ({ children, viewName, active = false, onNavigate, theme }) => {
    const lightModeInactive = "text-dark-blue-text hover:bg-light-gray-bg";
    const darkModeInactive = "text-dark-text-primary hover:bg-dark-bg";

    const activeClasses = "bg-bright-yellow dark:bg-dark-accent/20 dark:border dark:border-dark-accent text-dark-blue-text dark:text-dark-text-primary";
    const commonClasses = "px-4 py-2 rounded-xl text-lg font-medium transition-colors";

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onNavigate(viewName);
    };

    let finalClasses = commonClasses;
    if (active) {
        finalClasses += ` ${activeClasses}`;
    } else {
        if (theme === 'light') {
            finalClasses += ` ${lightModeInactive}`;
        } else {
            finalClasses += ` ${darkModeInactive}`;
        }
    }
    
    return (
        <a href="#" className={finalClasses} onClick={handleClick}>
            {children}
        </a>
    );
};

// FIX: Added explicit type for Header component props to fix type inference issues.
type HeaderProps = {
  activeLink: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  inboxCount: number;
};

export function Header({ activeLink, onNavigate, onLogout, theme, setTheme, inboxCount }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Reverted to false

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const handleMobileNav = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false); // Still close after navigation for mobile UX
  };

  return (
    <header className="relative bg-white dark:bg-dark-card/70 dark:backdrop-blur-lg px-8 py-4 flex items-center justify-between shadow-lg sticky top-0 z-10 rounded-b-3xl mx-4 mt-4 dark:border-b dark:border-dark-border/50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blood-orange text-4xl">
              hub
            </span>
            <h1 className="text-3xl font-heading font-bold text-blood-orange">
                gitEnglish™
            </h1>
        </div>
        <nav className="hidden sm:flex items-center gap-4"> {/* Re-added 'hidden sm:flex' */}
          <NavLink viewName="Inbox" active={activeLink === 'Inbox'} onNavigate={onNavigate} theme={theme}>
            <div className="relative flex items-center gap-2">
                Inbox
                {inboxCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-notification-red text-xs font-bold text-white">
                    {inboxCount}
                  </span>
                )}
            </div>
          </NavLink>
          <NavLink viewName="Accomplishments" active={activeLink === 'Accomplishments'} onNavigate={onNavigate} theme={theme}>Accomplishments</NavLink>
          <NavLink viewName="Playground" active={activeLink === 'Playground'} onNavigate={onNavigate} theme={theme}>Playground</NavLink> {/* New NavLink */}
          <NavLink viewName="Statistics" active={activeLink === 'Statistics'} onNavigate={onNavigate} theme={theme}>Statistics</NavLink> {/* New NavLink */}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-dark-blue-text dark:text-dark-text-secondary">search</span>
            <input 
                className="bg-light-gray-bg border-transparent dark:bg-dark-bg dark:border-dark-border rounded-full pl-12 pr-6 py-3 text-dark-blue-text dark:text-dark-text-primary placeholder-dark-blue-text/60 dark:placeholder-dark-text-secondary focus:ring-pastel-green dark:focus:ring-dark-accent dark:focus:border-dark-accent w-72 transition-all shadow-sm font-body"
                placeholder="Search patterns..." 
                type="text"
            />
        </div>

        <button onClick={toggleTheme} className="w-12 h-12 rounded-full flex items-center justify-center bg-light-gray-bg dark:bg-dark-bg text-dark-blue-text dark:text-dark-text-primary transition-colors">
          <span className="material-symbols-outlined">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        <div className="relative hidden sm:block">
            <button 
                className="w-12 h-12 bg-soft-purple dark:bg-dark-accent rounded-full flex items-center justify-center font-bold text-white dark:text-dark-bg text-lg shadow-md"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                JD
            </button>
            {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-dark-card rounded-xl shadow-lg z-20 border border-gray-100 dark:border-dark-border">
                    <div className="p-4 border-b border-gray-100 dark:border-dark-border">
                        <p className="font-bold font-heading text-dark-blue-text dark:text-dark-text-primary">Jane Doe</p>
                        <p className="text-sm text-dark-blue-text/70 dark:text-dark-text-secondary">jane.doe@example.com</p>
                    </div>
                    <nav className="p-2">
                        <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-light-gray-bg dark:hover:bg-dark-bg text-dark-blue-text dark:text-dark-text-primary" onClick={(e) => { e.preventDefault(); onNavigate('Settings'); setIsDropdownOpen(false); }}>
                            <span className="material-symbols-outlined text-dark-blue-text/70 dark:text-dark-text-secondary">settings</span>
                            <span>Settings</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-light-gray-bg dark:hover:bg-dark-bg text-dark-blue-text dark:text-dark-text-primary" onClick={(e) => { e.preventDefault(); onLogout(); }}>
                             <span className="material-symbols-outlined text-dark-blue-text/70 dark:text-dark-text-secondary">logout</span>
                            <span>Log Out</span>
                        </a>
                    </nav>
                </div>
            )}
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-light-gray-bg dark:bg-dark-bg text-dark-blue-text dark:text-dark-text-primary"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mx-4 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md shadow-lg rounded-b-2xl sm:hidden overflow-hidden z-20">
          <nav className="flex flex-col p-4 gap-2">
            <NavLink viewName="Inbox" active={activeLink === 'Inbox'} onNavigate={handleMobileNav} theme={theme}>
              <div className="relative flex items-center gap-2">
                  Inbox
                  {inboxCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-notification-red text-xs font-bold text-white">
                      {inboxCount}
                    </span>
                  )}
              </div>
            </NavLink>
            <NavLink viewName="Accomplishments" active={activeLink === 'Accomplishments'} onNavigate={handleMobileNav} theme={theme}>Accomplishments</NavLink>
            <NavLink viewName="Playground" active={activeLink === 'Playground'} onNavigate={handleMobileNav} theme={theme}>Playground</NavLink> {/* New NavLink for mobile */}
            <NavLink viewName="Statistics" active={activeLink === 'Statistics'} onNavigate={handleMobileNav} theme={theme}>Statistics</NavLink> {/* New NavLink for mobile */}
            <div className="border-t border-gray-200 dark:border-dark-border my-2"></div>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-light-gray-bg dark:hover:bg-dark-bg text-dark-blue-text dark:text-dark-text-primary" onClick={(e) => { e.preventDefault(); handleMobileNav('Settings'); }}>
                <span className="material-symbols-outlined text-dark-blue-text/70 dark:text-dark-text-secondary">settings</span>
                <span>Settings</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-light-gray-bg dark:hover:bg-dark-bg text-dark-blue-text dark:text-dark-text-primary" onClick={(e) => { e.preventDefault(); onLogout(); }}>
                 <span className="material-symbols-outlined text-dark-blue-text/70 dark:text-dark-text-secondary">logout</span>
                <span>Log Out</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}