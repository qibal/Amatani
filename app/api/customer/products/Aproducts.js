import supabase from "@/lib/supabase";

// Function to fetch products
export async function GetProducts() {
    const { data, error } = await supabase
        .from("products")
        .select(`
        product_id,
        product_name,
        product_description,
        product_images (
            image_id,
            image_url
        ),
        product_price_variants (
            price_variant_id,
            min_quantity,
            max_quantity,
            price
        )
        `);

    if (error) {
        console.error("Error fetching products:", error);
        return null; // Mengembalikan null jika terjadi error
    }

    return data; // Mengembalikan data jika berhasil
}
