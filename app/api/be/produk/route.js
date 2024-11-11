import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export async function POST(req) {
    try {
        const data = await req.json();
        console.log("🚀 ~ POST ~ data:", data)
        const namaProduk = data.nama_produk;
        console.log("🚀 ~ POST ~ namaProduk:", namaProduk)


        const promise = databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_APPWRITE_ID,
            process.env.NEXT_PUBLIC_COLLECTION_PRODUK_ID,
            ID.unique(),
            { "nama_produk": namaProduk }
        );

        if (!promise) {
            return Response.json({ error: "Nama produk is required" }, { status: 400 });
        }


        return Response.json({ message: "berhasil bossss" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        const promise = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_APPWRITE_ID,
            process.env.NEXT_PUBLIC_COLLECTION_PRODUK_ID,
        );

        return Response.json(promise, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}