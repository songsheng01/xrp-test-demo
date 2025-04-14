import React, { useState } from 'react';
import styles from './tokenPage.module.css';
import PurchaseBox from '../../components/PurchaseBox/PurchaseBox';
import DetailBox from '../../components/DetailBox/DetailBox';
// import sampleImage from '../../assets/SV3pt5_EN_1.png';
import OrderBoard from '../../components/Orderboard/Orderboard';
import { useLocation } from 'react-router-dom';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// 自定义 Tooltip 组件
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const { time, price } = payload[0].payload;
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
        }}
      >
        {/* 上面显示价格 */}
        <p style={{ color: '#000', fontWeight: 'bold', margin: 0 }}>
          price: ${price}
        </p>
        {/* 下面显示时间 */}
        <p style={{ color: '#666', margin: 0 }}>time: {time}</p>
      </div>
    );
  }
  return null;
}

function TokenPage() {
  const [selectedRange, setSelectedRange] = useState('1d'); // 默认选中 1d
  const ranges = ['1d', '3d', '1m', '1y'];

  const location = useLocation();
  // 通过 location.state 获取传递的 token 数据
  const token = location.state?.token;
  console.log(token);
  // 不同时间区间对应的模拟数据
  const dataMap = {
    '1d': [
      { time: '09:30', price: 500 },
      { time: '10:00', price: 105 },
      { time: '10:30', price: 102 },
      { time: '11:00', price: 108 },
      { time: '11:30', price: 107 },
      { time: '12:00', price: 110 },
      { time: '12:30', price: 115 },
    ],
    '3d': [
      { time: 'Day 1', price: 98 },
      { time: 'Day 2', price: 102 },
      { time: 'Day 3', price: 107 },
    ],
    '1m': [
      { time: 'Week 1', price: 95 },
      { time: 'Week 2', price: 100 },
      { time: 'Week 3', price: 105 },
      { time: 'Week 4', price: 110 },
    ],
    '1y': [
      { time: 'Jan', price: 90 },
      { time: 'Feb', price: 92 },
      { time: 'Mar', price: 94 },
      { time: 'Apr', price: 96 },
      { time: 'May', price: 98 },
      { time: 'Jun', price: 100 },
      { time: 'Jul', price: 102 },
      { time: 'Aug', price: 104 },
      { time: 'Sep', price: 106 },
      { time: 'Oct', price: 108 },
      { time: 'Nov', price: 110 },
      { time: 'Dec', price: 112 },
    ],
  };

  // 当前图表数据
  const chartData = dataMap[selectedRange];
  // 当前价格取最新数据（最后一个数据项）
  const currentPrice = chartData[chartData.length - 1].price;

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    // 根据需求，此处可以添加加载不同数据的逻辑
  };

  // 格式化 y 轴价格，加上美元符号
  const formatPrice = (value) => `$${value}`;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={token.image} alt="test" className={styles.leftImg} />
      </div>
      <div className={styles.right}>
        <h1>
          2023 Japanese Pokémon 151 #2 Ivysaur - Holo Poke Ball Reverse Holo (CGC
          8.5 NM-MT+)
        </h1>
        {/* 图表容器，与标题有一定距离 */}
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* 隐藏 x 轴显示 */}
              <XAxis dataKey="time" hide={true} />
              {/* y 轴从 0 开始 */}
              <YAxis tickFormatter={formatPrice} domain={[0, 'dataMax']} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke="#8884d8" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* 灰色框：显示当前价格与购买按钮左右布局 */}
        {/* 时间区间选择按钮 */}
        <div className={styles.rangeButtonContainer}>
          {ranges.map((rangeOption) => (
            <button
              key={rangeOption}
              onClick={() => handleRangeChange(rangeOption)}
              className={`${styles.rangeButton} ${
                selectedRange === rangeOption ? styles.activeButton : ''
              }`}
            >
              {rangeOption}
            </button>
          ))}
        </div>
        <OrderBoard />
        <PurchaseBox />
        < DetailBox />
      </div>
    </div>
  );
}

export default TokenPage;