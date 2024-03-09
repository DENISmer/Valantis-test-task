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

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(checkAllList(null))
    }, []);

    useEffect(() => {
        async function fetch(){
            try{
                dispatch(fetchOnePageProduct(page))
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        !isFiltered && fetch()

    }, [page]);

    useEffect(() => {
        isFiltered && filteredList && dispatch(getItemsById(filteredList[page - 1]))
    },[page, filteredList])

    useEffect(()=> {
        dispatch(getIdsByFilter(page, filter))
        dispatch(currentPage())

        if(!filter.product && !filter.price && !filter.brand){

            dispatch(setFiltered(false))
            dispatch(currentPage())

            dispatch(fetchOnePageProduct(page))
            dispatch(checkAllList(list_id))
        }
    },[filterSubmit])

    return (<>
        <div className={PL_S.List_body}>
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
