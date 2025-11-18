/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, FC } from 'react';

type CalendarViewProps = {
  approvedClasses: any[]; // Assuming approvedClasses is already processed with colors
};

// Helper to get number of days in a month
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
// Helper to get the first day of the month (0 = Sunday, 1 = Monday, ...)
// Returns 0 for Sunday, 1 for Monday, etc.
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
// Helper to format date to MM/DD/YYYY (consistent with mockData)
const formatDate = (date: Date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const CalendarView: FC<CalendarViewProps> = ({ approvedClasses }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Tracks the month being viewed
  const today = new Date(); // Today's date for highlighting

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-indexed

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month); // 0 for Sunday, 1 for Monday

  const days = [];
  // Add leading empty cells for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Map classes by date for quick lookup
  const classesByDate = approvedClasses.reduce((acc, classData) => {
    const dateKey = formatDate(new Date(classData.date));
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(classData);
    return acc;
  }, {});

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-dark-card/70 dark:backdrop-blur-lg dark:border dark:border-dark-border rounded-2xl shadow-xl p-6 font-body text-dark-blue-text dark:text-dark-text-primary">
      <div className="flex justify-between items-center mb-6">
        <button onClick={goToPreviousMonth} className="secondary-button px-4 py-2" aria-label="Go to previous month">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h2 className="text-2xl font-heading font-bold">
          {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={goToNextMonth} className="secondary-button px-4 py-2" aria-label="Go to next month">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-4 text-sm sm:text-base">
        {dayNames.map(day => (
          <div key={day} className="font-bold text-dark-blue-text/70 dark:text-dark-text-secondary">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCurrentMonthDay = day !== null;
          const fullDate = isCurrentMonthDay ? new Date(year, month, day) : null;
          const formattedFullDate = fullDate ? formatDate(fullDate) : '';
          const classesForDay = formattedFullDate ? classesByDate[formattedFullDate] || [] : [];
          // Check if it's today's date (ignoring time)
          const isToday = fullDate && 
                          fullDate.getDate() === today.getDate() && 
                          fullDate.getMonth() === today.getMonth() && 
                          fullDate.getFullYear() === today.getFullYear();

          return (
            <div
              key={index}
              className={`
                min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] p-2 rounded-lg 
                ${isCurrentMonthDay ? 'bg-light-gray-bg dark:bg-white/5 dark:backdrop-blur-sm' : 'bg-transparent'}
                ${isToday ? 'border-2 border-blood-orange dark:border-dark-accent' : ''}
                text-sm relative overflow-hidden flex flex-col
              `}
            >
              {isCurrentMonthDay && (
                <>
                  <span className={`font-bold text-base ${isToday ? 'text-blood-orange dark:text-dark-accent' : 'text-dark-blue-text dark:text-dark-text-primary'}`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-1 text-xs flex-grow overflow-y-auto custom-scrollbar">
                    {classesForDay.map(cls => (
                      <div 
                        key={cls.id} 
                        // Using direct color names for background and border, assuming safelisting in tailwind.config
                        className={`
                          bg-${cls.accentColorName}/50 dark:bg-white/10 dark:backdrop-blur-sm 
                          text-dark-blue-text dark:text-dark-text-primary
                          px-2 py-1 rounded-md truncate font-medium
                          border-l-4 border-${cls.accentColorName} dark:border-dark-accent/70
                          dark:shadow-glow-light-dark
                          flex-shrink-0
                        `}
                      >
                        {cls.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};