/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { FC } from 'react';

// FIX: Explicitly type as a React.FC to ensure TypeScript correctly handles React-specific props like 'children'.
const SettingsCard: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="class-card dark:bg-dark-card/70 dark:backdrop-blur-lg p-6">
        {children}
    </div>
);

export function SettingsPage({ onLogout, theme, setTheme }) {

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                 <h1 className="text-4xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">Settings</h1>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-heading font-bold text-dark-blue-text/70 dark:text-dark-text-secondary mb-4">Profile</h2>
                    <SettingsCard>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-dark-blue-text/80 dark:text-dark-text-secondary mb-1">Full Name</label>
                                <input type="text" id="name" value="Jane Doe" readOnly className="w-full bg-light-gray-bg dark:bg-dark-bg border-transparent dark:border-dark-border rounded-xl p-3 text-dark-blue-text dark:text-dark-text-primary"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-dark-blue-text/80 dark:text-dark-text-secondary mb-1">Email Address</label>
                                <input type="email" id="email" value="jane.doe@example.com" readOnly className="w-full bg-light-gray-bg dark:bg-dark-bg border-transparent dark:border-dark-border rounded-xl p-3 text-dark-blue-text dark:text-dark-text-primary"/>
                            </div>
                        </div>
                    </SettingsCard>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-dark-blue-text/70 dark:text-dark-text-secondary mb-4">Appearance</h2>
                    <SettingsCard>
                         <div className="flex justify-between items-center">
                            <p className="font-medium text-dark-blue-text dark:text-dark-text-primary">Theme</p>
                            <div className="flex items-center gap-3 text-sm text-dark-blue-text/80 dark:text-dark-text-secondary">
                                <span>Light</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeChange} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-light-gray-bg rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:bg-dark-accent"></div>
                                </label>
                                <span>Dark</span>
                            </div>
                         </div>
                    </SettingsCard>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-dark-blue-text/70 dark:text-dark-text-secondary mb-4">Account</h2>
                    <SettingsCard>
                        <div className="flex justify-between items-center">
                            <p className="text-dark-blue-text dark:text-dark-text-primary">Log out of your account.</p>
                            <button className="secondary-button" onClick={onLogout}>
                                Log Out
                            </button>
                        </div>
                    </SettingsCard>
                </section>
            </div>
        </div>
    );
}