/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { processClassesWithColors } from '../mockData';

const HistoryItemButton = ({ item, ...rest }) => (
    <button className="bg-tag-bg dark:bg-white/5 dark:backdrop-blur-sm text-tag-text dark:text-dark-text-primary text-left p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors w-full shadow-sm" {...rest}>
        <span className="text-xs font-bold uppercase">{item.category}</span>
        <span className="block font-medium">{item.content}</span>
    </button>
);

const HistoryClassCard = ({ classData, ...rest }) => {
    const formattedDate = new Date(classData.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className={`class-card border-l-8 border-${classData.accentColorName} dark:border-l-8 dark:border-dark-accent/70 dark:bg-dark-card/70 dark:backdrop-blur-lg`} {...rest}>
            <div className="p-6 border-b border-gray-100 dark:border-dark-border">
                <p className="text-dark-blue-text/60 dark:text-dark-text-secondary text-sm font-body">{formattedDate}</p>
                <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">{classData.title}</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {classData.items.map(item => <HistoryItemButton key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export function LearningHub({ approvedClasses }) {
    const classesWithColors = processClassesWithColors(approvedClasses);
    const groupedByWeek = classesWithColors.reduce((acc, cls) => {
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
                <h1 className="text-4xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">Class History</h1>
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
                    <div className="class-card dark:bg-dark-card/70 dark:backdrop-blur-lg text-center p-10">
                        <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">No classes have been approved yet.</h3>
                        <p className="text-dark-blue-text/80 dark:text-dark-text-secondary mt-2">Once you approve a class from the dashboard, it will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}