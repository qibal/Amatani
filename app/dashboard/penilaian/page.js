import Image from 'next/image';
import Head from 'next/head';

export default function Penilaian() {
    return (
        <>
            <Head>
                <title>Website Sedang Dalam Pengembangan</title>
                <meta name="description" content="Website ini sedang dalam pengembangan. Kembali lagi nanti." />
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/FE/worker.svg"
                            alt="Worker SVG"
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Website Sedang Dalam Pengembangan
                    </h1>
                    <p className="text-gray-600">
                        Kami sedang bekerja keras untuk segera meluncurkan website ini. Silakan kembali lagi nanti!
                    </p>
                </div>
            </div>
        </>
    );
}