'use client';

import { useEffect, useState, useTransition, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toaster, toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import CompanyLogosPreview from './previewcomponent/CompanyLogoPreview';

const formSchema = z.object({
    logo: z.any().refine((file) => file?.length > 0, "Logo harus diupload"),
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
    const fileInputRef = useRef(null);

    const fetchCompanyLogos = async () => {
        try {
            const response = await fetch('/api/dashboard/shop_decoration/company_logos');
            if (!response.ok) {
                throw new Error('Failed to fetch company logos');
            }
            const data = await response.json();
            setLogos(data);
        } catch (error) {
            console.error('Error fetching company logos:', error);
        }
    };

    const handleDelete = async (id) => {
        const toastId = "delete-logo-toast"; // ID unik untuk toast ini

        startDeleteTransition(async () => {
            try {
                const response = await fetch(`/api/dashboard/shop_decoration/company_logos/${id}`, {
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

                // Mengirim data ke API
                const response = await fetch('/api/dashboard/shop_decoration/company_logos', {
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
                    description: "Logo perusahaan telah berhasil diperbarui.",
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
            } catch (error) {
                console.error('Error submitting form:', error);

                // Tampilkan atau perbarui toast jika gagal
                toast.error("Gagal menyimpan data", {
                    id: toastId,
                    description: "Terjadi kesalahan saat menyimpan data.",
                    duration: 5000,
                });
            }
        });
    };

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
                                                                <div key={logo.id} className="flex items-center justify-between p-2 border rounded-lg">
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
                                                                                {isDeleting ? 'Menghapus...' : 'Hapus'}
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
                                                                                <AlertDialogAction onClick={() => handleDelete(logo.id)} disabled={isDeleting}>
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
                                            {isPending ? 'Menyimpan...' : 'Simpan'}
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
                                                        accept="image/*"
                                                        onChange={(e) => field.onChange(e.target.files)}
                                                        ref={fileInputRef}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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