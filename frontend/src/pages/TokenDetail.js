import React from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard"; // 相对路径导入
import "./TokenDetail.css"

const TokenDetail = () => {
  const { state } = useLocation();
  const token = state?.token;

  if (!token) {
    return <div>未找到 Token 数据</div>;
  }

  return (
    <div className="token-detail-page">
      <h1>{token.name}</h1>
      <ProfileCard token={token} />
    </div>
  );
};

export default TokenDetail;
