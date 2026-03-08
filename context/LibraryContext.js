import React, { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

const initialBooks = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', borrowed: false },
  { id: 2, title: '1984', author: 'George Orwell', borrowed: true },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', borrowed: false },
  { id: 4, title: 'Clean Code', author: 'Robert C. Martin', borrowed: false },
  { id: 5, title: 'The Alchemist', author: 'Paulo Coelho', borrowed: true },
];

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);
  const [tokens, setTokens] = useState(3);
  const [nextId, setNextId] = useState(6);

  const addBook = (title, author) => {
    const newBook = {
      id: nextId,
      title: title.trim(),
      author: author.trim(),
      borrowed: false,
    };
    setBooks(prev => [...prev, newBook]);
    setNextId(prev => prev + 1);
    return true;
  };

  const borrowBook = (bookId) => {
    if (tokens <= 0) return { success: false, reason: 'insufficient_tokens' };

    const book = books.find(b => b.id === bookId);
    if (!book) return { success: false, reason: 'not_found' };
    if (book.borrowed) return { success: false, reason: 'already_borrowed' };

    setBooks(prev =>
      prev.map(b => b.id === bookId ? { ...b, borrowed: true } : b)
    );
    setTokens(prev => prev - 1);
    return { success: true };
  };

  const returnBook = (bookId) => {
    setBooks(prev =>
      prev.map(b => b.id === bookId ? { ...b, borrowed: false } : b)
    );
  };

  const addToken = () => {
    setTokens(prev => prev + 1);
  };

  return (
    <LibraryContext.Provider value={{
      books,
      tokens,
      addBook,
      borrowBook,
      returnBook,
      addToken,
    }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within LibraryProvider');
  return context;
}
