import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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
  // const handleDeleteItems = (index, dateKey) => {
  //   const newItems = { ...items };
  //   if (newItems[dateKey]) {
  //     if (index !== null) {
  //       newItems[dateKey] = newItems[dateKey].filter((_, i) => i !== index);
  //       if (newItems[dateKey].length === 0) {
  //         delete newItems[dateKey];
  //       }
  //     } else {
  //       delete newItems[dateKey];
  //     }
  //     setItems(newItems);
  //     localStorage.setItem('items', JSON.stringify(newItems));
  //   }
  // };

  const handleDeleteItems = (index, dateKey) => {
    const newItems = { ...items };
    let removedItem;
    let hasdeleted = false;

    if (newItems[dateKey]) {
      if (index !== null) {
        // 保存删除的项目
        removedItem = newItems[dateKey].splice(index, 1)[0];
        if (newItems[dateKey].length === 0) {
          delete newItems[dateKey];
        }
        hasdeleted = true;
      } else {
        // 保存删除的项目列表
        removedItem = [...newItems[dateKey]];
        delete newItems[dateKey];
        hasdeleted = true;
      }

      setItems(newItems);
      localStorage.setItem('items', JSON.stringify(newItems));

      if (hasdeleted) {
        // 显示带有撤销选项的 Toast
        const toastId = toast(
          <div className="deleteInform">
            削除しました！
            <button
              onClick={() => undoDelete(index, dateKey, removedItem, toastId)}
              style={{
                color: '#000',
                fontWeight: 'bold',
                textDecoration: 'underline',
                border: '3px solid #000',
                borderRadius: '8px',
                background: 'none',
                cursor: 'pointer',
                textDecorationLine: 'none',
                padding: '0.3rem 1rem',
                backgroundColor: '#93dfff',
              }}
            >
              撤销
            </button>
          </div>,
          {
            closeButton: 'false',
            type: 'success',
            position: 'bottom-center',
            autoClose: 3000,
          }
        );
      }
    }
  };

  // 撤销删除函数
  const undoDelete = (index, dateKey, removedItem, toastId) => {
    const newItems = { ...items };

    if (index !== null) {
      if (!newItems[dateKey]) {
        newItems[dateKey] = [];
      }
      newItems[dateKey].splice(index, 0, removedItem);
    } else {
      newItems[dateKey] = removedItem;
    }

    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
    toast.dismiss(toastId); // 仅关闭对应的通知
  };

  const handleDeleteMonthData = (year, month) => {
    const newItems = { ...items };
    const removedItems = {};
    let hasdeleted = false;

    Object.keys(newItems).forEach((dateKey) => {
      const itemDate = new Date(dateKey);
      if (itemDate.getFullYear() === year && itemDate.getMonth() === month) {
        console.log(`Deleting data for dateKey: ${dateKey}`);
        delete newItems[dateKey];
        hasdeleted = true;
      }
    });
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));

    if (hasdeleted) {
      // 显示带有撤销选项的 Toast
      const toastId = toast(
        <div className="deleteInform">
          <p>
            {year}年{month + 1}月のデータを削除しました！
          </p>
          <button
            onClick={() => undoDeleteMonth(year, month, removedItems, toastId)}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textDecoration: 'underline',
              border: '3px solid #000',
              borderRadius: '8px',
              background: 'none',
              cursor: 'pointer',
              textDecorationLine: 'none',
              padding: '0.3rem 1rem',
              backgroundColor: '#93dfff',
            }}
          >
            撤销
          </button>
        </div>,
        {
          closeButton: false,
          type: 'success',
          position: 'bottom-center',
          autoClose: 5000,
        }
      );
    }
  };
  // 撤销删除月份数据的函数
  const undoDeleteMonth = (year, month, removedItems, toastId) => {
    const newItems = { ...items };

    Object.keys(removedItems).forEach((dateKey) => {
      newItems[dateKey] = removedItems[dateKey];
    });

    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
    toast.dismiss(toastId); // 仅关闭对应的通知
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
