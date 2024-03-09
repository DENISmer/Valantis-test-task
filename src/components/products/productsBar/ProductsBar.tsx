import PB_S from '@/components/products/productsBar/ProductsBarStyles.module.scss'
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {decrement, increment, setCurrentPage} from "@/scripts/redux/slices/counterSlice";
import prevArrow from '@/assets/icons/prev_page_arrow.svg'
import nextArrow from '@/assets/icons/next_page_arrow.svg'
export const ProductsBar: React.FC = () => {
    const count = useSelector((state: any) => state.counter.value)
    const maxPages = useSelector((state: any) => state.counter.max)
    const isLoading = useSelector((state: any) => state.counter.isLoading)
    const filter = useSelector((state: any) => state.counter.filter)

    const list = useSelector((state: any) => state.products.list)

    const [buttonGroup,setButtonGroup] = useState({id:0, list: []})
    const dispatch = useDispatch()

    const buttonGroupHandler = () => {
        let buttonsList = []

        if(maxPages / 5 > 1 && count < 5){
            for(let i = 1; i <= 5; i++){
                buttonsList.push({value: i})
            }
            setButtonGroup({id: buttonGroup.id + 1, list: buttonsList})
        } else if(maxPages / 5 <= 1){
            for(let i = 1; i <= maxPages; i++){
                buttonsList.push({value: i})
            }
            setButtonGroup({id: buttonGroup.id + 1, list: buttonsList})
        }
        else if (count < buttonGroup.list[0].value){
            for(let i = count - 4; i <= count; i++){
                buttonsList.push({value: i})
            }
            setButtonGroup({id: buttonGroup.id - 1, list: buttonsList})
        } else if (count > buttonGroup.list[buttonGroup.list.length - 1].value){
            if(maxPages - count < 5){
                for(let i = count; i <= count + (maxPages - count); i++){
                    buttonsList.push({value: i})
                }
                setButtonGroup({id: buttonGroup.id + 1, list: buttonsList})
            }
            else {
                for(let i = count; i <= count + 4; i++){
                    buttonsList.push({value: i})
                }
                setButtonGroup({id: buttonGroup.id + 1, list: buttonsList})
            }
        }
    }

    useEffect(() => {
        buttonGroupHandler()
    }, []);

    useEffect(() => {
        buttonGroupHandler()
    }, [isLoading]);

    return (<>
        <div className={PB_S.Bar_body}>
            {/*// @ts-ignore*/}

            <button className={PB_S.button_next_prev}
                    disabled={isLoading}
                    onClick={() => dispatch(decrement())}>
                <img src={prevArrow} alt="prev page" width={20}/>
            </button>

            {buttonGroup && buttonGroup.list.map((button, index) => (
            <button className={count === button.value ? PB_S.button_page_number_active : PB_S.button_page_number}
                    onClick={() => dispatch(setCurrentPage(button.value))}
                    key={index}
                    disabled={isLoading}
                >
                {button.value}
            </button>
        ))}

            {maxPages && <span>․․․
                <button
                    className={PB_S.button_page_number}
                    onClick={() => dispatch(setCurrentPage(maxPages))}
                    value={maxPages}
                >
                    {maxPages}
                </button>
            </span>}

            <button className={PB_S.button_next_prev}
                    disabled={isLoading}
                    onClick={() => dispatch(increment())}>
                <img src={nextArrow} alt="next page" width={20}/>
            </button>
        </div>
    </>)
}
