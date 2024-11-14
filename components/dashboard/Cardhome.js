import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cardhome({ title, value, change, icon }) {
    return (
        <Card className="shadow-sm border border-gray-200 w-full col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{title}</span>
                    <span>{icon}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-gray-500">{change}</div>
            </CardContent>
        </Card>
    );
}
