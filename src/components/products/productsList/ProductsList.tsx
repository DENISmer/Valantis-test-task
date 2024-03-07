import PL_S from '@/components/products/productsList/ProductListStyles.module.scss'
import {ProductCard} from "@/components/products/productsCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAllList, fetchOnePageProduct, getIdsByFilter, getItemsById} from "@/scripts/redux/thunk/requests";
import {currentPage, setFiltered, setLoading} from "@/scripts/redux/slices/counterSlice";
import {loadingData} from "@/scripts/utils/loading";

export const ProductsList: React.FC = () => {
    const list_id = useSelector((state: any) => state.products.productList_Id)
    const page = useSelector((state: any) => state.counter.value)
    const filter = useSelector((state: any) => state.counter.filter)
    const filterSubmit = useSelector((state: any) => state.counter.onFilterSubmit)
    const isFiltered = useSelector((state: any) => state.counter.isFiltered)
    const listWithCardData = useSelector((state: any) => state.itemsList.itemsList)
    const filteredList = useSelector((state: any) => state.filterLists.idsFilteredLists)
    const isLoading = useSelector((state: any) => state.counter.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(checkAllList())
    }, []);

    useEffect(() => {
        let isFetching = true;
        async function fetch(){
            try{
                // @ts-ignore
                dispatch(fetchOnePageProduct(page))
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        !isFiltered && fetch()
    }, [page]);

    useEffect(() => {
        // @ts-ignore
        isFiltered && filteredList && dispatch(getItemsById(filteredList[page - 1]))
        console.log(filteredList)
    },[page, filteredList])

    useEffect(()=> {
        console.log('ssdfsdf')
        // @ts-ignore
        // dispatch(fetchOnePageProduct(page, filter))
        dispatch(getIdsByFilter(page, filter))
        dispatch(currentPage())
        // @ts-ignore
        if(!filter.product && !filter.price && !filter.brand){
            dispatch(setFiltered(false))
            dispatch(currentPage())
            // @ts-ignore
            dispatch(fetchOnePageProduct(page))
            // @ts-ignore
            dispatch(checkAllList())
        }
    },[filterSubmit])

    // useEffect(() => {
    //     // @ts-ignore
    //     list_id && dispatch(getItemsById(list_id))
    //     list_id && console.log('aaa',list_id)
    //     // @ts-ignore
    // }, [list_id]);

    return (<>
        <div className={PL_S.List_body}>
            {/*{list && list[0]}*/}
            {isLoading ?
                loadingData.loadingData.map((item, index) => (
                    <ProductCard key={index} data={item} counter={index}/>
                ))
            : listWithCardData && listWithCardData.map((item, index)=>(
                <ProductCard key={index} data={item} counter={index}/>
            ))
            }
        </div>
    </>)
}
