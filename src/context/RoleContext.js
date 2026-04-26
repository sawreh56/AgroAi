import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredRole, setStoredRole } from '../services/roleStorage';

const RoleContext = createContext({
  role: null,
  isHydrating: true,
  setRole: async () => {},
  clearRole: async () => {},
});

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const stored = await getStoredRole();
      if (mounted) {
        setRoleState(stored);
        setIsHydrating(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const setRole = useCallback(async (nextRole) => {
    setRoleState(nextRole);
    await setStoredRole(nextRole);
  }, []);

  const clearRole = useCallback(async () => {
    setRoleState(null);
    await setStoredRole(null);
  }, []);

  const value = useMemo(
    () => ({
      role,
      isHydrating,
      setRole,
      clearRole,
    }),
    [role, isHydrating, setRole, clearRole]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}

