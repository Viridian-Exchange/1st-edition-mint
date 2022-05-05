import React, { useState, useEffect } from "react";
import { Link, NavLink, } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import User from "./User";
import  { Breakpoint } from 'react-socks';

const Headers = (props, {disconnect}) => {
  const [visibleNav, setVisibleNav] = useState(false);


  return (
      <>
        <Breakpoint small down>
          <header className={styles.header}>
            <div className={cn("container", styles.container)}>
                <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
                  <nav className={styles.nav}>
                    <Link
                        style={{marginTop: '2ex'}}
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/genesis-drop"
                        key={1}
                    >
                      Mint
                    </Link>
                    <Link
                        style={{marginTop: '2ex'}}
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/open"
                        key={2}
                    >
                      Open
                    </Link>
                    <Link
                        style={{marginTop: '2ex'}}
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
                        // key={0}
                    >
                      About
                    </a>
                    <Link
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/faq"
                        key={3}
                    >
                      Help
                    </Link>
                  </nav>
                </div>
              {/*TODO: Change to "LINK"*/}
              <a className={cn("button-small", styles.button)}
                    href="https://buy.moonpay.com/?currencyCode=eth_polygon&singleCurrencyMode=true"
                 target="_blank" rel="noopener noreferrer"
                  //to="/BuyCrypto"
                  >
                Buy Polygon ETH
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
                  to="/genesis-drop"
                  key={1}
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
                  key={1}
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
              <Link
                  className={styles.link}
                  activeClassName={styles.active}
                  to="/faq"
                  key={4}
              >
                Help
              </Link>
            </nav>
          </div>
        {/*TODO: Change to "LINK"*/}
        <a className={cn("button-small", styles.button)}
           target="_blank" rel="noopener noreferrer"
              href="https://buy.moonpay.com/?currencyCode=eth_polygon&singleCurrencyMode=true"
            //to="/BuyCrypto"
            >
          Buy Polygon ETH
        </a>
        <User connectWallet={props.connectWallet} disconnect={disconnect} setVisibleModalWallets={props.setVisibleModalWallets} setPromptInstallMetamask={props.setPromptInstallMetamask} ethBalance={props.ethBalance} setEthBalance={props.setEthBalance} vextBalance={props.vextBalance} setVextBalance={props.setVextBalance} className={styles.user} account = {props.account} setAccount = {props.setAccount}
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
