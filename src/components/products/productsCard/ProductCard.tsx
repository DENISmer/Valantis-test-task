import PC_S from '@/components/products/productsCard/ProductCardStyles.module.scss'
import {item} from "@/scripts/redux/slices/productsSlice";
interface Props {
    data: item
}
export const ProductCard: React.FC<Props> = ({data}) => {

    return (<>
        <div className={PC_S.Card_body}>
            <span>{data.product}</span>
            <span>{data.brand}</span>
            <span>{data.price}</span>
            <span>{data.id}</span>
            card body
        </div>
    </>)
}