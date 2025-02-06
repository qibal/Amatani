'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/shadcnUi/input";
import { Button } from "@/components/shadcnUi/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcnUi/form";
import { Toaster, toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/shadcnUi/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcnUi/alert-dialog";
import { ScrollArea } from "@/components/shadcnUi/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcnUi/select';
import Image from "next/image";
import HomeKPanganPreview from './previewcomponent/KategoriPanganPreview';
import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/shadcnUi/progress';

const formSchema = z.object({
    category: z.string().min(1, { message: "Tidak boleh kosong" }),
    categoryImage: z.any().refine((file) => {
        if (!file || file.length === 0) return false;
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        return acceptedFormats.includes(file[0].type);
    }, "Format gambar harus PNG, JPG, JPEG, atau WEBP").refine((file) => {
        if (!file || file.length === 0) return false;
        return file[0].size <= 2 * 1024 * 1024; // 2MB
    }, "Ukuran gambar harus kurang dari 2MB"),
});

export default function KategoriPangan() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
            categoryImage: null,
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [lpCategoriesPangan, setLpCategoriesPangan] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [refreshPreview, setRefreshPreview] = useState(false);
    const fileInputRef = useRef(null);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/dashboard/products/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchLpCategoriesPangan = async () => {
        try {
            const response = await fetch('/api/dashboard/shop_decoration/kategori_pangan');
            if (!response.ok) {
                throw new Error('Failed to fetch lp categories pangan');
            }
            const data = await response.json();
            setLpCategoriesPangan(data);
        } catch (error) {
            console.error('Error fetching lp categories pangan:', error);
        }
    };

    const handleDelete = async (id) => {
        startDeleteTransition(async () => {
            try {
                const response = await fetch(`/api/dashboard/shop_decoration/kategori_pangan/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }

                const result = await response.json();
                console.log('Category deleted successfully:', result);

                toast.success("Kategori berhasil dihapus!", {
                    description: "Kategori telah berhasil dihapus.",
                    duration: 5000,
                });

                fetchLpCategoriesPangan();
                setRefreshPreview(prev => !prev); // Trigger refresh for HomeKPanganPreview
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error("Gagal menghapus kategori", {
                    description: "Terjadi kesalahan saat menghapus kategori.",
                    duration: 5000,
                });
            }
        });
    };

    useEffect(() => {
        fetchCategories();
        fetchLpCategoriesPangan();
    }, []);

    const onSubmit = async (data) => {
        const toastId = "kategori-toast"; // ID unik untuk toast ini

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append('category', data.category);
                formData.append('categoryImage', data.categoryImage[0]);

                setIsLoading(true);
                setProgress(0);

                const response = await fetch('/api/dashboard/shop_decoration/kategori_pangan', {
                    method: 'POST',
                    body: formData,
                    duplex: 'half', // Add duplex option
                });

                if (!response.ok) {
                    throw new Error('Failed to insert category');
                }

                const result = await response.json();
                console.log('Category inserted successfully:', result);

                toast.success("Data berhasil disimpan!", {
                    id: toastId,
                    description: "Kategori telah berhasil diperbarui.",
                    duration: 5000,
                });

                form.reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = null; // Reset file input
                }

                fetchLpCategoriesPangan();
                setRefreshPreview(prev => !prev); // Trigger refresh for HomeKPanganPreview
                setPreview(null);
                setIsLoading(false);
            } catch (error) {
                console.error('Error submitting form:', error);
                toast.error("Gagal menyimpan data", {
                    id: toastId,
                    description: "Terjadi kesalahan saat menyimpan data.",
                    duration: 5000,
                });
                setIsLoading(false);
            }
        });
    };
    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            form.setValue('categoryImage', e.target.files);
        }
    }, [form]);
    return (
        <div className="flex">
            {/* Combined Form and Preview Section */}
            <div className="flex gap-6 w-full rounded-lg overflow-hidden">
                {/* Form Section */}
                <div className="w-2/5 p-6">
                    <Toaster position="top-right" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <div className="flex justify-between items-center pb-4">
                                    <h1 className="text-xl font-semibold">Kategori Pangan</h1>
                                    <div className="flex gap-3">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">Kelola</Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Kelola Kategori Pangan</SheetTitle>
                                                </SheetHeader>
                                                <ScrollArea className="h-full">
                                                    <div className="p-4">
                                                        <div className="grid grid-cols-1 gap-4">
                                                            {lpCategoriesPangan.map((category) => (
                                                                <div key={category.id_categories_pangan} className="grid grid-cols-3 items-center justify-between p-2 border rounded-lg">
                                                                    <div className="flex items-center">
                                                                        <Image
                                                                            src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${category.image_path}`}
                                                                            alt="Kategori Image"
                                                                            width={100}
                                                                            height={100}
                                                                            className="object-cover rounded-lg"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="ml-4">{category.categories_name}</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-end">
                                                                        <AlertDialog>
                                                                            <AlertDialogTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    className="ml-4"
                                                                                    disabled={isDeleting}
                                                                                >
                                                                                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Hapus'}
                                                                                </Button>
                                                                            </AlertDialogTrigger>
                                                                            <AlertDialogContent>
                                                                                <AlertDialogHeader>
                                                                                    <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                                                                    <AlertDialogDescription>
                                                                                        Apakah Anda yakin ingin menghapus kategori ini?
                                                                                    </AlertDialogDescription>
                                                                                </AlertDialogHeader>
                                                                                <AlertDialogFooter>
                                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                                    <AlertDialogAction onClick={() => handleDelete(category.id_categories_pangan)} disabled={isDeleting}>
                                                                                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Hapus'}
                                                                                    </AlertDialogAction>
                                                                                </AlertDialogFooter>
                                                                            </AlertDialogContent>
                                                                        </AlertDialog>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </ScrollArea>
                                            </SheetContent>
                                        </Sheet>
                                        <Button
                                            type="submit"
                                            className={`bg-rose-600 hover:bg-rose-500 ${isPending ? 'cursor-not-allowed' : ''}`}
                                            disabled={isPending}
                                        >
                                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Simpan'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pilih Kategori</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Kategori" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category.categories_id} value={category.categories_id}>
                                                                {category.categories_name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="categoryImage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {isLoading && (
                                        <div className="mt-4">
                                            <Progress value={progress} className="w-full" />
                                            <p className="text-sm text-gray-500 mt-2">Mengunggah gambar: {Math.round(progress)}%</p>
                                        </div>
                                    )}
                                    {preview && (
                                        <div className="mt-4">
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                width={200}
                                                height={200}
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Preview Section */}

                <div className="w-3/5 flex justify-center items-center p-">
                    <div className="w-full max-w-4xl">
                        <HomeKPanganPreview refresh={refreshPreview} />
                    </div>
                </div>
            </div>
        </div>
    );
}