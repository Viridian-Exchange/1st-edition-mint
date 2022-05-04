import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import axios from "axios";
import "./styles/app.sass";
import Page from "./components/Page";
import Faq from "./screens/Faq";
import Drops from "./screens/Drops";
import Open from "./screens/Open";
import Verify from "./screens/Verify";
import Web3 from "web3";
import { Breakpoint, BreakpointProvider } from 'react-socks';
import { Web3ReactProvider } from '@web3-react/core'
import { useWeb3React } from '@web3-react/core'
import {Biconomy} from "@biconomy/mexa";

let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

//TODO: show address, list of followers, description, etc on profile page
// function in the smart contract to add a user that is followed
// (triggered by follow button press-> calls the function which takes in an address and adds the user to the list of following)
// front end will pull the followee user and be able to show the profile on the initial user
// , and call in the CLI, once followers working, you will see another profile show up
// use item flow -> Profile/user flow
// get current user wallet, then abi->getuserfromaddress->return json of user struct
function App() {

  function getLibrary(provider) {
    //return new Web3(provider);
    const biconomy = new Biconomy(provider,{apiKey: "TVCsgQVfk.a6031565-1cb6-40da-8a60-2ffec22e3bed", debug: true});

    biconomy.onEvent(biconomy.READY, () => {
      // Initialize your dapp here like getting user accounts etc
      console.log("initialized")
      return new Web3(biconomy);
    }).onEvent(biconomy.ERROR, (error, message) => {
      // Handle error while initializing mexa
      console.error(error);
    });
  }

  const { active, chainId, account, activate } = useWeb3React();

  return (
        <BreakpointProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Router forceRefresh={true}>
              <Switch>
                <Route
                    exact
                    path="/"
                >
                  <Redirect to="/genesis-drop" />
                </Route>
                <Route
                    exact
                    path="/genesis-drop"
                    render={() => (
                        <Page>
                          <Drops  />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/open"
                    render={() => (
                        <Page>
                          <Open  />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/verify"
                    render={() => (
                        <Page>
                          <Verify  />
                        </Page>
                    )}
                />
                <Route
                    exact
                    path="/faq"
                    render={() => (
                        <Page>
                          <Faq />
                        </Page>
                    )}
                />
                <Route path="*">
                  <Redirect to="/genesis-drop" />
                </Route>
              </Switch>
            </Router>
          </Web3ReactProvider>
        </BreakpointProvider>
  );
}

export default App;
