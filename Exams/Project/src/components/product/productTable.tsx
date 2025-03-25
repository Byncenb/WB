import { SnippetInfo } from "../../types/types";

type ProductTableProps = {
    product: SnippetInfo;
};

function ProductTable({ product }: ProductTableProps) {
    return (
        <table className="product__table">
            <tbody>
                {product.brand && (
                    <tr>
                        <td>Бренд</td>
                        <td>{product.brand}</td>
                    </tr>
                )}
                {product.composition && (
                    <tr>
                        <td>Состав</td>
                        <td>{product.composition}</td>
                    </tr>
                )}
                {product.size && (
                    <tr>
                        <td>Габариты</td>
                        <td>{product.size}</td>
                    </tr>
                )}
                {product.details && (
                    <tr>
                        <td>Детали</td>
                        <td>{product.details}</td>
                    </tr>
                )}
                {product.temperature && (
                    <tr>
                        <td>Температура</td>
                        <td>{product.temperature}</td>
                    </tr>
                )}
                {product.productionCountry && (
                    <tr>
                        <td>Страна производства</td>
                        <td>{product.productionCountry}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ProductTable;