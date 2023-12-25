import React from "react";
import styles from "./AdvertLayout.module.css";
import {Footer} from "../../templates/Footer/Footer";
import cn from "classnames";
import { Main } from "../../templates/Main/Main";
const AdvertLayout = ({ children }) => {
  return (
    <>
      <Main type={"advert"}>
        <div className={cn(styles.advert_page)}>{children}</div>
      </Main>
      <Footer/>
    </>
  );
};
export const withAdvertLayout = function(Component) {
  return function withAdvertLayoutComponent(props) {
    return (
      React.createElement(AdvertLayout, null,
        React.createElement(Component, props)
      )
    );
  };
};
