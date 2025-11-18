/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useEffect, FC} from 'react';
import { processClassesWithColors } from '../mockData';

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
        <div className={`class-card bg-white dark:bg-dark-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 rounded-2xl border border-gray-200 dark:border-dark-border`}>
            <div className="flex-shrink-0 w-full sm:w-56">
                <p className="text-dark-blue-text dark:text-dark-text-secondary text-lg font-heading font-semibold mb-1">{formattedDate}</p>
                <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">{classData.title}</h3>
            </div>
            <div className="flex-grow grid grid-cols-2 lg:grid-cols-3 gap-3">
                {topics.length > 0 ? (
                    topics.slice(0, 6).map(topic => (
                        <span key={topic} className="bg-light-gray-bg dark:bg-dark-bg text-tag-text dark:text-dark-text-secondary text-sm px-4 py-2 rounded-full text-center truncate font-body">
                            {truncateText(topic, 3)}
                        </span>
                    ))
                ) : (
                    <span className="bg-light-gray-bg dark:bg-dark-bg text-tag-text dark:text-dark-text-secondary text-sm px-4 py-2 rounded-full text-center truncate font-body col-span-full">
                        No specific topics listed
                    </span>
                )}
            </div>
            <div className="flex-shrink-0 sm:ml-8 w-full sm:w-auto mt-4 sm:mt-0">
                <button className="primary-button w-full sm:w-auto" onClick={() => onStartReview(classData)}>
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

  const classesToApproveWithColors = processClassesWithColors(classesToApprove);
  
  const handleStartReview = (classData) => setReviewingClass(classData);
  const handleCloseReview = () => setReviewingClass(null);
  const handleConfirmApproval = (classData) => {
    onApproveClass(classData);
    handleCloseReview();
  }

  return (
    <div>
      <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <h1 className="text-4xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">Recent Classes</h1>
              <p className="text-lg text-dark-blue-text/70 dark:text-dark-text-secondary mt-2">
                This is your inbox. Review and approve these classes to add them to the main library.
              </p>
            </div>
            <button className="secondary-button w-full md:w-auto flex-shrink-0 mt-2 md:mt-0" onClick={onAddNewClass}>
                Add New Mock Class
            </button>
          </div>
          <div className="space-y-4">
            {classesToApproveWithColors.length > 0 ? (
                classesToApproveWithColors.map(classData => (
                    <ClassApprovalCard 
                        key={classData.id} 
                        classData={classData} 
                        onStartReview={handleStartReview}
                    />
                ))
            ) : (
                <div className="class-card bg-white dark:bg-dark-card text-center p-10 rounded-2xl border border-gray-200 dark:border-dark-border">
                    <h3 className="text-2xl font-heading font-bold text-dark-blue-text dark:text-dark-text-primary">The inbox is clear.</h3>
                    <p className="text-dark-blue-text/80 dark:text-dark-text-secondary mt-2">You're all done. Any new classes will appear here.</p>
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