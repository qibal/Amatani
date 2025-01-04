'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash, AlertCircle } from 'lucide-react';
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
    name: z.string().min(1, { message: 'Jangan lupa di isi' })
});

// Komponen Dialog Manage Categories
export default function ManageCategoryFaqDialog() {
    const [categories, setCategories] = useState([]);
    const [isAdding, startAdding] = useTransition(); // Untuk tombol Add
    const [isDeleting, startDeleting] = useTransition(); // Untuk tombol Delete
    const [pendingCategoryId, setPendingCategoryId] = useState(null); // ID kategori yang sedang dihapus
    const [showDeleteAlert, setShowDeleteAlert] = useState(false); // State untuk menampilkan notifikasi sukses hapus

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    // Tambah Kategori
    const onSubmit = (params) => {
        startAdding(async () => {
            try {
                const formData = new FormData();
                formData.append('name', params.name);

                const result = await fetch('/api/dashboard/faq/categories/insert', {
                    method: 'POST',
                    body: formData,
                });

                if (!result.ok) {
                    throw new Error('Failed to add category');
                }

                await result.json();
                fetchCategories();
                form.reset();
            } catch (error) {
                console.error('Error adding category:', error);
            }
        });
    };

    // Hapus Kategori
    const handleDeleteCategory = (categoryId) => {
        setPendingCategoryId(categoryId);
        startDeleting(async () => {
            try {
                const response = await fetch(`/api/dashboard/faq/categories/delete/${categoryId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }

                await response.json();
                fetchCategories();
                setShowDeleteAlert(true); // Tampilkan notifikasi
                setTimeout(() => setShowDeleteAlert(false), 5000); // Sembunyikan setelah 5 detik
            } catch (error) {
                console.error('Gagal menghapus kategori:', error);
            } finally {
                setPendingCategoryId(null);
            }
        });
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/dashboard/faq/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
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
                        <DialogTitle>Categories</DialogTitle>
                        <DialogDescription>
                            Add or delete categories FAQ.
                        </DialogDescription>
                    </AlertDialogHeader>

                    {/* Notifikasi Sukses Hapus */}
                    {showDeleteAlert && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>Category has been successfully deleted.</AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <div className="flex items-end space-x-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Create Category</FormLabel>
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
                            <div key={category.category_id} className="flex items-center justify-between p-2 border rounded-md">
                                <p className="text-sm">{category.name}</p>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-8 h-8 flex items-center justify-center"
                                            disabled={isDeleting && pendingCategoryId === category.category_id}
                                        >
                                            {isDeleting && pendingCategoryId === category.category_id ? (
                                                <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                                            ) : (
                                                <Trash className="w-4 h-4 text-red-500" />
                                            )}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. It will permanently delete the category.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteCategory(category.category_id)}>
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
