import PB_S from '@/components/products/productsBar/ProductsBarStyles.module.scss'
import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {fetchOnePageProduct} from '@/scripts/redux/thunk/requests'
import {decrement, filterState, increment} from "@/scripts/redux/slices/counterSlice";
import {DropDown} from "@/components/products/productsBar/dropdownFilter/DropDown";

export const ProductsBar: React.FC = () => {
    const count = useSelector((state: any) => state.counter.value)
    const maxPages = useSelector((state: any) => state.counter.max)
    const isLoading = useSelector((state: any) => state.counter.isLoading)
    const filter = useSelector((state: any) => state.counter.filter)

    const list = useSelector((state: any) => state.products.list)

    const dispatch = useDispatch()

    return (<>
        <div className={PB_S.Bar_body}>
            {/*// @ts-ignore*/}
            <button disabled={isLoading} onClick={() => dispatch(decrement())}>{'<'}</button>
            {maxPages && <span>{`${count} of ${maxPages}`}</span>}
            <button disabled={isLoading} onClick={() => dispatch(increment())}>{'>'}</button>
            {/*{filter.price && <span>{filter.price}</span>}*/}
            {/*<button onClick={() => dispatch()}>-</button>*/}
            <DropDown />
        </div>
    </>)
}
