import PL_S from '@/components/products/productsList/ProductListStyles.module.scss'
import {ProductCard} from "@/components/products/productsCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAllList, fetchOnePageProduct, getItemsById} from "@/scripts/redux/thunk/requests";
export const ProductsList: React.FC = () => {
    const list = useSelector((state: any) => state.products.productList)
    const page = useSelector((state: any) => state.counter.value)
    const listWithCardData = useSelector((state: any) => state.itemsList.itemsList)

    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(checkAllList())
    }, []);
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchOnePageProduct(page))
    }, [page]);
    useEffect(() => {
        // @ts-ignore
        dispatch(getItemsById(list))
    }, [list]);

    return (<>
        <div className={PL_S.List_body}>
            {/*{list && list[0]}*/}
            {listWithCardData && listWithCardData.map((item, index)=>(
                <ProductCard key={index} data={item}/>
            ))}
        </div>
    </>)
}