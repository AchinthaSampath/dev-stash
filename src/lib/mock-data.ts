/**
 * Mock data for DevStash
 * Single source of truth until database is implemented
 */

export interface User {
  id: string;
  email: string;
  name: string;
  isPro: boolean;
  createdAt: Date;
}

export interface ItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
  userId?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  userId: string;
}

export interface Item {
  id: string;
  title: string;
  contentType: 'text' | 'file';
  content?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  url?: string;
  description?: string;
  isFavorite: boolean;
  isPinned: boolean;
  language?: string;
  userId: string;
  typeId: string;
  collectionId?: string;
  tags: string[]; // Tag IDs
  createdAt: Date;
  updatedAt: Date;
}

// Current logged-in user
export const mockUser: User = {
  id: 'user_1',
  email: 'john@example.com',
  name: 'John Doe',
  isPro: false,
  createdAt: new Date('2024-01-15'),
};

// System item types
export const mockItemTypes: ItemType[] = [
  {
    id: 'type_snippet',
    name: 'Snippets',
    icon: '💻',
    color: '#3b82f6',
    isSystem: true,
  },
  {
    id: 'type_prompt',
    name: 'Prompts',
    icon: '✨',
    color: '#a855f7',
    isSystem: true,
  },
  {
    id: 'type_command',
    name: 'Commands',
    icon: '⚡',
    color: '#f59e0b',
    isSystem: true,
  },
  {
    id: 'type_note',
    name: 'Notes',
    icon: '📝',
    color: '#10b981',
    isSystem: true,
  },
  {
    id: 'type_file',
    name: 'Files',
    icon: '📄',
    color: '#6366f1',
    isSystem: true,
  },
  {
    id: 'type_image',
    name: 'Images',
    icon: '🖼️',
    color: '#ec4899',
    isSystem: true,
  },
  {
    id: 'type_link',
    name: 'Links',
    icon: '🔗',
    color: '#14b8a6',
    isSystem: true,
  },
];

// Collections
export const mockCollections: Collection[] = [
  {
    id: 'col_1',
    name: 'React Patterns',
    description: 'Common React patterns and hooks',
    isFavorite: true,
    itemCount: 12,
    userId: 'user_1',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'col_2',
    name: 'Python Snippets',
    description: 'Useful Python code snippets',
    isFavorite: false,
    itemCount: 8,
    userId: 'user_1',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'col_3',
    name: 'Context Files',
    description: 'AI context files for projects',
    isFavorite: true,
    itemCount: 5,
    userId: 'user_1',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: 'col_4',
    name: 'Interview Prep',
    description: 'Technical interview preparation',
    isFavorite: false,
    itemCount: 24,
    userId: 'user_1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'col_5',
    name: 'Git Commands',
    description: 'Frequently used git commands',
    isFavorite: true,
    itemCount: 15,
    userId: 'user_1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'col_6',
    name: 'AI Prompts',
    description: 'Curated AI prompts for coding',
    isFavorite: false,
    itemCount: 18,
    userId: 'user_1',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
];

// Tags
export const mockTags: Tag[] = [
  { id: 'tag_1', name: 'react', userId: 'user_1' },
  { id: 'tag_2', name: 'auth', userId: 'user_1' },
  { id: 'tag_3', name: 'hooks', userId: 'user_1' },
  { id: 'tag_4', name: 'python', userId: 'user_1' },
  { id: 'tag_5', name: 'git', userId: 'user_1' },
  { id: 'tag_6', name: 'typescript', userId: 'user_1' },
];

// Items
export const mockItems: Item[] = [
  {
    id: 'item_1',
    title: 'useAuth Hook',
    contentType: 'text',
    content: `import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading };
}`,
    description: 'Custom authentication hook for React applications',
    isFavorite: true,
    isPinned: true,
    language: 'typescript',
    userId: 'user_1',
    typeId: 'type_snippet',
    collectionId: 'col_1',
    tags: ['tag_1', 'tag_2', 'tag_3'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'item_2',
    title: 'API Error Handling Pattern',
    contentType: 'text',
    content: `async function fetchWithRetry(url: string, options?: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}`,
    description: 'Fetch wrapper with exponential backoff retry logic',
    isFavorite: true,
    isPinned: true,
    language: 'typescript',
    userId: 'user_1',
    typeId: 'type_snippet',
    collectionId: 'col_1',
    tags: ['tag_1', 'tag_6'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'item_3',
    title: 'Python List Comprehension Examples',
    contentType: 'text',
    content: `# Basic list comprehension
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}

# Set comprehension
unique_chars = {char for word in ['hello', 'world'] for char in word}`,
    description: 'Common Python comprehension patterns',
    isFavorite: false,
    isPinned: false,
    language: 'python',
    userId: 'user_1',
    typeId: 'type_snippet',
    collectionId: 'col_2',
    tags: ['tag_4'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'item_4',
    title: 'Code Review Prompt',
    contentType: 'text',
    content: `Review the following code for:
- Logic errors and edge cases
- Performance issues
- Security vulnerabilities
- Code style and best practices
- Type safety (if applicable)

Provide specific, actionable feedback with code examples where appropriate.`,
    description: 'AI prompt for comprehensive code reviews',
    isFavorite: false,
    isPinned: false,
    userId: 'user_1',
    typeId: 'type_prompt',
    collectionId: 'col_6',
    tags: [],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'item_5',
    title: 'Git Rebase Interactive',
    contentType: 'text',
    content: 'git rebase -i HEAD~3',
    description: 'Interactively rebase last 3 commits',
    isFavorite: true,
    isPinned: false,
    userId: 'user_1',
    typeId: 'type_command',
    collectionId: 'col_5',
    tags: ['tag_5'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'item_6',
    title: 'Context File Template',
    contentType: 'text',
    content: `# Project Context

## Overview
[Brief project description]

## Tech Stack
- Framework:
- Language:
- Database:
- Deployment:

## Current Task
[What you're working on]

## Key Files
- \`src/\` -
- \`lib/\` -

## Patterns
[Code patterns to follow]`,
    description: 'Template for AI context files',
    isFavorite: false,
    isPinned: false,
    userId: 'user_1',
    typeId: 'type_file',
    collectionId: 'col_3',
    tags: [],
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
];

// Helper functions to work with mock data
export const getMockData = () => ({
  user: mockUser,
  itemTypes: mockItemTypes,
  collections: mockCollections,
  tags: mockTags,
  items: mockItems,
});

export const getItemsByType = (typeId: string) => {
  return mockItems.filter((item) => item.typeId === typeId);
};

export const getItemsByCollection = (collectionId: string) => {
  return mockItems.filter((item) => item.collectionId === collectionId);
};

export const getFavoriteCollections = () => {
  return mockCollections.filter((col) => col.isFavorite);
};

export const getPinnedItems = () => {
  return mockItems.filter((item) => item.isPinned);
};

export const getFavoriteItems = () => {
  return mockItems.filter((item) => item.isFavorite);
};

export const getItemTypeById = (typeId: string) => {
  return mockItemTypes.find((type) => type.id === typeId);
};

export const getCollectionById = (collectionId: string) => {
  return mockCollections.find((col) => col.id === collectionId);
};
