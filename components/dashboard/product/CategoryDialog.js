'use client'

import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formschema = z.object({
    categories_name: z.string().min(1, { message: 'Jangan lupa di isi' })
})

// Komponen Dialog Manage Categories
export default function ManageCategoriesDialog() {
    const [categories, setCategories] = useState([]);
    const [isAdding, startAdding] = useTransition(); // Untuk tombol Add
    const [isDeleting, startDeleting] = useTransition(); // Untuk tombol Delete
    const [pendingCategoryId, setPendingCategoryId] = useState(null); // ID kategori yang sedang dihapus

    const form = useForm({
        resolver: zodResolver(formschema),
        defaultValues: {
            categories_name: "",
        },
    });

    // Tambah Kategori
    const onSubmit = async (params) => {
        startAdding(async () => {
            try {
                console.log('berhasil input data', params);

                const formData = new FormData();
                formData.append('category_name', params.categories_name);

                const result = await fetch('/api/dashboard/products/categories/insert', {
                    method: 'POST',
                    body: formData,
                });
                const data = await result.json();
                fetchCategories();
                form.reset();
                console.log('berhasil input data', data);
            } catch (error) {
                console.error('Error adding category:', error);
            }
        });
    };

    // Hapus Kategori
    const handleDeleteCategory = (categoryId) => {
        setPendingCategoryId(categoryId); // Set ID kategori yang sedang dihapus
        startDeleting(async () => {
            try {
                const response = await fetch(`/api/dashboard/products/categories/delete/${categoryId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                fetchCategories(); // Refresh daftar kategori
                console.log('Berhasil hapus kategori:', data);
            } catch (error) {
                console.error('Gagal menghapus kategori:', error);
            } finally {
                setPendingCategoryId(null); // Reset ID kategori setelah selesai
            }
        });
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/dashboard/products/categories');
            const data = await response.json();
            console.log('categories =', data);
            setCategories(data); // Simpan data produk ke dalam state
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                        Manage Categories
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <AlertDialogHeader>
                        <DialogTitle>Manage Your Categories</DialogTitle>
                        <DialogDescription>
                            Add or delete categories your products.
                        </DialogDescription>
                    </AlertDialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <div className="flex items-end space-x-2">
                                <FormField
                                    control={form.control}
                                    name="categories_name"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="">Category Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter category name"
                                                    {...field}
                                                    className="h-10"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Tombol Tambah Kategori */}
                                <Button type="submit" className="bg-red-600 hover:bg-rose-500 h-10" disabled={isAdding}>
                                    {isAdding ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Plus className="w-4 h-4 mr-2" />
                                    )}
                                    {isAdding ? 'Adding...' : 'Add'}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {/* Daftar Kategori */}
                    <div className="mt-4 space-y-2">
                        <h3 className="font-medium text-sm">Manage Categories ({categories.length})</h3>
                        {categories.map((category) => (
                            <div key={category.categories_id} className="flex items-center justify-between p-2 border rounded-md">
                                <p className="text-sm">{category.categories_name}</p>
                                <Button
                                    variant="outline"
                                    className="w-8 h-8 flex items-center justify-center"
                                    onClick={() => handleDeleteCategory(category.categories_id)}
                                    disabled={isDeleting && pendingCategoryId === category.categories_id} // Gunakan isDeleting
                                >
                                    {isDeleting && pendingCategoryId === category.categories_id ? (
                                        <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                                    ) : (
                                        <Trash className="w-4 h-4 text-red-500" />
                                    )}
                                </Button>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
