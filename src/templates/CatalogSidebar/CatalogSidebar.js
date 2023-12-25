import sidebar from "./CatalogSidebar.module.css";
import {Button} from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import {Filter} from "../../components/Filter/Filter";
import cn from "classnames";

export const CatalogSidebar = ({
  className,
    onReset,
  ...props
}): JSX.Element => {
    
  return (
    <>
      <div className={cn(sidebar.sidebar, className)}>
          <div>
              <Input state={"default"} type={"search"} placeholder={"Поиск"} style={{marginBottom: "1rem"}}/>
              <Filter state={"default"} type={"category"}/>
              <Filter state={"default"} type={"tags"}/>
          </div>
      </div>
    </>
  );
};
