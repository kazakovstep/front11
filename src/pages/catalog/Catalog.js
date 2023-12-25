import {withCatalogLayout} from "../../Layout/CatalogLayout/CatalogLayout";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";
import queryString from 'query-string';
import {getDataAll} from "../advert/advert";

export const Catalog = () => {

    const [advertStorage, setAdvertStorage] = useState([]);

    useLayoutEffect(()=>{
        getDataAll().then((storedData) => {
        if (storedData) {
            setAdvertStorage(storedData);
        }
    });
    }, [advertStorage])


  return (
    <>
        <CatalogPreview/>
        {advertStorage.map((ad, index) => (
            <CatalogPreview
                key={index}
                data={ad}
                link={{
                  pathname: '/catalog/advert',
                  search: queryString.stringify({ advert_id: index }),
                }}
            />
        ))}
    </>
  );
}

export default withCatalogLayout(Catalog);