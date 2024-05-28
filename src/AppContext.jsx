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
    const dateKey = currentDate.toDateString();
    const newItems = { ...items, [dateKey]: [...(items[dateKey] || []), item] };
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  const handleDeleteItems = (index) => {
    // eslint-disable-next-line no-unused-vars
    const dateKey = currentDate.toDateString();
    const newItems = {
      ...items,
      [dateKey]: items[dateKey].filter((_, i) => i !== index),
    };
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  useEffect(() => {
    localStorage.setItem('sortMoney', JSON.stringify(sortMoney));
    localStorage.setItem('btnDisabled', JSON.stringify(btnDisabled));
  }, [sortMoney, btnDisabled]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <AppContext.Provider
      value={{
        sortMoney,
        handleSwitch,
        btnDisabled,
        handleAddItems,
        handleDeleteItems,
        items: items[currentDate.toDateString()] || [],
        changeDate,
        currentDate,
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
