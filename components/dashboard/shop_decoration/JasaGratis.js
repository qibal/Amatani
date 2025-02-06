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
import Image from "next/image";
import JasaGratisPreview from './previewcomponent/JasaGratisPreview';
import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/shadcnUi/progress';

const formSchema = z.object({
    companyName: z.string().min(1, { message: "Tidak boleh kosong" }),
    logo: z.any().refine((file) => {
        if (!file || file.length === 0) return false;
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        return acceptedFormats.includes(file[0].type);
    }, "Format gambar harus PNG, JPG, JPEG, atau WEBP").refine((file) => {
        if (!file || file.length === 0) return false;
        return file[0].size <= 2 * 1024 * 1024; // 2MB
    }, "Ukuran gambar harus kurang dari 2MB"),
});

export default function JasaGratis() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            logo: null,
        },
    });

    const [isPending, startTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [refreshPreview, setRefreshPreview] = useState(false);
    const [jasaList, setJasaList] = useState([]);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState(null);
    const fetchJasaList = async () => {
        try {
            const response = await fetch('/api/dashboard/shop_decoration/jasa');
            if (!response.ok) {
                throw new Error('Failed to fetch jasa list');
            }
            const data = await response.json();
            setJasaList(data);
        } catch (error) {
            console.error('Error fetching jasa list:', error);
        }
    };

    const handleDelete = async (id) => {
        const toastId = "delete-jasa-toast"; // ID unik untuk toast ini

        startDeleteTransition(async () => {
            try {
                const response = await fetch(`/api/dashboard/shop_decoration/jasa/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete jasa');
                }

                const result = await response.json();
                console.log('Jasa deleted successfully:', result);

                // Tampilkan atau perbarui toast jika berhasil
                toast.success("Jasa berhasil dihapus!", {
                    id: toastId,
                    description: "Jasa telah berhasil dihapus.",
                    duration: 5000,
                });

                // Fetch jasa list again to update the list
                fetchJasaList();
                setRefreshPreview(prev => !prev); // Trigger refresh for JasaGratisPreview
            } catch (error) {
                console.error('Error deleting jasa:', error);

                // Tampilkan atau perbarui toast jika gagal
                toast.error("Gagal menghapus jasa", {
                    id: toastId,
                    description: "Terjadi kesalahan saat menghapus jasa.",
                    duration: 5000,
                });
            }
        });
    };

    useEffect(() => {
        fetchJasaList();
    }, []);

    const onSubmit = async (data) => {
        const toastId = "jasa-toast"; // ID unik untuk toast ini

        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append('companyName', data.companyName);
                formData.append('logo', data.logo[0]);

                setIsLoading(true);
                setProgress(0);

                const response = await fetch('/api/dashboard/shop_decoration/jasa', {
                    method: 'POST',
                    body: formData,
                    duplex: 'half', // Add duplex option
                });

                if (!response.ok) {
                    throw new Error('Failed to insert jasa');
                }

                const result = await response.json();
                console.log('Jasa inserted successfully:', result);

                toast.success("Data berhasil disimpan!", {
                    id: toastId,
                    description: "Jasa telah berhasil diperbarui.",
                    duration: 5000,
                });

                form.reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = null; // Reset file input
                }

                fetchJasaList();
                setRefreshPreview(prev => !prev); // Trigger refresh for JasaGratisPreview
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
            form.setValue('logo', e.target.files);
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
                                    <h1 className="text-xl font-semibold">Jasa Gratis</h1>
                                    <div className="flex gap-3">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">Kelola</Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Kelola Jasa</SheetTitle>
                                                </SheetHeader>
                                                <ScrollArea className="h-full">
                                                    <div className="p-4">
                                                        <div className="grid grid-cols-1 gap-4">
                                                            {jasaList.map((jasa) => (
                                                                <div key={jasa.id_jasa} className="grid grid-cols-3 items-center justify-between p-2 border rounded-lg">
                                                                    <div className="flex items-center">
                                                                        <Image
                                                                            src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${jasa.image_path}`}
                                                                            alt="Jasa Logo"
                                                                            width={100}
                                                                            height={100}
                                                                            className="object-cover rounded-lg"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="ml-4">{jasa.jasa_name}</span>
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
                                                                                        Apakah Anda yakin ingin menghapus jasa ini?
                                                                                    </AlertDialogDescription>
                                                                                </AlertDialogHeader>
                                                                                <AlertDialogFooter>
                                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                                    <AlertDialogAction onClick={() => handleDelete(jasa.id_jasa)} disabled={isDeleting}>
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
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nama Jasa</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Masukkan nama Jasa" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="logo"
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
                <div className="w-3/5 flex justify-center items-center">
                    <div className="w-full max-w-4xl">
                        <JasaGratisPreview refresh={refreshPreview} />
                    </div>
                </div>
            </div>
        </div>
    );
}