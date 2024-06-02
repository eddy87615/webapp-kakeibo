import { createContext, useContext, useState, useEffect } from 'react';

// 建立 Context
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [sortMoney, setSortMoney] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 在 useEffect 中读取 localStorage
  useEffect(() => {
    const storedSortMoney = localStorage.getItem('sortMoney');
    if (storedSortMoney) {
      setSortMoney(JSON.parse(storedSortMoney));
    }

    const storedBtnDisabled = localStorage.getItem('btnDisabled');
    if (storedBtnDisabled) {
      setBtnDisabled(JSON.parse(storedBtnDisabled));
    }

    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

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
