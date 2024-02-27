import PB_S from '@/components/products/productsBar/ProductsBarStyles.module.scss'
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {fetchUserById} from "@/scripts/redux/thunk/requests";
export const ProductsBar: React.FC = () => {
    // @ts-ignore
    const count = useSelector((state) => state.counter.value)

    const dispatch = useDispatch()


    return (<>
        <div className={PB_S.Bar_body}>
            <input placeholder={'search'} type={"text"} />
            <button>{count}</button>
            {/*// @ts-ignore*/}
            <button onClick={() => dispatch(fetchUserById())}>+</button>
            {/*<button onClick={() => dispatch()}>-</button>*/}
        </div>
    </>)
}