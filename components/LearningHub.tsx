/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const HistoryItemButton = ({ item, ...rest }) => {
    const isCoreSkill = item.category === 'Core Skill';
    const highlightColorClass = isCoreSkill ? 'border-brand-amber' : 'border-brand-indigo';

    return (
        <button 
            className={`bg-white/80 backdrop-blur-sm dark:bg-white/10 dark:backdrop-blur-md border border-gray-200 dark:border-white/20 text-tag-text dark:text-dark-text-primary text-left p-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-white/15 transition-colors w-full shadow-md dark:shadow-glow-light-dark border-l-4 ${highlightColorClass}`}
            {...rest}
        >
            <span className="text-xs font-bold uppercase">{item.category}</span>
            <span className="block font-medium">{item.content}</span>
        </button>
    );
};


const HistoryClassCard = ({ classData, ...rest }) => {
    const formattedDate = new Date(classData.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const hasCoreSkill = classData.items.some(item => item.category === 'Core Skill');
    const highlightColorClass = hasCoreSkill ? 'border-brand-amber' : 'border-brand-indigo';

    return (
        <div className={`class-card dark:bg-white/15 dark:backdrop-blur-lg dark:border dark:border-dark-border dark:shadow-glow-light-dark border-l-8 ${highlightColorClass}`} {...rest}>
            <div className="p-6 border-b border-gray-100 dark:border-dark-border/50">
                <p className="text-dark-blue-text dark:text-dark-text-primary text-2xl md:text-3xl font-heading font-black mb-1">{formattedDate}</p>
                <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">{classData.title}</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {classData.items.map(item => <HistoryItemButton key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export function LearningHub({ approvedClasses }) {
    const groupedByWeek = approvedClasses.reduce((acc, cls) => {
        const week = cls.week;
        if (!acc[week]) {
            acc[week] = [];
        }
        acc[week].push(cls);
        return acc;
    }, {});

    const sortedWeeks = Object.keys(groupedByWeek).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">Accomplishments</h1>
                 <p className="text-lg text-dark-blue-text/70 dark:text-dark-text-secondary mt-2">
                    This is the main library of all processed lessons, organized by week.
                </p>
            </div>

            <div className="space-y-12">
                {sortedWeeks.length > 0 ? (
                    sortedWeeks.map(weekNumber => (
                        <section key={weekNumber}>
                            <h2 className="text-3xl font-heading font-bold text-dark-blue-text/70 dark:text-dark-text-secondary mb-4">Week {weekNumber}</h2>
                            <div className="space-y-6">
                                {groupedByWeek[weekNumber].map(classData => (
                                    <HistoryClassCard key={classData.id} classData={classData} />
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="class-card dark:bg-white/15 dark:backdrop-blur-lg dark:border dark:border-dark-border dark:shadow-glow-light-dark text-center p-10">
                        <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">Your library is empty.</h3>
                        <p className="text-dark-blue-text/80 dark:text-dark-text-secondary mt-2">Classes you approve from the inbox will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}