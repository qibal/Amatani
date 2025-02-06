"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcnUi/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/shadcnUi/chart"

// Data penjualan harian dari Senin hingga Minggu
const chartData = [
    { day: "Monday", sales: 120 },
    { day: "Tuesday", sales: 150 },
    { day: "Wednesday", sales: 170 },
    { day: "Thursday", sales: 130 },
    { day: "Friday", sales: 190 },
    { day: "Saturday", sales: 220 },
    { day: "Sunday", sales: 200 },
]

const chartConfig = {
    sales: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
    },
}

export default function WSchart() {
    return (
        <Card className="w-full lg:col-span-2">
            <CardHeader>
                <CardTitle>Weekly Sales</CardTitle>
                <CardDescription>Sales data from Monday to Sunday</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        data={chartData}
                        width="100%"
                        height={300} // Tinggi chart tetap, tapi lebar akan mengikuti kontainer
                        margin={{
                            top: 50,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)} // Menampilkan singkatan hari
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total sales for the last 7 days
                </div>
            </CardFooter>
        </Card>
    )
}
