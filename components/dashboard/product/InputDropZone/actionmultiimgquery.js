import { createClient } from '@supabase/supabase-js'

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY')

async function saveProductWithImages(productData, images) {
    // Insert product data
    const { data: product, error: productError } = await supabase
        .from('products')
        .insert(productData)
        .single()

    if (productError) {
        throw new Error('Failed to insert product')
    }

    // Insert images for the product
    const imageInsertions = images.map(imageData => ({
        product_id: product.id, // Assuming `id` is the primary key of the `products` table
        image_url: imageData // Assuming you upload to a storage bucket and get a URL
    }))

    const { error: imageError } = await supabase
        .from('product_images')
        .insert(imageInsertions)

    if (imageError) {
        throw new Error('Failed to insert images')
    }

    return { product, images: imageInsertions }
}
