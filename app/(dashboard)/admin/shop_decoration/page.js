import CompanyLogo from '@/components/dashboard/shop_decoration/CompanyLogo'
import Service from '@/components/dashboard/shop_decoration/Service'

import Experience from '@/components/dashboard/shop_decoration/Experience'
import KategoriPangan from '@/components/dashboard/shop_decoration/KategoriPangan'

export default function ShopDecoration() {
    return (

        <div className="space-y-6 p-6 w-full">
            <Experience />
            <CompanyLogo />
            <Service />
            {/* <KategoriPangan /> */}
            {/* <MediaSocial /> */}
        </div>

    )
}

