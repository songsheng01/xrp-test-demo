import React from 'react';
import styles from './DetailBox.module.css';

function DetailBox() {
  // 示例标签数据，可根据需求动态生成
  const tags = [
    'PSA',
    '95885246',
    '9 MINT',
    'Football',
    '2020',
    'Panini Select',
    'Jonathan Taylor',
    'English',
    '153',
    'Die-Cut Neon Green Prizm',
    'Sports Starter Pack',
  ];

  return (
    <div className={styles.detailBox}>
      <h2 className={styles.title}>Details</h2>

      {/* 标签行 */}
      <div className={styles.tagsRow}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* 表格式信息 */}
      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <td>Standard</td>
            <td>ERC-721 token on the blockchain</td>
          </tr>
          <tr>
            <td>Chain</td>
            <td>Polygon</td>
          </tr>
          <tr>
            <td>Token ID</td>
            <td>
              <a href="https://example.com/token/0x9828">0x9828...7112</a>
            </td>
          </tr>
          <tr>
            <td>Contract address</td>
            <td>
              <a href="https://example.com/address/0x251B">0x251B...0cAD</a>
            </td>
          </tr>
          <tr>
            <td>Owner address</td>
            <td>
              <a href="https://example.com/address/0xf0F4">0xf0F4...faCC</a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* “Show less” 按钮，可根据需求添加点击事件
      <button className={styles.showLessBtn}>Show less</button> */}
    </div>
  );
}

export default DetailBox;
