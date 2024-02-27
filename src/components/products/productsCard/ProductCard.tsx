import PC_S from '@/components/products/productsCard/ProductCardStyles.module.scss'
export const ProductCard: React.FC = () => {
    return (<>
        <div className={PC_S.Card_body}>
            <span>ids</span>
            <span>cost</span>
            <span>name</span>
            <span>smth</span>
            card body
        </div>
    </>)
}