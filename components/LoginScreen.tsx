/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState} from 'react';

export function LoginScreen({ onLogin }) {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(accessCode)) {
      setError('Invalid access code. Please try again.');
      setAccessCode('');
    }
  };

  return (
    <div className="font-body text-dark-blue-text dark:text-dark-text-primary flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
            <span className="material-symbols-outlined text-pastel-green dark:text-dark-accent text-5xl">hub</span>
            <h1 className="text-4xl font-heading font-bold text-dark-blue-text dark:text-dark-accent">
                gitEnglish™
            </h1>
        </div>
        <p className="text-dark-blue-text/80 dark:text-dark-text-secondary mb-8">
            Please enter your access code to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => {
              setAccessCode(e.target.value);
              setError('');
            }}
            placeholder="word-one-word-two..."
            aria-label="Access Code"
            className="w-full bg-light-gray-bg dark:bg-dark-bg border-2 border-transparent dark:border-dark-border rounded-2xl px-5 py-4 text-center text-lg placeholder-dark-blue-text/60 dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-pastel-green dark:focus:ring-dark-accent dark:focus:border-dark-accent transition"
          />
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <button type="submit" className="primary-button w-full mt-6 text-lg">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}