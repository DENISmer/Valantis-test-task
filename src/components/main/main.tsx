import React from "react";
import style from "@/components/main/mainStyle.module.scss"
import {ProductsList} from "@/components/products/productsList/ProductsList";
import {ProductsBar} from "@/components/products/productsBar/ProductsBar";
import {DropDown} from "@/components/products/productsBar/dropdownFilter/DropDown";

function Main (){
    return (<>
        <div className={style.main}>
            {/*<div className={style.header}>*/}
            {/*    header*/}
            {/*</div>*/}
            <div className={style.content}>
                <DropDown />
                <ProductsList />
                <ProductsBar />
            </div>
            {/*<div className={style.footer}>*/}
            {/*    footer*/}
            {/*</div>*/}
        </div>
    </>)
}

export default Main
