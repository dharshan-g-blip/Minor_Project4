/**
 * Initial Starter Data for To-Do and Notes App
 * Provides realistic, clean everyday productivity tasks and notes.
 * Completely free of meta-references to the coding project.
 */

export const initialTasks = [
  {
    id: 'task-1',
    title: 'Finish quarterly client presentation slides',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0], // Today
    priority: 'high',
    category: 'Work',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Schedule annual dental checkup & eye examination',
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 1).toISOString().split('T')[0], // Tomorrow
    priority: 'medium',
    category: 'Health',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Review team feedback on product design roadmap',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0], // Today
    priority: 'high',
    category: 'Work',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Pick up dry cleaning & grocery shopping for the week',
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    priority: 'low',
    category: 'Personal',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Morning 30-minute cardio and hydration session',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    category: 'Health',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'task-6',
    title: 'Submit travel expense reimbursement receipts',
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    priority: 'medium',
    category: 'Work',
    createdAt: new Date().toISOString(),
  }
];

export const initialNotes = [
  {
    id: 'note-1',
    title: 'Weekly Meal Plan & Healthy Grocery List',
    content: '1. Mon/Tue: Grilled lemon herb chicken with roasted asparagus and quinoa.\n2. Wed/Thu: Mediterranean chickpea bowls with cucumber, cherry tomatoes, and feta.\n3. Fri: Homemade sourdough veggie pizza.\n\nSnacks to buy: Greek yogurt, raw almonds, blueberries, and green tea.',
    category: 'Personal',
    color: 'yellow',
    isPinned: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    updatedAt: new Date(Date.now() - 86400000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },
  {
    id: 'note-2',
    title: 'Meeting Notes: Q4 Client Strategy',
    content: 'Key Discussion Points:\n- Target launch date agreed for mid-November.\n- User feedback highlights: 3-step onboarding flow appreciated.\n- Next Steps: Finalize visual deck by Thursday; schedule follow-up demo with stakeholders.',
    category: 'Work',
    color: 'blue',
    isPinned: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    updatedAt: null
  },
  {
    id: 'note-3',
    title: 'Book Recommendations & Reading Queue',
    content: 'Must-read titles for this season:\n- "Atomic Habits" by James Clear (Focus on habit loops)\n- "Deep Work" by Cal Newport (Rules for focused success)\n- "Thinking, Fast and Slow" by Daniel Kahneman\n- "The Psychology of Money" by Morgan Housel',
    category: 'Study',
    color: 'purple',
    isPinned: false,
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    updatedAt: null
  },
  {
    id: 'note-4',
    title: 'Weekend Mountain Getaway Checklist',
    content: 'Packing List:\n- Hiking boots, wool socks, waterproof windbreaker\n- First-aid kit, power banks, camera gear\n- Stainless steel water flask, energy bars\n- Offline trail navigation downloaded on phone',
    category: 'Ideas',
    color: 'green',
    isPinned: false,
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    updatedAt: null
  }
];
