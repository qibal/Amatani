'use client';

import { Toaster, toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash } from 'lucide-react';
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

const formSchema = z.object({
    name: z.string().min(1, { message: 'Jangan lupa di isi' })
});

export default function ManageCategoryFaqDialog() {
    const [categories, setCategories] = useState([]);
    const [isAdding, startAdding] = useTransition();
    const [isDeleting, startDeleting] = useTransition();
    const [pendingCategoryId, setPendingCategoryId] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/dashboard/faq/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

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
                toast("Category added successfully", {
                    duration: 5000,
                    description: `The category "${params.name}" has been added.`,
                });
            } catch (error) {
                console.error('Error adding category:', error);
                toast("Failed to add category", {
                    duration: 5000,
                    description: "An error occurred while adding the category.",
                });
            }
        });
    };

    const handleDeleteCategory = (categoryId, categoryName) => {
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
                toast("Category deleted successfully", {
                    duration: 5000,
                    description: `The category "${categoryName}" has been deleted.`,
                });
            } catch (error) {
                console.error('Failed to delete category:', error);
                toast("Failed to delete category", {
                    duration: 5000,
                    description: "An error occurred while deleting the category.",
                });
            } finally {
                setPendingCategoryId(null);
            }
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <Toaster position="top-right" />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                        Manage Categories
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Categories</DialogTitle>
                    <DialogDescription>Add or delete categories FAQ.</DialogDescription>

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

                    {/* Daftar Kategori dengan ScrollArea */}
                    <h3 className="font-medium text-sm">Manage Categories ({categories.length})</h3>
                    <ScrollArea className="max-h-72 border rounded-md p-2 mt-2">
                        <div className="space-y-2"> {/* Tambahkan class ini */}
                            {categories.map((category) => (
                                <div
                                    key={category.category_id}
                                    className="flex items-center justify-between p-2 border rounded-md"
                                >
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
                                                <AlertDialogAction
                                                    onClick={() => handleDeleteCategory(category.category_id, category.name)}
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
}

