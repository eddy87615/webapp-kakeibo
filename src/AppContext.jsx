// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from 'react';

// 建立 Context
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [sortMoney, setSortMoney] = useState(() => {
    const storedSortMoney = localStorage.getItem('sortMoney');
    return storedSortMoney ? JSON.parse(storedSortMoney) : false;
  });

  const [btnDisabled, setBtnDisabled] = useState(() => {
    const storedBtnDisabled = localStorage.getItem('btnDisabled');
    return storedBtnDisabled ? JSON.parse(storedBtnDisabled) : true;
  });

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const handleSwitch = () => {
    setSortMoney(!sortMoney);
    setBtnDisabled(!btnDisabled);
  };

  const handleAddItems = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  const handleDeleteItems = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  // 更新 localStorage 中的 sortMoney 和 btnDisabled
  useEffect(() => {
    localStorage.setItem('sortMoney', JSON.stringify(sortMoney));
    localStorage.setItem('btnDisabled', JSON.stringify(btnDisabled));
  }, [sortMoney, btnDisabled]);

  return (
    <AppContext.Provider
      value={{
        sortMoney,
        handleSwitch,
        btnDisabled,
        handleAddItems,
        handleDeleteItems,
        items,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 使用 Context
export const useAppContext = () => {
  return useContext(AppContext);
};
