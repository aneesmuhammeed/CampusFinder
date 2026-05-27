'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CollegeBrief {
  id: string;
  name: string;
  location: string;
  state: string;
  logoUrl: string;
  coverUrl: string;
  fees: number;
  rating: number;
  placementAvg: number;
  placementHighest: number;
  type: string;
}

interface AppContextType {
  savedIds: string[];
  compareList: CollegeBrief[];
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  toggleSave: (id: string) => void;
  addToCompare: (college: CollegeBrief) => boolean; // returns true if added, false if already full (limit 3)
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<CollegeBrief[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('q_saved_ids');
      if (saved) setSavedIds(JSON.parse(saved));

      const compare = localStorage.getItem('q_compare_list');
      if (compare) setCompareList(JSON.parse(compare));

      const session = localStorage.getItem('q_user_session');
      if (session) {
        const userData = JSON.parse(session);
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error('Error loading stored app state', e);
    }
  }, []);

  // Sync saved list
  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('q_saved_ids', JSON.stringify(updated));
      return updated;
    });
  };

  // Sync comparison list (max 3 colleges)
  const addToCompare = (college: CollegeBrief): boolean => {
    let success = false;
    setCompareList((prev) => {
      if (prev.some((item) => item.id === college.id)) {
        success = true; // already added, no change needed
        return prev;
      }
      if (prev.length >= 3) {
        success = false; // limit reached
        return prev;
      }
      const updated = [...prev, college];
      localStorage.setItem('q_compare_list', JSON.stringify(updated));
      success = true;
      return updated;
    });
    return success;
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('q_compare_list', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('q_compare_list');
  };

  // Auth mock actions
  const login = (name: string, email: string) => {
    const userData = { name, email };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('q_user_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('q_user_session');
  };

  return (
    <AppContext.Provider
      value={{
        savedIds,
        compareList,
        isLoggedIn,
        user,
        toggleSave,
        addToCompare,
        removeFromCompare,
        clearCompare,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
