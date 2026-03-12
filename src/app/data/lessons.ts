export interface Question {
  id: string;
  question: string;
  emoji?: string;
  options: string[];
  correct: number;
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  color: string;
  gradient: string;
  bgGradient: string;
  description: string;
  difficulty: number;
  unlocked: boolean;
  questions: Question[];
}

export const lessons: Lesson[] = [
  {
    id: 'numbers',
    title: 'Learn Numbers',
    emoji: '🔢',
    color: '#1CB0F6',
    gradient: 'linear-gradient(135deg, #1CB0F6 0%, #4B73E0 100%)',
    bgGradient: 'linear-gradient(180deg, #E3F8FF 0%, #B8E8FF 100%)',
    description: 'Count and recognize numbers 1-10!',
    difficulty: 1,
    unlocked: true,
    questions: [
      { id: 'n1', question: 'What number comes after 3?', emoji: '🌟', options: ['2', '4', '5', '6'], correct: 1, hint: 'Count on your fingers!' },
      { id: 'n2', question: 'How many dots? ⚫⚫⚫⚫⚫', emoji: '⚫', options: ['3', '4', '5', '6'], correct: 2, hint: 'Count each dot carefully!' },
      { id: 'n3', question: 'What number is before 7?', emoji: '🎯', options: ['5', '6', '8', '9'], correct: 1, hint: 'Go backwards from 7!' },
      { id: 'n4', question: 'Which is the biggest number?', emoji: '🏆', options: ['3', '7', '2', '5'], correct: 1, hint: 'Pick the largest one!' },
      { id: 'n5', question: 'How many stars? ⭐⭐⭐', emoji: '⭐', options: ['2', '4', '3', '5'], correct: 2, hint: 'Count the stars!' },
    ],
  },
  {
    id: 'addition',
    title: 'Addition',
    emoji: '➕',
    color: '#58CC02',
    gradient: 'linear-gradient(135deg, #58CC02 0%, #2E9900 100%)',
    bgGradient: 'linear-gradient(180deg, #E8FFD5 0%, #C5F0A4 100%)',
    description: 'Add numbers together!',
    difficulty: 2,
    unlocked: true,
    questions: [
      { id: 'a1', question: '2 + 3 = ?', emoji: '🍎🍎 + 🍎🍎🍎', options: ['4', '5', '6', '7'], correct: 1, hint: 'Count the apples together!' },
      { id: 'a2', question: '4 + 1 = ?', emoji: '🐣🐣🐣🐣 + 🐣', options: ['3', '4', '5', '6'], correct: 2, hint: 'Add one more!' },
      { id: 'a3', question: '3 + 3 = ?', emoji: '⭐⭐⭐ + ⭐⭐⭐', options: ['5', '6', '7', '8'], correct: 1, hint: 'Three plus three!' },
      { id: 'a4', question: '5 + 2 = ?', emoji: '🌸🌸🌸🌸🌸 + 🌸🌸', options: ['6', '7', '8', '9'], correct: 1, hint: 'Count all the flowers!' },
      { id: 'a5', question: '1 + 6 = ?', emoji: '🎈 + 🎈🎈🎈🎈🎈🎈', options: ['6', '7', '8', '9'], correct: 1, hint: 'Add one to six!' },
    ],
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    emoji: '➖',
    color: '#FF9600',
    gradient: 'linear-gradient(135deg, #FF9600 0%, #FF5A36 100%)',
    bgGradient: 'linear-gradient(180deg, #FFF3E0 0%, #FFD9A8 100%)',
    description: 'Take away numbers!',
    difficulty: 2,
    unlocked: false,
    questions: [
      { id: 's1', question: '5 - 2 = ?', emoji: '🍕🍕🍕🍕🍕 take away 🍕🍕', options: ['2', '3', '4', '5'], correct: 1, hint: 'Take 2 away from 5!' },
      { id: 's2', question: '4 - 1 = ?', emoji: '🎈🎈🎈🎈 - 🎈', options: ['2', '3', '4', '5'], correct: 1, hint: 'Pop one balloon!' },
      { id: 's3', question: '6 - 3 = ?', emoji: '⭐⭐⭐⭐⭐⭐ - ⭐⭐⭐', options: ['2', '3', '4', '5'], correct: 1, hint: 'Count what\'s left!' },
      { id: 's4', question: '7 - 4 = ?', emoji: '🐠🐠🐠🐠🐠🐠🐠 - 🐠🐠🐠🐠', options: ['2', '3', '4', '5'], correct: 1, hint: 'Remove 4 fish!' },
      { id: 's5', question: '8 - 5 = ?', emoji: '🍓🍓🍓🍓🍓🍓🍓🍓 - 🍓🍓🍓🍓🍓', options: ['2', '3', '4', '5'], correct: 1, hint: 'Count the berries left!' },
    ],
  },
  {
    id: 'compare',
    title: 'Compare Numbers',
    emoji: '⚖️',
    color: '#CE82FF',
    gradient: 'linear-gradient(135deg, #CE82FF 0%, #9B51E0 100%)',
    bgGradient: 'linear-gradient(180deg, #F3E8FF 0%, #E1C4FF 100%)',
    description: 'Which number is bigger?',
    difficulty: 1,
    unlocked: false,
    questions: [
      { id: 'c1', question: 'Which is BIGGER?', emoji: '5 🆚 3', options: ['5', '3', 'Equal', 'I don\'t know'], correct: 0, hint: 'Think of counting up!' },
      { id: 'c2', question: 'Which is SMALLER?', emoji: '7 🆚 9', options: ['9', '7', 'Equal', 'Both small'], correct: 1, hint: '7 comes before 9!' },
      { id: 'c3', question: 'Are they EQUAL?', emoji: '4 🆚 4', options: ['Yes', 'No', 'Maybe', '4 is bigger'], correct: 0, hint: 'They look the same!' },
      { id: 'c4', question: 'Which is BIGGER?', emoji: '2 🆚 8', options: ['2', '8', 'Equal', 'Neither'], correct: 1, hint: '8 is much bigger than 2!' },
      { id: 'c5', question: 'Which is SMALLER?', emoji: '6 🆚 1', options: ['6', '1', 'Equal', 'Both same'], correct: 1, hint: '1 is the smallest single digit!' },
    ],
  },
  {
    id: 'counting',
    title: 'Count Objects',
    emoji: '🧮',
    color: '#FF86D0',
    gradient: 'linear-gradient(135deg, #FF86D0 0%, #FF4B9E 100%)',
    bgGradient: 'linear-gradient(180deg, #FFF0F8 0%, #FFD6EE 100%)',
    description: 'Count the cute objects!',
    difficulty: 1,
    unlocked: true,
    questions: [
      { id: 'co1', question: 'How many 🍎 apples?', emoji: '🍎🍎🍎🍎', options: ['3', '4', '5', '6'], correct: 1, hint: 'Count each apple!' },
      { id: 'co2', question: 'How many 🐱 cats?', emoji: '🐱🐱🐱', options: ['2', '3', '4', '5'], correct: 1, hint: 'Count the kitties!' },
      { id: 'co3', question: 'How many 🌟 stars?', emoji: '🌟🌟🌟🌟🌟🌟', options: ['4', '5', '6', '7'], correct: 2, hint: 'Count the stars!' },
      { id: 'co4', question: 'How many 🎈 balloons?', emoji: '🎈🎈', options: ['1', '2', '3', '4'], correct: 1, hint: 'Count the balloons!' },
      { id: 'co5', question: 'How many 🐸 frogs?', emoji: '🐸🐸🐸🐸🐸', options: ['3', '4', '5', '6'], correct: 2, hint: 'Count the frogs!' },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id);
}
