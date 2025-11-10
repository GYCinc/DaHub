/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useEffect, FC} from 'react';
import { processClassesWithColors } from '../mockData';

// FIX: Add explicit types for props using a type alias to prevent TypeScript errors when using the 'key' prop in a list.
type StatCardProps = {title: string, value: number | string, icon: string, colorName: string};
// FIX: Explicitly type as a React.FC to ensure TypeScript correctly handles React-specific props like 'key'.
const StatCard: FC<StatCardProps> = ({ title, value, icon, colorName }) => {
    // Light mode icon background class
    const lightIconBgClass = {
        green: 'bg-icon-bg-green',
        purple: 'bg-icon-bg-purple',
        yellow: 'bg-icon-bg-yellow'
    }[colorName];
    // Light mode icon color class (yellow has dark text, others white)
    const lightIconColorClass = colorName === 'yellow' ? 'text-dark-blue-text' : 'text-white';


    // Dark mode icon background class
    const darkIconBgClass = 'dark:bg-dark-accent/20'; // This is a lighter shade/opacity from accent
    // Dark mode icon color class
    const darkIconColorClass = 'dark:text-dark-accent'; // This is the main accent color

    // Gradient classes for the card background
    const gradientClasses = {
        green: 'from-stat-green-light-start to-stat-green-light-end dark:from-stat-green-dark-start dark:to-stat-green-dark-end',
        purple: 'from-stat-purple-light-start to-stat-purple-light-end dark:from-stat-purple-dark-start dark:to-stat-purple-dark-end',
        yellow: 'from-stat-yellow-light-start to-stat-yellow-light-end dark:from-stat-yellow-dark-start dark:to-stat-yellow-dark-end',
    }[colorName];

    return (
        <div className={`
            bg-gradient-to-br ${gradientClasses}
            p-6 rounded-3xl shadow-lg flex justify-between items-center 
            transform hover:scale-[1.02] dark:hover:-translate-y-1 transition-transform duration-300
        `}>
            <div>
                <p className="text-base text-dark-blue-text/80 dark:text-dark-text-secondary font-body">{title}</p>
                <p className="text-5xl font-heading font-extrabold text-dark-blue-text dark:text-dark-text-primary">{value}</p>
            </div>
            <div className={`${lightIconBgClass} ${darkIconBgClass} p-4 rounded-full shadow-md`}>
                <span className={`material-symbols-outlined text-4xl ${lightIconColorClass} ${darkIconColorClass}`}>{icon}</span>
            </div>
        </div>
    );
}

const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
};

// FIX: Add explicit types for props using a type alias to prevent TypeScript errors.
type ClassApprovalCardProps = {classData: any, onStartReview: (classData: any) => void};
// FIX: Explicitly type as a React.FC to ensure TypeScript correctly handles React-specific props like 'key'.
const ClassApprovalCard: FC<ClassApprovalCardProps> = ({ classData, onStartReview }) => {
    const topics = classData.items
        .filter(item => ["Vocabulary", "Grammar", "Idioms", "Expressions"].includes(item.category))
        .map(item => item.content);
        
    const formattedDate = new Date(classData.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className={`class-card dark:bg-dark-card/70 dark:backdrop-blur-lg p-8 flex items-center justify-between border-l-8 border-${classData.accentColorName} dark:border-l-8 dark:border-dark-accent/70`}>
            <div className="flex-shrink-0 w-56 mr-8">
                <p className="text-dark-blue-text/60 dark:text-dark-text-secondary text-sm font-body">{formattedDate}</p>
                <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">{classData.title}</h3>
            </div>
            <div className="flex-grow grid grid-cols-2 lg:grid-cols-3 gap-3">
                {topics.length > 0 ? (
                    topics.slice(0, 6).map(topic => (
                        <span key={topic} className="bg-tag-bg dark:bg-white/5 dark:backdrop-blur-sm text-tag-text dark:text-dark-text-primary text-sm px-4 py-2 rounded-full text-center truncate font-body shadow-sm">
                            {truncateText(topic, 3)}
                        </span>
                    ))
                ) : (
                    <span className="bg-tag-bg dark:bg-white/5 dark:backdrop-blur-sm text-tag-text dark:text-dark-text-secondary text-sm px-4 py-2 rounded-full text-center truncate font-body col-span-full shadow-sm">
                        No specific topics listed
                    </span>
                )}
            </div>
            <div className="flex-shrink-0 ml-8">
                <button className="primary-button" onClick={() => onStartReview(classData)}>
                    Review & Approve
                </button>
            </div>
        </div>
    );
};

const ApprovalModal = ({ classData, onClose, onApprove }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col font-body text-dark-blue-text dark:text-dark-text-primary" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                    <h2 className="text-3xl font-heading font-bold">{classData.title}</h2>
                    <p className="text-dark-blue-text/70 dark:text-dark-text-secondary">{new Date(classData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="p-6 overflow-y-auto">
                    <ul className="space-y-3">
                        {classData.items.map(item => (
                            <li key={item.id} className="flex items-center gap-4 bg-light-gray-bg dark:bg-dark-bg p-3 rounded-xl">
                                <span className="text-xs font-bold uppercase px-2 py-1 rounded-md text-white bg-soft-purple dark:bg-dark-accent dark:text-dark-bg">{item.category}</span>
                                <span>{item.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-6 mt-auto bg-light-gray-bg/50 dark:bg-dark-bg/50 rounded-b-2xl flex flex-col sm:flex-row justify-end gap-4">
                    <button className="secondary-button" onClick={onClose}>Cancel</button>
                    <button className="primary-button flex items-center justify-center gap-2" onClick={() => onApprove(classData)}>
                        <span className="material-symbols-outlined">check_circle</span>
                        Approve Class
                    </button>
                </div>
            </div>
        </div>
    );
};

export function DashboardContent({ classesToApprove, approvedClasses, onApproveClass, onAddNewClass }) {
  const [reviewingClass, setReviewingClass] = useState(null);
  const [stats, setStats] = useState({
    totalApproved: 0,
    itemsApprovedThisMonth: 0,
    totalItemsCovered: 0,
    avgItemsPerClass: '0.0',
  });

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const classesApprovedThisMonth = approvedClasses.filter(c => {
        const classDate = new Date(c.date);
        return classDate.getMonth() === currentMonth && classDate.getFullYear() === currentYear;
    });
    
    const itemsApprovedThisMonth = classesApprovedThisMonth.reduce((acc, c) => acc + c.items.length, 0);
    const totalItemsCovered = approvedClasses.reduce((acc, c) => acc + c.items.length, 0);
    const avgItemsPerClass = approvedClasses.length > 0 ? (totalItemsCovered / approvedClasses.length).toFixed(1) : '0.0';

    setStats({
        totalApproved: approvedClasses.length,
        itemsApprovedThisMonth,
        totalItemsCovered,
        avgItemsPerClass
    });
  }, [approvedClasses]);

  const classesToApproveWithColors = processClassesWithColors(classesToApprove);
  
  const handleStartReview = (classData) => setReviewingClass(classData);
  const handleCloseReview = () => setReviewingClass(null);
  const handleConfirmApproval = (classData) => {
    onApproveClass(classData);
    handleCloseReview();
  }

  const statCards = [
    { title: "Total Approved Classes", value: stats.totalApproved, icon: "task_alt", colorName: 'green' },
    { title: "Items Approved This Month", value: stats.itemsApprovedThisMonth, icon: "event_available", colorName: 'purple' },
    { title: "Total Items Covered", value: stats.totalItemsCovered, icon: "checklist", colorName: 'green' },
    { title: "Avg. Items per Class", value: stats.avgItemsPerClass, icon: "tag", colorName: 'yellow' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(card => <StatCard key={card.title} {...card} />)}
      </div>

      <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-4xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">Classes to Approve</h2>
              <p className="text-dark-blue-text/80 dark:text-dark-text-secondary text-lg font-body">Review and approve these classes to add them to the curriculum.</p>
            </div>
            <button className="secondary-button w-full md:w-auto" onClick={onAddNewClass}>
                Add New Mock Class
            </button>
          </div>
          <div className="space-y-6">
            {classesToApproveWithColors.length > 0 ? (
                classesToApproveWithColors.map(classData => (
                    <ClassApprovalCard 
                        key={classData.id} 
                        classData={classData} 
                        onStartReview={handleStartReview}
                    />
                ))
            ) : (
                <div className="class-card dark:bg-dark-card/70 dark:backdrop-blur-lg text-center p-10">
                    <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">Approval queue is empty!</h3>
                    <p className="text-dark-blue-text/80 dark:text-dark-text-secondary mt-2">Great job. All submitted classes have been reviewed.</p>
                </div>
            )}
          </div>
      </div>
      
      {reviewingClass && (
        <ApprovalModal 
            classData={reviewingClass} 
            onClose={handleCloseReview} 
            onApprove={handleConfirmApproval} 
        />
      )}
    </div>
  );
}