import React from "react";

const Footer = () => {
  return (
    <footer className="fantasy-footer-area">
      <div className="fantasy-footer s-py-100">
        <div className="container">
          <div className="fantasy-footer-wrapper">
            <div className="fantasy-footer-left">
              <h4 className="title">Marketplace</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/explore">Explore</a></li>
                <li><a href="/creators">Creators</a></li>
                <li><a href="/nft-rank">NFT Rank</a></li>
              </ul>
            </div>

            <div className="fantasy-footer-middle">
              <a href="/">
                <img src="/assets/img/home-v6/logo.svg" alt="logo" />
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="fantasy-footer-right">
              <h4 className="title">Important Links</h4>
              <ul>
                <li><a href="/faqs">FAQs</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyRight">
        <div className="container">
          <span>© 2025 NFT Mart. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
