import React, { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

const INITIAL_BOOKS = [
  { id: 1, title: 'The Hobbit',      author: 'J.R.R. Tolkien',    borrowed: false },
  { id: 2, title: '1984',            author: 'George Orwell',      borrowed: true  },
  { id: 3, title: 'Atomic Habits',   author: 'James Clear',        borrowed: false },
  { id: 4, title: 'Clean Code',      author: 'Robert C. Martin',   borrowed: false },
  { id: 5, title: 'The Alchemist',   author: 'Paulo Coelho',       borrowed: true  },
];

export function LibraryProvider({ children }) {
  const [books,  setBooks]  = useState(INITIAL_BOOKS);
  const [tokens, setTokens] = useState(3);
  const [nextId, setNextId] = useState(6);

  const addBook = (title, author) => {
    setBooks(prev => [...prev, { id: nextId, title: title.trim(), author: author.trim(), borrowed: false }]);
    setNextId(n => n + 1);
  };

  const borrowBook = (id) => {
    if (tokens <= 0) return { success: false, reason: 'no_tokens' };
    const book = books.find(b => b.id === id);
    if (!book || book.borrowed) return { success: false, reason: 'unavailable' };
    setBooks(prev => prev.map(b => b.id === id ? { ...b, borrowed: true } : b));
    setTokens(t => t - 1);
    return { success: true };
  };

  const returnBook = (id) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, borrowed: false } : b));
  };

  const addToken  = ()    => setTokens(t => t + 1);
  const addTokens = (n)   => setTokens(t => t + n);

  return (
    <LibraryContext.Provider value={{ books, tokens, addBook, borrowBook, returnBook, addToken, addTokens }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be inside LibraryProvider');
  return ctx;
}