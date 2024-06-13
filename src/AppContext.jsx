import { createContext, useContext, useState, useEffect } from 'react';

// 建立 Context
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [sortMoney, setSortMoney] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [items, setItems] = useState({});
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

  //切換收支面板
  const handleSwitch = () => {
    setSortMoney(!sortMoney);
    setBtnDisabled(!btnDisabled);
  };

  //add
  const handleAddItems = (item) => {
    const dateKey = currentDate.toDateString();
    const newItems = { ...items, [dateKey]: [...(items[dateKey] || []), item] };
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  //delete
  const handleDeleteItems = (index, dateKey) => {
    const newItems = { ...items };
    if (newItems[dateKey]) {
      if (index !== null) {
        newItems[dateKey] = newItems[dateKey].filter((_, i) => i !== index);
        if (newItems[dateKey].length === 0) {
          delete newItems[dateKey];
        }
      } else {
        delete newItems[dateKey];
      }
      setItems(newItems);
      localStorage.setItem('items', JSON.stringify(newItems));
    }
  };

  const handleDeleteMonthData = (year, month) => {
    const newItems = { ...items };
    Object.keys(newItems).forEach((dateKey) => {
      const itemDate = new Date(dateKey);
      if (itemDate.getFullYear() === year && itemDate.getMonth() === month) {
        console.log(`Deleting data for dateKey: ${dateKey}`);
        delete newItems[dateKey];
      }
    });
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
    return newDate; // 返回新的日期
  };

  const getMonthlyTotal = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    let totalIncome = 0;
    let totalExpense = 0;

    Object.keys(items).forEach((dateKey) => {
      const itemDate = new Date(dateKey);
      if (itemDate.getFullYear() === year && itemDate.getMonth() === month) {
        items[dateKey].forEach((item) => {
          if (item.type === 'income') {
            totalIncome += item.price;
          } else {
            totalExpense += item.price;
          }
        });
      }
    });

    return { totalIncome, totalExpense };
  };

  return (
    <AppContext.Provider
      value={{
        sortMoney,
        handleSwitch,
        btnDisabled,
        handleAddItems,
        handleDeleteItems,
        handleDeleteMonthData,
        items,
        changeDate,
        currentDate,
        setCurrentDate,
        getMonthlyTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
