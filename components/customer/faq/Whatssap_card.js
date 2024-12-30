import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone } from 'lucide-react'

const whatsappNumbers = [
    { name: "Layanan Pelanggan", number: "6281234567890" },
    { name: "Dukungan Teknis", number: "6289876543210" },
    { name: "Penjualan", number: "6287654321098" }
]

export default function WhatsappCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {whatsappNumbers.map((item, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>Hubungi kami melalui WhatsApp</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full"
                            onClick={() => window.open(`https://wa.me/${item.number}`, '_blank')}
                        >
                            <Phone className="mr-2 h-4 w-4" /> Hubungi via WhatsApp
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

