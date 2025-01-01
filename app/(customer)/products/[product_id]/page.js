
import ProductDetailComponent from "@/components/customer/product/product_detail/ProductsDetail"


export default async function ProductDetail({ params }) {
    const product_id = await params.product_id;
    console.log("🚀 ~ ProductDetail ~ product_id:", product_id)
    if (product_id) {
        return (
            <ProductDetailComponent product_id={product_id} />
        );
    }
}

