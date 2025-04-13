import React from 'react';
import styles from './Orderboard.module.css';

const OrderBoard = () => {
  const buyOrders = [
    { id: 1, time: '09:30', price: 100.50, quantity: 10 },
    { id: 2, time: '09:31', price: 100.45, quantity: 15 },
    { id: 3, time: '09:32', price: 100.40, quantity: 20 },
    { id: 4, time: '09:33', price: 100.35, quantity: 25 },
    { id: 5, time: '09:34', price: 100.30, quantity: 30 },
    { id: 6, time: '09:35', price: 100.25, quantity: 35 },
  ];
  const sellOrders = [
    { id: 1, time: '09:36', price: 100.55, quantity: 8 },
    { id: 2, time: '09:37', price: 100.60, quantity: 12 },
    { id: 3, time: '09:38', price: 100.65, quantity: 16 },
    { id: 4, time: '09:39', price: 100.70, quantity: 20 },
    { id: 5, time: '09:40', price: 100.75, quantity: 24 },
    { id: 6, time: '09:41', price: 100.80, quantity: 28 },
  ];
  const totalOrders = [
    { id: 1, time: '09:30', price: 100.50, quantity: 10, type: 'buy' },
    { id: 2, time: '09:31', price: 100.45, quantity: 15, type: 'buy' },
    { id: 3, time: '09:32', price: 100.40, quantity: 20, type: 'buy' },
    { id: 4, time: '09:36', price: 100.55, quantity: 8, type: 'sell' },
    { id: 5, time: '09:37', price: 100.60, quantity: 12, type: 'sell' },
    { id: 6, time: '09:38', price: 100.65, quantity: 16, type: 'sell' },
    { id: 7, time: '09:33', price: 100.35, quantity: 25, type: 'buy' },
    { id: 8, time: '09:39', price: 100.70, quantity: 20, type: 'sell' },
  ];

  // 根据订单类型返回对应的文本颜色
  const getOrderColor = (type) => {
    if (type === 'buy') return 'red';
    if (type === 'sell') return 'green';
    return 'black';
  };

  // 限制每个表单只显示最多5个订单
  const displayBuyOrders = buyOrders.slice(0, 5);
  const displaySellOrders = sellOrders.slice(0, 5);
  const displayTotalOrders = totalOrders.slice(0, 5);

  return (
    <div className={styles.container}>
      {/* 买单表格 */}
      <div className={styles.tableContainer}>
        <h3 className={styles.header}>Buy Order</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {displayBuyOrders.map((order) => (
              <tr key={order.id} className={styles.redRow}>
                <td className={styles.td}>{order.time}</td>
                <td className={styles.td}>{order.price}</td>
                <td className={styles.td}>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* 卖单表格 */}
      <div className={styles.tableContainer}>
        <h3 className={styles.header}>Sell Order</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {displaySellOrders.map((order) => (
              <tr key={order.id} className={styles.greenRow}>
                <td className={styles.td}>{order.time}</td>
                <td className={styles.td}>{order.price}</td>
                <td className={styles.td}>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* 所有订单表格 */}
      <div className={styles.tableContainer}>
        <h3 className={styles.header}>All Order</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {displayTotalOrders.map((order) => (
              <tr
                key={order.id}
                className={
                  order.type === 'buy' ? styles.redRow : styles.greenRow
                }
              >
                <td className={styles.td}>{order.time}</td>
                <td className={styles.td}>{order.price}</td>
                <td className={styles.td}>{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}  

export default OrderBoard;
