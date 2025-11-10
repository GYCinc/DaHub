// This file centralizes the mock data for the application.

export const initialClassesToApprove = [
    {
      id: 1,
      week: 32,
      date: "08/05/2024",
      title: "Mapping Your Morrow",
      primaryFocus: 'Grammar',
      items: [
        { id: 101, category: 'Grammar', content: 'Using future tense (will vs. going to)' },
        { id: 102, category: 'Core Skill', content: 'Asking follow-up questions' },
        { id: 103, category: 'Vocabulary', content: 'Common social phrases for invitations' },
        { id: 104, category: 'Expressions', content: 'Making suggestions and arrangements' },
        { id: 105, category: 'Vocabulary', content: 'Leisure activities' },
        { id: 106, category: 'Grammar', content: 'Wh- questions for planning' }
      ]
    },
    {
      id: 2,
      week: 32,
      date: "08/07/2024",
      title: "Fork, Knife, Speak",
      primaryFocus: 'Practical',
      items: [
        { id: 201, category: 'Core Skill', content: 'Roleplay: Ordering a three-course meal' },
        { id: 202, category: 'Vocabulary', content: 'Vocabulary for food and drink' },
        { id: 203, category: 'Idioms', content: 'How to ask for the bill' },
        { id: 204, category: 'Expressions', content: 'Understanding different payment methods' },
        { id: 205, category: 'Vocabulary', content: 'Describing food taste & texture' },
        { id: 206, category: 'Expressions', content: 'Making a reservation' }
      ]
    },
    {
      id: 3,
      week: 33,
      date: "08/12/2024",
      title: "Hobby Horse Huddle",
      primaryFocus: 'Vocabulary',
      items: [
        { id: 301, category: 'Grammar', content: 'Gerunds and infinitives for activities' },
        { id: 302, category: 'Core Skill', content: 'Drill: Explaining a hobby in 60 seconds' },
        { id: 303, category: 'Vocabulary', content: 'Frequency adverbs (often, sometimes, rarely)' },
        { id: 304, category: 'Expressions', content: 'Asking others about their hobbies' },
        { id: 305, category: 'Vocabulary', content: 'Hobbies and pastimes vocabulary' },
        { id: 306, category: 'Grammar', content: 'Present perfect for experiences' }
      ]
    }
];

export const initialApprovedClasses = [
    {
      id: 101,
      week: 31,
      date: "07/29/2024",
      title: "Meet, Greet, Repeat",
      primaryFocus: 'Practical',
      items: [
        { id: 10101, category: 'Expressions', content: 'Common greetings and farewells' },
        { id: 10102, category: 'Core Skill', content: 'Introducing yourself' },
        { id: 10103, category: 'Vocabulary', content: 'Jobs and Occupations' },
      ]
    },
];

export const newMockClass = {
  week: 35,
  title: "Was, Were, Wonderful",
  primaryFocus: 'Grammar',
  items: [
    { id: 501, category: 'Grammar', content: 'Review of past tense' },
    { id: 502, category: 'Core Skill', content: 'Describing a past event' },
    { id: 503, category: 'Vocabulary', content: 'Time-related vocabulary' },
    { id: 504, category: 'Expressions', content: 'Sequencing words (first, then, finally)' },
  ]
};

// Assigns color names based on the class's primary focus for the pastel theme.
const categoryColors = {
    'Grammar': 'pastel-green',
    'Practical': 'soft-purple',
    'Vocabulary': 'bright-yellow',
    'Instructional': 'pastel-green' // re-using green for consistency
};

export const processClassesWithColors = (classes) => {
    return classes.map(classData => ({
        ...classData,
        accentColorName: categoryColors[classData.primaryFocus] || 'gray-400'
    }));
};