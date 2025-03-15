import React from "react";

const Header = () => {
  return (
    <header className="header-v6-area">
      <div className="header-v6-topbar">
        <div className="container">
          <div className="header-v6-topbar-wrapper">
            <div className="logo">
              <a href="/"><img src="/assets/img/home-v6/logo.svg" alt="logo" /></a>
            </div>
            <a href="#" className="btn btn-theme-4 fz-16 bdr-0 hdr-wallet d-block d-lg-none">
              Connect Wallet
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-v6-main">
        <div className="container">
          <div className="hdrv6-main-wrapper">
            <div className="hdrv6-main-left">
              {/* Notification */}
              <div className="hdr-notification">
                <button id="hdr-notification">
                  <img src="/assets/img/icon/hdr-notification.svg" alt="notification" />
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="hdr-profile">
                <button id="hdr-profile">
                  <img src="/assets/img/icon/hdr-profile.svg" alt="profile" />
                </button>
                <ul className="hdr-profile-menu">
                  <li><a href="/edit-profile">Edit Profile</a></li>
                  <li><a href="/notification">Notification Set</a></li>
                  <li><a href="/create-artwork">Create Artwork</a></li>
                  <li><a href="/wallet-connected">Wallet Connected</a></li>
                  <li><a href="#">Logout</a></li>
                </ul>
              </div>
            </div>

            {/* Main Menu */}
            <nav className="hdrv6-main-menu">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/explore">Explore</a></li>
                <li><a href="/activity">Activity</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </nav>

            <div className="hdrv6-main-right">
              <button className="search">
                <img src="/assets/img/icon/hdr-search.svg" alt="search" />
              </button>
              <a href="#" className="btn btn-theme-4 fz-16 bdr-0 hdr-wallet">Connect Wallet</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
