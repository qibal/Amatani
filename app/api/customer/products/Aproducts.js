import supabase from "@/lib/supabase";

// Function to fetch products
export async function GetProducts() {
    const { data, error } = await supabase
        .from("tes")
        .select('*');

    if (error) {
        console.error("Error fetching products:", error);
        return null; // Mengembalikan null jika terjadi error
    }

    return data; // Mengembalikan data jika berhasil
}
