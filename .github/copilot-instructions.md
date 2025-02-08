# .github/copilot-instructions.md

## Instruksi Umum

- **Teknologi:** Proyek ini menggunakan Next.js, React, JavaScript, Supabase, Tailwind CSS, Radix UI, React Hook Form, Zod, `postgres.js`, dan beberapa library lainnya seperti yang tercantum di `package.json`. Perhatikan teknologi ini saat memberikan saran kode.
- **Fokus:** Prioritaskan saran yang relevan dengan teknologi yang digunakan. Hindari menyarankan solusi yang tidak kompatibel atau tidak efisien dalam konteks ini.
- **Tidak Merubah Kode yang Tidak Diminta:** Jangan memodifikasi kode yang tidak secara spesifik diminta. Jika pengguna hanya meminta penambahan fitur X, jangan mengubah fitur Y yang sudah ada.
- **Mempertahankan Komentar:** Jangan menghapus komentar yang sudah ada dalam kode. Komentar penting untuk pemahaman kode.
- **Komentar Kode:** Setiap kode yang dihasilkan harus disertai komentar singkat yang menjelaskan fungsi dan cara kerjanya. Tujuannya adalah agar kode mudah dipahami.
- **Penanganan Error:** Gunakan `try...catch` block untuk menangani potensi error. Di dalam `catch` block, gunakan `console.error` atau mekanisme logging lain untuk mencatat error, sehingga memudahkan proses debugging. Contoh:

  ```javascript
  try {
    // Kode yang berpotensi menimbulkan error
    const result = await someFunction();
  } catch (error) {
    console.error("Terjadi kesalahan:", error); // Catat error untuk debugging
    // ... penanganan error lainnya ...
  }
  ```

- **Konsistensi:** Usahakan untuk menjaga konsistensi gaya penulisan kode, termasuk penamaan variabel, indentasi, dan format lainnya. Ikuti style guide yang umum untuk JavaScript dan React.
- **Kejelasan:** Utamakan kode yang mudah dibaca dan dipahami. Gunakan nama variabel yang deskriptif dan hindari kompleksitas yang tidak perlu.
- **Relevansi:** Pastikan saran kode yang diberikan relevan dengan konteks pertanyaan atau permintaan. Jangan memberikan saran yang terlalu umum atau tidak berhubungan.
- **Test:** Pertimbangkan untuk menyertakan contoh test (menggunakan Jest) untuk kode yang dihasilkan, terutama untuk fungsi-fungsi penting.
- **Supabase:** Jika berinteraksi dengan Supabase, gunakan library `@supabase/supabase-js` dan perhatikan praktik terbaik untuk keamanan dan efisiensi.
- **React Hook Form & Zod:** Jika berkaitan dengan form, gunakan React Hook Form untuk manajemen form dan Zod untuk validasi skema. Pastikan integrasi keduanya dilakukan dengan benar.
- **Tailwind CSS & Radix UI:** Perhatikan penggunaan Tailwind CSS untuk styling dan Radix UI untuk komponen-komponen UI. Saran kode sebaiknya memanfaatkan kedua library ini.
- **Next.js:** Perhatikan konvensi dan fitur-fitur Next.js, seperti server-side rendering (SSR), static site generation (SSG), dan API routes.
- **postgres.js:** Gunakan library `postgres.js` untuk berinteraksi dengan database PostgreSQL. Perhatikan praktik terbaik untuk keamanan dan performa saat menggunakan library ini.

## Contoh Penulisan API

Gunakan format berikut untuk penulisan API, meliputi:

- `try...catch` block untuk penanganan error
- Pesan error yang informatif
- Penggunaan parameter yang tepat
- Penggunaan query URL
- Penggunaan actions dengan `postgres.js`

```javascript
// use server
"use server";

import sql from "@/lib/postgres";

export async function GetFaqAction(req, params) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    let faqs;
    if (category) {
      faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                WHERE c.category_name ILIKE ${"%" + category + "%"}
                ORDER BY f.created_at DESC
            `;
    } else if (search) {
      faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                WHERE (f.title ILIKE ${"%" + search + "%"} OR f.content ILIKE ${"%" + search + "%"} OR c.category_name ILIKE ${"%" + category + "%"})
                ORDER BY f.created_at DESC
            `;
    } else {
      faqs = await sql`
                SELECT
                    f.faq_id,
                    f.title,
                    f.content,
                    c.category_id,
                    c.category_name,
                    f.created_at
                FROM faq f
                LEFT JOIN faq_category c ON f.category_id = c.category_id
                ORDER BY f.created_at DESC
            `;
    }
    return faqs;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return { error: "Failed to fetch FAQs", error };
  }
}

export async function GetFaqByIdAction(req, { params }) {
  try {
    const faq_id = params.faq_id;
    console.log("🚀 ~ GetFaqByIdAction ~ faq_id:", faq_id);
    const [faq] = await sql`
            SELECT
                f.faq_id,
                f.title,
                f.content,
                f.category_id,
                c.category_name,
                f.created_at
            FROM
                public.faq f
            LEFT JOIN
                public.faq_category c
            ON
                f.category_id = c.category_id
            WHERE
                f.faq_id = ${faq_id};
        `;
    return faq;
  } catch (error) {
    console.error("Error fetching FAQ for edit:", error);
    return { error: "Failed to fetch FAQ", error };
  }
}

export async function InsertFaqAction(req, { params }) {
  const formData = await req.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const category_id = formData.get("category_id");

  console.log("🚀 ~ POST ~ title:", title);
  console.log("🚀 ~ POST ~ content:", content);
  console.log("🚀 ~ POST ~ category_id:", category_id);

  try {
    const result = await sql.begin(async (sql) => {
      const [faq] = await sql`
                INSERT INTO faq (
                    title,
                    content,
                    category_id
                ) VALUES (
                    ${title},
                    ${content},
                    ${category_id}
                )
                RETURNING *;
            `;
      return faq;
    });
    return result;
  } catch (error) {
    console.error("Error inserting FAQ:", error);
    return { error: "Failed to insert FAQ", error };
  }
}

export async function DeleteFaqAction(req, { params }) {
  try {
    const faq_id = params.faq_id;
    console.log("🚀 ~ DeleteFaqAction ~ faq_id:", faq_id);

    const result = await sql`delete from faq where faq_id = ${faq_id} returning *`;
    return result;
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return { error: "Failed to delete FAQ", error };
  }
}

export async function UpdateFaqByIdAction(req, { params }) {
  const formData = await req.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const category_id = formData.get("category_id");
  const faq_id = params.faq_id;

  console.log("🚀 ~ POST ~ title:", title);
  console.log("🚀 ~ POST ~ content:", content);
  console.log("🚀 ~ POST ~ category_id:", category_id);
  console.log("🚀 ~ POST ~ faq_id:", faq_id);

  if (!title || !content || !category_id) {
    throw new Error("Invalid input: all fields are required");
  }
  if (!faq_id) {
    throw new Error("Invalid input: faq_id is required");
  }

  try {
    const result = await sql.begin(async (sql) => {
      const [updatedFaq] = await sql`
                UPDATE faq 
                SET 
                    title = ${title},
                    content = ${content},
                    category_id = ${category_id}
                WHERE 
                    faq_id = ${faq_id}
                RETURNING *
            `;
      console.log("Updated FAQ:", updatedFaq);
      return updatedFaq;
    });

    if (!result) {
      console.log("No FAQ updated");
      throw new Error("FAQ not found or not updated");
    }

    return result;
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return { error: "Failed to update FAQ", error };
  }
}
```

## Contoh Penggunaan di File Terpisah

```javascript
import { GetFaqAction, InsertFaqAction } from "@/app/actions/v2/dashboard/admin/faq/faqActions";

export async function GET(req, { params }) {
  try {
    const result = await GetFaqAction(req, { params });

    if (result) {
      return new Response(
        JSON.stringify({
          success: true,
          data: result,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No data found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const result = await InsertFaqAction(req, { params });

    if (result) {
      return new Response(
        JSON.stringify({
          success: true,
          data: result,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No data found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
```

berikut sql tabel prostgres saya

```sql
create table public.products (
  product_id uuid not null default gen_random_uuid (),
  products_name character varying not null,
  products_description character varying null,
  stock integer not null,
  categories_id uuid not null,
  created_at timestamp with time zone not null default now(),
  price_type public.price_type not null,
  constraint products_pkey primary key (product_id),
  constraint products_categories_id_fkey foreign KEY (categories_id) references categories (categories_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
create table public.wholesale_prices (
  wholesale_prices_id uuid not null default gen_random_uuid (),
  product_id uuid not null,
  min_quantity integer not null,
  max_quantity integer null,
  price numeric not null,
  created_at timestamp with time zone not null default now(),
  constraint product_wholesale_prices_pkey primary key (wholesale_prices_id),
  constraint product_wholesale_prices_product_id_fkey foreign KEY (product_id) references products (product_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
create table public.product_images (
  images_id uuid not null default gen_random_uuid (),
  product_id uuid not null,
  image_path character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint product_images_pkey primary key (images_id),
  constraint product_images_product_id_fkey foreign KEY (product_id) references products (product_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
create table public.fixed_prices (
  fixed_price_id uuid not null default gen_random_uuid (),
  product_id uuid not null,
  price numeric not null,
  created_at timestamp with time zone not null default now(),
  constraint fixed_price_pkey primary key (fixed_price_id),
  constraint fixed_price_product_id_fkey foreign KEY (product_id) references products (product_id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
create table public.categories (
  categories_id uuid not null default gen_random_uuid (),
  categories_name character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint categories_pkey primary key (categories_id),
  constraint categories_categories_name_key unique (categories_name)
) TABLESPACE pg_default;
```
