import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="hv6-banner-area">
          <div className="container">
            <h1>Discover Digital Art in NFTMart</h1>
            <p>Collect or Sell Creative NFTs</p>
            <a href="/explore" className="btn btn-theme-4">Explore</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
