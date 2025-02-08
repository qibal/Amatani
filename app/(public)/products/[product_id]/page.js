import ProductDetailComponent from "@/components/public/customers/product/product_detail/ProductsDetail";

export default async function ProductDetail({ params }) {
    const { product_id } = await params;
    console.log("🚀 ~ ProductDetail ~ product_id:", product_id);

    if (product_id) {
        return <ProductDetailComponent product_id={product_id} />;
    }

    return <div>Product ID is missing</div>;
}
