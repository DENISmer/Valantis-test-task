import React from "react";
import style from "@/components/main/mainStyle.module.scss"
import {ProductsList} from "@/components/products/productsList/ProductsList";
import {ProductsBar} from "@/components/products/productsBar/ProductsBar";

function Main (){
    return (<>
        <div className={style.main}>
            {/*<div className={style.header}>*/}
            {/*    header*/}
            {/*</div>*/}
            <div className={style.content}>
                <ProductsBar />
                <ProductsList />
            </div>
            <div className={style.footer}>
                footer
            </div>
        </div>
    </>)
}

export default Main
