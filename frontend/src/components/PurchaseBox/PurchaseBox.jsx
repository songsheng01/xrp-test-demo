import React, { useState, useContext } from 'react';
import axios from 'axios';
import styles from './PurchaseBox.module.css';
import { WalletContext } from '../../context/WalletContext';

function PurchaseBox() {
  // 控制弹窗显示/隐藏的状态
  const [showModal, setShowModal] = useState(false);
  // 控制加载状态
  const [loading, setLoading] = useState(false);
  // 表单数据状态
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.00);
  // 新增 state，用于控制当前选中的 tab，默认是 'buy'
  const [activeTab, setActiveTab] = useState('buy');

  const { walletAddress, connectWallet,signAndSubmit,ensureTrustLine } = useContext(WalletContext);

  const handleMakeOffer = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const buy_or_sell = activeTab === 'buy'? "buy":"sell";
      let response = await axios.post(`http://localhost:5001/api/${buy_or_sell}`, {
        userAddress:walletAddress,
        currency:"TESTHPS",
        tokenAmount:quantity,
        xrpAmount:price
      });
      if (response.data.response.needsTrust === true) {
        const { trustTransaction } = response.data.response;
        const trustRes = await ensureTrustLine({ trustTransaction });
        console.log(trustRes);
        if (trustRes.success !== true) {
          console.log(trustRes);
          throw new Error(`TrustSet 失败：${trustRes.error}`);
        }else{
          response = await axios.post(`http://localhost:5001/api/${buy_or_sell}`, {
            userAddress: walletAddress,
            currency: "TESTHPS",
            tokenAmount: quantity,
            xrpAmount: price,
          });
        }
      }
      const offerTransaction = response.data.response.offerTransaction;
      const res = await signAndSubmit(offerTransaction);
      if (res.success){
        console.log('TxHash:', res.txHash);
        response = await axios.post(`http://localhost:5001/api/transaction`, {
          TxHash:res.txHash
        });
        console.log(response);
      }else {
        console.log(res.error);
      }
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('There was an error submitting your offer.');
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  return (
    <div className={styles.offerSection}>
      {/* 新增 Tab 选择区域 */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'buy' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('buy')}
        >
          Buy
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'sell' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('sell')}
        >
          Sell
        </button>
      </div>

      <div className={styles.topRow}>
        <div className={styles.status}>
          {activeTab === 'buy' ? 'Highest Buy: $17/share' : 'Lowest Ask: $25/share'}
        </div>
        <button className={styles.offerButton} onClick={handleMakeOffer}>
          Make an offer
        </button>
      </div>

      <div className={styles.offerInfo}>Top offer $50.41</div>

      <div className={styles.featuresRow}>
        <div className={styles.featureItem}>Authenticity guarantee</div>
        <div className={styles.featureItem}>Vaulted and insured for free</div>
        <div className={styles.featureItem}>Collect digitally, redeem anytime</div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {walletAddress ? (
              <>
                <h2>Make an Offer</h2>
                <div className={styles.formGroup}>
                  <label>Quantity:</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Price ($):</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                  />
                </div>
                <div className={styles.modalButtons}>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      <button 
                        className={styles.submitButton}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                      <button 
                        className={styles.cancelButton} 
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2>Connect Wallet</h2>
                <p>Please connect your wallet to proceed with making an offer.</p>
                <div className={styles.modalButtons}>
                  <button 
                    className={styles.connectWalletButton} 
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
                  <button 
                    className={styles.cancelButton} 
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseBox;
