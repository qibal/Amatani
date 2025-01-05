import { useState, useMemo } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown, Check, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ColumnToggle } from './ColoumToggle'


export function UserTable({ users, onDelete, onEdit }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
    const [columns, setColumns] = useState([
        { key: 'avatar', label: 'Avatar', isVisible: true },
        { key: 'name', label: 'Name', isVisible: true },
        { key: 'email', label: 'Email', isVisible: true },
        { key: 'phone', label: 'Phone', isVisible: true },
        // { key: 'role', label: 'Role', isVisible: true },
        { key: 'verification', label: 'Verification', isVisible: true },
        { key: 'created_at', label: 'Created At', isVisible: true },
        { key: 'last_sign_in_at', label: 'Last Sign In', isVisible: true },
        { key: 'account_status', label: 'Status', isVisible: true },
    ])

    const toggleColumn = (columnKey) => {
        setColumns(columns.map(col =>
            col.key === columnKey ? { ...col, isVisible: !col.isVisible } : col
        ))
    }

    const visibleColumns = useMemo(() => columns.filter(col => col.isVisible), [columns])

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...users]
        if (sortConfig.key) {
            sortableUsers.sort((a, b) => {
                let aValue = a[sortConfig.key]
                let bValue = b[sortConfig.key]

                if (sortConfig.key === 'name') {
                    aValue = a.raw_user_meta_data.name
                    bValue = b.raw_user_meta_data.name
                }

                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1
                return 0
            })
        }
        return sortableUsers
    }, [users, sortConfig])

    const requestSort = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">User List</h2>
                <ColumnToggle columns={columns} toggleColumn={toggleColumn} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {visibleColumns.map((column) => (
                                <TableHead key={column.key}>
                                    {column.key !== 'avatar' && column.key !== 'verification' ? (
                                        <Button variant="ghost" onClick={() => requestSort(column.key)}>
                                            {column.label}
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    ) : (
                                        column.label
                                    )}
                                </TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow key={user.id}>
                                {columns.find(col => col.key === 'avatar')?.isVisible && (
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={user.raw_user_meta_data.avatar_url} alt={user.raw_user_meta_data.name} />
                                            <AvatarFallback>{user.raw_user_meta_data.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                )}
                                {columns.find(col => col.key === 'name')?.isVisible && (
                                    <TableCell>{user.raw_user_meta_data.name}</TableCell>
                                )}
                                {columns.find(col => col.key === 'email')?.isVisible && (
                                    <TableCell>{user.email}</TableCell>
                                )}
                                {columns.find(col => col.key === 'phone')?.isVisible && (
                                    <TableCell>{user.phone}</TableCell>
                                )}
                                {/* {columns.find(col => col.key === 'role')?.isVisible && (
                                    <TableCell>{user.role}</TableCell>
                                )} */}
                                {columns.find(col => col.key === 'verification')?.isVisible && (
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <Badge variant={user.raw_user_meta_data.email_verified ? "success" : ""} className={user.raw_user_meta_data.email_verified ? "" : "bg-rose-100 text-rose-600 hover:bg-rose-200 hover:text-rose-600"}>
                                                {user.raw_user_meta_data.email_verified ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                                                Email
                                            </Badge>
                                            <Badge variant={user.raw_user_meta_data.phone_verified ? "success" : ""} className={user.raw_user_meta_data.phone_verified ? "" : "bg-rose-100 text-rose-600 hover:bg-rose-200 hover:text-rose-600"}>
                                                {user.raw_user_meta_data.phone_verified ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                                                Phone
                                            </Badge>
                                        </div>
                                    </TableCell>
                                )}

                                {columns.find(col => col.key === 'created_at')?.isVisible && (
                                    <TableCell>{formatDate(user.created_at)}</TableCell>
                                )}
                                {columns.find(col => col.key === 'last_sign_in_at')?.isVisible && (
                                    <TableCell>{user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}</TableCell>
                                )}
                                {columns.find(col => col.key === 'account_status')?.isVisible && (
                                    <TableCell>
                                        <Badge variant={user.banned_until ? "destructive" : user.confirmed_at ? "success" : "warning"}>
                                            {user.banned_until ? "Banned" : user.confirmed_at ? "Confirmed" : "Unconfirmed"}
                                        </Badge>
                                    </TableCell>
                                )}
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
                                            <DropdownMenuItem onClick={() => onEdit(user.id)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => console.log('View details', user.id)}>View Details</DropdownMenuItem>
                                            {user.banned_until ? (
                                                <DropdownMenuItem onClick={() => console.log('Unban user', user.id)}>Unban User</DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem onClick={() => console.log('Ban user', user.id)}>Ban User</DropdownMenuItem>
                                            )}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onDelete(user.id)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

