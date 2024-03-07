import PC_S from '@/components/products/productsCard/ProductCardStyles.module.scss'
import {item} from "@/scripts/redux/slices/productsSlice";
import {useSelector} from "react-redux";
interface Props {
    data: item
    counter: number
}
export const ProductCard: React.FC<Props> = ({data, counter}) => {
    const isLoading = useSelector((state: any) => state.counter.isLoading)

    return (<>
        <div className={isLoading ? PC_S.Card_body_loading : PC_S.Card_body }>
            <div>
                <img src="https://w7.pngwing.com/pngs/933/965/png-transparent-computer-icons-camera-graphy-camera.png"
                     alt=""
                     width={100}
                />
            </div>
            <div className={PC_S.Card_text}>
                <span>{data.product}</span>
                <span>{data.brand}</span>
                <span>{data.price} руб.</span>
                {/*<span>{data.id}</span>*/}
            </div>

            {/*{counter}*/}
        </div>
    </>)
}
