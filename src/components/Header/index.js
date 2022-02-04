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
                        style={{marginTop: '2ex'}}
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/mint"
                        key={1}
                    >
                      Mint
                    </Link>
                    <Link
                        style={{marginTop: '2ex'}}
                        className={styles.link}
                        activeClassName={styles.active}
                        to="/bridge"
                        key={2}
                    >
                      Bridge
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
                    href="https://buy.moonpay.com/?currencyCode=eth&singleCurrencyMode=true"
                  //to="/BuyCrypto"
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
                  key={1}
              >
                Mint
              </Link>
              <Link
                  className={styles.link}
                  activeClassName={styles.active}
                  to="/bridge"
                  key={2}
              >
                Bridge
              </Link>
              <a
                  className={styles.link}
                  // activeClassName={styles.active}
                  href="https://viridianexchange.com"
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
              href="https://buy.moonpay.com/?currencyCode=eth&singleCurrencyMode=true"
            //to="/BuyCrypto"
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
      </>
  );
};

export default Headers
