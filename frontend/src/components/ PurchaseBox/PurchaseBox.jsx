import React from 'react';
import styles from './PurchaseBox.module.css';

function PurchaseBox() {
  return (
    <div className={styles.offerSection}>
      {/* 顶栏：左侧状态 + 右侧按钮 */}
      <div className={styles.topRow}>
        <div className={styles.status}>$ 154</div>
        <button className={styles.offerButton}>Make an offer</button>
      </div>

      {/* 显示当前或最高报价 */}
      <div className={styles.offerInfo}>Top offer $50.41</div>

      {/* 特性/说明行（可根据需求添加图标） */}
      <div className={styles.featuresRow}>
        <div className={styles.featureItem}>Authenticity guarantee</div>
        <div className={styles.featureItem}>Vaulted and insured for free</div>
        <div className={styles.featureItem}>Collect digitally, redeem anytime</div>
      </div>
    </div>
  );
}

export default PurchaseBox;
