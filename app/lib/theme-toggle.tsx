'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if we have a stored preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      // If stored theme exists, use it
      const userPrefersDark = storedTheme === 'dark';
      document.documentElement.classList.toggle('dark', userPrefersDark);
      setIsDark(userPrefersDark);
    } else {
      // No stored preference, fallback to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setIsDark(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
