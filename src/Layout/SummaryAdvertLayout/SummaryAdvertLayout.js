import React from "react";
import {Footer} from "../../templates/Footer/Footer";
import {Logo} from "../../components/Logo/Logo"
import {Main} from "../../templates/Main/Main";
import styles from "../../style/summary.module.css"

const SummaryAdvertLayout = ({ children }): JSX.Element => {

  return (
    <>
      <Logo className={styles.logo}/>
        <Main type={"summary"}>
          {children}
        </Main>
      <Footer/>
    </>
  );
};

export const withSummaryAdvertLayout = function(Component) {
  return function withSummaryAdvertLayoutComponent(props) {
    return (
      React.createElement(SummaryAdvertLayout, null,
        React.createElement(Component, props)
      )
    );
  };
};
