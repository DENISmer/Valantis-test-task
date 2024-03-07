import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterState, filterSubmit, setFiltered} from "@/scripts/redux/slices/counterSlice";
import D_S from '@/components/products/productsBar/dropdownFilter/DropDownStyles.module.scss'
export const DropDown: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const isFiltered = useSelector((state: any) => state.counter.isFiltered)
    const filter = useSelector((state: any) => state.counter.filter)

    const dispatch = useDispatch()

    const filterChangesName = (value: string | number, key: string) => {
        if(value === ''){
            if (key === 'prod') {
                dispatch(filterState(
                    {
                        product: null,
                        price: filter.price,
                        brand: filter.brand
                    }))
            } else if (key === 'brand'){
                dispatch(filterState(
                    {
                        product: filter.product,
                        price: filter.price,
                        brand: null
                    }))
            } else if (key === 'cost'){
                dispatch(filterState(
                    {
                        product: filter.product,
                        price: null,
                        brand: filter.brand
                    }))
            }
        }
        else {
            if (key === 'prod') {
                dispatch(filterState(
                    {
                        product: value,
                        price: filter.price,
                        brand: filter.brand
                    }))
            } else if (key === 'brand'){
                dispatch(filterState(
                    {
                        product: filter.product,
                        price: filter.price,
                        brand: value
                    }))
            } else if (key === 'cost'){
                dispatch(filterState(
                    {
                        product: filter.product,
                        price: value,
                        brand: filter.brand
                    }))
            }
        }
        if(filter.brand || filter.price || filter.product){
            dispatch(setFiltered(true))
        } else dispatch(setFiltered(false))

    }
    const changeDropDownVis = () => {
        setIsActive(!isActive)
    }

    return (<>
        <button onClick={() => changeDropDownVis()}>
            filter
        </button>
        {isActive && <div className={D_S.Dropdown_body} >
            <div className={D_S.filter_item}>
                <label htmlFor="">product</label>
                <input type="text"
                       value={filter.product}
                       onChange={(e) =>
                           filterChangesName(e.target.value, 'prod')}
                />
            </div>
            <div className={D_S.filter_item}>
                <label htmlFor="">brand</label>

                <input type="text"
                       value={filter.brand}
                       onChange={(e) =>
                           filterChangesName(e.target.value, 'brand')}/>
            </div>
            <div className={D_S.filter_item}>
                <label htmlFor="">cost</label>
                <input type="number"
                       value={filter.price}
                       onChange={(e) =>
                           filterChangesName(Number(e.target.value), 'cost')}/>
            </div>
            <button className={D_S.submit_but} onClick={() =>dispatch(filterSubmit())}>submit</button>

        </div>}
        <div>

        </div>
    </>)
}