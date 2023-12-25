import React from "react";
import styles from "./AuthLayout.module.css";
import {Footer} from "../../templates/Footer/Footer";
import sg from "./sg.jpeg"
import cn from "classnames";
import { Main } from "../../templates/Main/Main";
const AuthLayout = ({ children }) => {
  return (
    <>
      <Main type={"auth"}>
        <div className={cn(styles.auth_page)}>{children}</div>
        <img src={sg} alt={"sideground"} className={cn(styles.sg)}/>
      </Main>
      <Footer/>
    </>
  );
};
export const withAuthLayout = function(Component) {
  return function withAuthLayoutComponent(props) {
    return (
      React.createElement(AuthLayout, null,
        React.createElement(Component, props)
      )
    );
  };
};
