import CompanyLogo from '@/components/dashboard/shop_decoration/CompanyLogo'
import JasaGratis from '@/components/dashboard/shop_decoration/JasaGratis'
import KategoriPangan from '@/components/dashboard/shop_decoration/KategoriPangan'
import MediaSocial from '@/components/dashboard/shop_decoration/MediaSocial'
import Statik from '@/components/dashboard/shop_decoration/Statik'

export default function ShopDecoration() {
    return (
        <div className="container mx-auto p-6">
            <div className="space-y-6">
                <Statik />
                <CompanyLogo />
                <JasaGratis />
                <KategoriPangan />
                <MediaSocial />
            </div>
        </div>
    )
}

