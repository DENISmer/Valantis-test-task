import PB_S from '@/components/products/productsBar/ProductsBarStyles.module.scss'
import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {fetchOnePageProduct} from '@/scripts/redux/thunk/requests'
import {decrement, increment} from "@/scripts/redux/slices/counterSlice";

export const ProductsBar: React.FC = () => {
    const count = useSelector((state: any) => state.counter.value)
    const maxPages = useSelector((state: any) => state.counter.max)
    const list = useSelector((state: any) => state.products.list)
    const dispatch = useDispatch()

    return (<>
        <div className={PB_S.Bar_body}>
            <input placeholder={'search'} type={"text"} />
            {/*// @ts-ignore*/}
            <button onClick={() => dispatch(decrement())}>{'<'}</button>
            {maxPages && <span>{`${count} of ${maxPages}`}</span>}
            <button onClick={() => dispatch(increment())}>{'>'}</button>
            {/*<button onClick={() => dispatch()}>-</button>*/}
        </div>
    </>)
}
