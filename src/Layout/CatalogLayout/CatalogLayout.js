import React from "react";
import styles from "../../templates/Main/Main.module.css";
import {Footer} from "../../templates/Footer/Footer";
import cn from "classnames";
import { Main } from "../../templates/Main/Main";
import {Header} from "../../templates/Header/Header";
import {CatalogSidebar} from "../../templates/CatalogSidebar/CatalogSidebar";
const CatalogLayout = ({ children }): JSX.Element => {
  return (
    <>
      <Header/>
        <div className={cn(styles.account)}>
            <CatalogSidebar className={styles.sidebarr}/>
            <div className={cn(styles.account_container)}>
                <Main type={"account"}>
                    <div>
                        {children}
                    </div>
                </Main>
            </div>
        </div>
      <Footer />
    </>
  );
};

export const withCatalogLayout = function(Component) {
  return function withCatalogLayoutComponent(props) {
    return (
      React.createElement(CatalogLayout, null,
        React.createElement(Component, props)
      )
    );
  };
};
