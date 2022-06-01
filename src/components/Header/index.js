import React, { useState, useEffect } from "react";
import { Link, NavLink, } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import User from "./User";
import  { Breakpoint } from 'react-socks';

const Headers = (props) => {
  const [visibleNav, setVisibleNav] = useState(false);


  return (
      <>
        <Breakpoint small down>
          <header className={styles.header}>
            <div className={cn("container", styles.container)}>
                <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
                  <nav className={styles.nav}>
                    <Link
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/mint"
                        key={0}
                    >
                      Mint
                    </Link>
                    <Link
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/open"
                        key={1}
                    >
                      Open
                    </Link>
                    <Link
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/verify"
                        key={2}
                    >
                      Verify
                    </Link>
                    <a
                        className={styles.link}
                        // activeClassName={styles.active}
                        href="https://viridianexchange.com"
                        target="_blank" rel="noopener noreferrer"
                        key={3}
                    >
                      About
                    </a>
                    <a
                        className={styles.link}
                        // activeClassName={styles.active}
                        href="https://docs.viridianexchange.com"
                        target="_blank" rel="noopener noreferrer"
                        key={4}
                    >
                      Help
                    </a>
                  </nav>
                </div>
              <a className={cn("button-small", styles.button)}
                 style={{backgroundColor: '#9757D7'}}
                 target="_blank" rel="noopener noreferrer"
                 href="https://buy.moonpay.com/?currencyCode=eth_polygon&singleCurrencyMode=true"
              >
                Buy Polygon ETH
              </a>
              <a className={cn("button-small", styles.button)}
                 target="_blank" rel="noopener noreferrer"
                 href="https://buy.moonpay.com/?currencyCode=eth&singleCurrencyMode=true"
              >
                Buy ETH
              </a>

              <User setPromptInstallMetamask={props.setPromptInstallMetamask} ethBalance={props.ethBalance} setEthBalance={props.setEthBalance} vextBalance={props.vextBalance} setVextBalance={props.setVextBalance} className={styles.user} account = {props.account} setAccount = {props.setAccount}
                    connected = {props.connected} setConnected = {props.setConnected} userInfo = {props.userInfo} setUserInfo={props.setUserInfo}/>
              <button
                  className={cn(styles.burger, { [styles.active]: visibleNav })}
                  onClick={() => setVisibleNav(!visibleNav)}>
              </button>
            </div>
          </header>
        </Breakpoint>
      <Breakpoint medium up>
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/logo_words.svg"
            srcDark="/logo_words.svg"
            alt="Viridian Exchange"
          />
        </Link>
          <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
            <nav className={styles.nav}>
              <Link
                  className={styles.link}
                  activeClassName={styles.active}
                  to="/mint"
                  key={0}
              >
                Mint
              </Link>
              <Link
                  className={styles.link}
                  activeClassName={styles.active}
                  to="/open"
                  key={1}
              >
                Open
              </Link>
              <Link
                  className={styles.link}
                  activeClassName={styles.active}
                  to="/verify"
                  key={2}
              >
                Verify
              </Link>
              <a
                  className={styles.link}
                  //activeClassName={styles.active}
                  href="https://viridianexchange.com"
                  target="_blank" rel="noopener noreferrer"
                  key={3}
              >
                About
              </a>
              <a
                  className={styles.link}
                  //activeClassName={styles.active}
                  href="https://docs.viridianexchange.com"
                  target="_blank" rel="noopener noreferrer"
                  key={4}
              >
                Help
              </a>
            </nav>
          </div>
        <a className={cn("button-small", styles.button)}
           style={{backgroundColor: '#9757D7'}}
           target="_blank" rel="noopener noreferrer"
           href="https://buy.moonpay.com/?currencyCode=eth_polygon&singleCurrencyMode=true"
        >
          Buy Polygon ETH
        </a>
        <a className={cn("button-small", styles.button)}
           target="_blank" rel="noopener noreferrer"
              href="https://buy.moonpay.com/?currencyCode=eth&singleCurrencyMode=true"
            >
          Buy ETH
        </a>
        <User connectWallet={props.connectWallet} disconnect={props.disconnect} setVisibleModalWallets={props.setVisibleModalWallets} setPromptInstallMetamask={props.setPromptInstallMetamask} ethBalance={props.ethBalance} setEthBalance={props.setEthBalance} vextBalance={props.vextBalance} setVextBalance={props.setVextBalance} className={styles.user} account = {props.account} setAccount = {props.setAccount}
              connected = {props.connected} setConnected = {props.setConnected} userInfo = {props.userInfo} setUserInfo={props.setUserInfo}/>
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}>
        </button>
      </div>
    </header>
      </Breakpoint>
      </>
  );
};

export default Headers
