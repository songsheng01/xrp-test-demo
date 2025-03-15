import React from "react";
import "../assets/css/plugin.css";
import "../assets/css/components.css";
import "../assets/css/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ExplorePage = () => {
  return (
    <div>
      <Header />
      <div className="banner-area" style={{ backgroundImage: "url('assets/img/bg/banner.jpg')" }}>
        <div className="container">
          <div className="banner-content">
            <h2>Explore</h2>
            <p>Discover unique digital assets in our NFT marketplace.</p>
          </div>
        </div>
      </div>

      <div className="explore-v3-area s-py-100">
        <div className="container">
          <div className="explore-v3-wrapper">
            <div className="collection-sidebar">
              <div className="collection-single-sidebar">
                <h6>Order By</h6>
                <label><input type="radio" name="order" /> Featured Only</label>
                <label><input type="radio" name="order" /> Most Popular</label>
                <label><input type="radio" name="order" /> Most Sale</label>
                <label><input type="radio" name="order" /> New Item</label>
              </div>
            </div>
            
            <div className="explore-wrapper explore-v3-inner-wrapper">
              <div className="auction-card">
                <a href="#" className="author">
                  <img src="assets/img/author/crtr-ator-03.png" alt="creator" />
                  <span>John Smith Doe</span>
                </a>
                <div className="img">
                  <img src="assets/img/all-card/auction-card/auction-06.jpg" alt="auction" />
                  <div className="cart">
                    <button className="clickable-cart">
                      ❤️
                    </button>
                    <span>276</span>
                  </div>
                </div>
                <h6><a href="#">3D Balloon Digital Art</a></h6>
                <ul>
                  <li>0.028 ETH <span>3/20</span></li>
                  <li><a href="#" className="btn btn-body-outline btn-xs">Place a Bid</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExplorePage;