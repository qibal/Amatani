-- Tabel Categories
CREATE TABLE public.categories (
    category_id SERIAL NOT NULL,
    name_categories CHARACTER VARYING(50) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT categories_pkey PRIMARY KEY (category_id),
    CONSTRAINT categories_name_key UNIQUE (name_categories)
);

-- Tabel Products
CREATE TABLE public.products (
    product_id SERIAL NOT NULL,
    product_name CHARACTER VARYING(100) NOT NULL,
    description TEXT NULL,
    stock INTEGER NOT NULL,
    category_id INTEGER NULL, -- Ubah ke INTEGER
    created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NOW(),
    CONSTRAINT products_pkey PRIMARY KEY (product_id),
    CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories (category_id) ON UPDATE CASCADE
);

-- Tabel Product Price Variants
CREATE TABLE public.product_price_variants (
    price_variant_id SERIAL NOT NULL,
    product_id INTEGER NOT NULL, -- Ubah ke INTEGER
    min_quantity INTEGER NOT NULL,
    max_quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT product_price_variants_pkey PRIMARY KEY (price_variant_id),
    CONSTRAINT product_price_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products (product_id) ON UPDATE CASCADE,
    CONSTRAINT product_price_variants_check CHECK (
        (max_quantity IS NULL) OR (max_quantity >= min_quantity)
    ),
    CONSTRAINT product_price_variants_min_quantity_check CHECK (min_quantity > 0),
    CONSTRAINT product_price_variants_price_check CHECK (price > 0)
);

-- Tabel Product Images
CREATE TABLE public.product_images (
    image_id SERIAL NOT NULL,
    product_id INTEGER NOT NULL, -- Ubah ke INTEGER
    image_url CHARACTER VARYING(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT product_images_pkey PRIMARY KEY (image_id),
    CONSTRAINT product_images_image_url_key UNIQUE (image_url),
    CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products (product_id) ON UPDATE CASCADE
);

-- Tabel Carts
CREATE TABLE public.carts (
    cart_id SERIAL NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT carts_pkey PRIMARY KEY (cart_id),
    CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id)
);

-- Tabel Cart Items
CREATE TABLE public.cart_items (
    cart_item_id SERIAL NOT NULL,
    cart_id INTEGER NOT NULL, -- Ubah ke INTEGER
    product_id INTEGER NOT NULL, -- Ubah ke INTEGER
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT cart_items_pkey PRIMARY KEY (cart_item_id),
    CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts (cart_id) ON UPDATE CASCADE,
    CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products (product_id) ON UPDATE CASCADE
);

-- Tabel FAQ
CREATE TABLE public.faq (
    faq_id SERIAL NOT NULL,
    title CHARACTER VARYING(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT faq_pkey PRIMARY KEY (faq_id)
);
