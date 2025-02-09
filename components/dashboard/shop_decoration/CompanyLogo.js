'use client';

import { useEffect, useState, useTransition, useRef, useCallback } from 'react';
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
import CompanyLogosPreview from './previewcomponent/CompanyLogoPreview';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/shadcnUi/progress';

const formSchema = z.object({
    logo: z.any().refine((file) => {
        if (!file || file.length === 0) return false;
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        return acceptedFormats.includes(file[0].type);
    }, "Format gambar harus PNG, JPG, JPEG, atau WEBP").refine((file) => {
        if (!file || file.length === 0) return false;
        return file[0].size <= 2 * 1024 * 1024; // 2MB
    }, "Ukuran gambar harus kurang dari 2MB"),
});

export default function CompanyLogo() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            logo: null,
        },
    });

    const [logos, setLogos] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [refreshPreview, setRefreshPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const fetchCompanyLogos = async () => {
        try {
            const response = await fetch('/api/v2/admin/sd/company_logos');
            if (!response.ok) {
                throw new Error('Failed to fetch company logos');
            }
            const data = await response.json();
            setLogos(data.data);
        } catch (error) {
            console.error('Error fetching company logos:', error);
        }
    };

    const handleDelete = async (cp_id) => {
        const toastId = "delete-logo-toast"; // ID unik untuk toast ini

        startDeleteTransition(async () => {
            try {
                const response = await fetch(`/api/v2/admin/sd/company_logos/${cp_id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete company logo');
                }

                const result = await response.json();
                console.log('Company logo deleted successfully:', result);

                // Tampilkan atau perbarui toast jika berhasil
                toast.success("Logo berhasil dihapus!", {
                    id: toastId,
                    description: "Logo perusahaan telah berhasil dihapus.",
                    duration: 5000,
                });

                // Fetch logos again to update the list
                fetchCompanyLogos();
                setRefreshPreview(prev => !prev); // Trigger refresh for CompanyLogosPreview
            } catch (error) {
                console.error('Error deleting company logo:', error);

                // Tampilkan atau perbarui toast jika gagal
                toast.error("Gagal menghapus logo", {
                    id: toastId,
                    description: "Terjadi kesalahan saat menghapus logo.",
                    duration: 5000,
                });
            }
        });
    };

    useEffect(() => {
        fetchCompanyLogos();
    }, []);

    const onSubmit = async (data) => {
        const toastId = "company-logo-toast"; // ID unik untuk toast ini

        startTransition(async () => {
            try {
                // Membuat FormData untuk data yang akan dikirim
                const formData = new FormData();
                formData.append('logo', data.logo[0]);

                setIsLoading(true);
                setProgress(0);

                // Mengirim data ke API
                const response = await fetch('/api/v2/admin/sd/company_logos', {
                    method: 'POST',
                    body: formData,
                    duplex: 'half', // Add duplex option
                });

                if (!response.ok) {
                    throw new Error('Failed to insert company logo');
                }

                const result = await response.json();
                console.log('Company logo inserted successfully:', result);

                // Tampilkan atau perbarui toast jika berhasil
                toast.success("Data berhasil disimpan!", {
                    id: toastId,
                    description: "Logo perusahaan telah berhasil ditambah",
                    duration: 5000,
                });

                // Reset form jika berhasil
                form.reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = null; // Reset file input
                }

                // Fetch logos again to update the list
                fetchCompanyLogos();
                setRefreshPreview(prev => !prev); // Trigger refresh for CompanyLogosPreview
                setPreview(null);
                setIsLoading(false);
            } catch (error) {
                console.error('Error submitting form:', error);

                // Tampilkan atau perbarui toast jika gagal
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
                                    <h1 className="text-xl font-semibold">Company Logos</h1>
                                    <div className="flex gap-3">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">Kelola</Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Kelola Logo Perusahaan</SheetTitle>
                                                </SheetHeader>
                                                <ScrollArea className="h-full">
                                                    <div className="p-4">
                                                        <div className="grid grid-cols-1 gap-4">
                                                            {logos.map((logo) => (
                                                                <div key={logo.cp_id} className="flex items-center justify-between p-2 border rounded-lg">
                                                                    <div className="flex items-center">
                                                                        <Image
                                                                            src={`https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/${logo.image_path}`}
                                                                            alt="Company Logo"
                                                                            width={100}
                                                                            height={100}
                                                                            className="object-cover rounded-lg"
                                                                        />
                                                                    </div>
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
                                                                                    Apakah Anda yakin ingin menghapus logo ini?
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                                <AlertDialogAction onClick={() => handleDelete(logo.cp_id)} disabled={isDeleting}>
                                                                                    {isDeleting ? 'Menghapus...' : 'Hapus'}
                                                                                </AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>
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
                                        name="logo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Logo</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                        </form>
                    </Form>
                </div>

                {/* Preview Section */}
                <div className="w-3/5 flex justify-center items-center p-6">
                    <div className="w-full max-w-4xl">
                        <CompanyLogosPreview refresh={refreshPreview} />
                    </div>
                </div>
            </div>
        </div>
    );
}