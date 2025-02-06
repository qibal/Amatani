"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shadcnUi/card"
import Image from "next/image"

const transactions = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        amount: "+$1,999.00",
        avatar: "/FE/img02.png", // Link avatar placeholder
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        amount: "+$39.00",
        avatar: "/FE/img02.png",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        amount: "+$299.00",
        avatar: "/FE/img02.png",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        amount: "+$99.00",
        avatar: "/FE/img02.png",
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        amount: "+$39.00",
        avatar: "/FE/img02.png",
    },
]

export default function RecentSalesCard() {
    return (
        <Card className="w-full mx-auto  lg:col-span-1">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>



                <ul className="space-y-4">
                    {transactions.map((transaction, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Image
                                    width={200}
                                    height={200}
                                    src={transaction.avatar}
                                    alt={transaction.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="text-sm font-medium leading-none">{transaction.name}</p>
                                    <p className="text-xs text-muted-foreground">{transaction.email}</p>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-foreground">{transaction.amount}</div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
