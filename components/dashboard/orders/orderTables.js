import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shadcnUi/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/shadcnUi/dropdown-menu";
import { Button } from "@/components/shadcnUi/button";
import { MoreHorizontal } from "lucide-react";

export function OrderTable({ orders, onDelete, getUserEmail }) {
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>User Email</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Order Date & Time</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.order_id}>
                            <TableCell>{order.order_id}</TableCell>
                            <TableCell>{getUserEmail(order.user_id)}</TableCell>
                            <TableCell>
                                <span className="text-sm font-medium">
                                    {order.order_status}
                                </span>
                            </TableCell>
                            <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                            <TableCell>{formatDate(order.order_date)}</TableCell>
                            <TableCell>
                                <span
                                    className={`text-sm ${order.payment.payment_status === "completed"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                        }`}
                                >
                                    {order.payment.payment_status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem
                                            onClick={() => alert(`Order ID: ${order.order_id}`)}
                                        >
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(order.order_id)}>
                                            Delete Order
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
