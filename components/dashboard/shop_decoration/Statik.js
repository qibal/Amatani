'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toaster, toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import StatikPreview from './previewcomponent/StatikPreview';

const formSchema = z.object({
    number: z
        .number({ invalid_type_error: "Harus berupa angka" })
        .min(1, { message: "Nilai harus lebih dari 0" }),
    description: z.string().min(1, { message: "Deskripsi tidak boleh kosong" }),
});

export default function Statik() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number: 0,
            description: "",
        },
    });

    const onSubmit = async (data) => {
        const toastId = "statistics-toast"; // ID unik untuk toast ini

        try {
            // Membuat FormData untuk data yang akan dikirim
            const formData = new FormData();
            formData.append('number', data.number);
            formData.append('description', data.description);

            // Mengirim data ke API
            const response = await fetch('/api/dashboard/shop_decoration/statistics', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to insert statistics');
            }

            const result = await response.json();
            console.log('Statistics inserted successfully:', result);

            // Tampilkan atau perbarui toast jika berhasil
            toast.success("Data berhasil disimpan!", {
                id: toastId,
                description: `Statistik dengan angka "${data.number}" telah berhasil disimpan.`,
                duration: 5000,
            });

            // Reset form jika berhasil
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);

            // Tampilkan atau perbarui toast jika gagal
            toast.error("Gagal menyimpan data", {
                id: toastId,
                description: "Terjadi kesalahan saat menyimpan data.",
                duration: 5000,
            });
        }
    };


    return (
        <div className="">
            <div className="flex gap-6 w-full rounded-lg overflow-hidden">
                <div className="w-2/5 p-6">
                    <Toaster position="top-right" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <div className="flex justify-between items-center pb-4">
                                    <h1 className="text-xl font-semibold">Statistik</h1>
                                    <div className="flex gap-3">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">Kelola</Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Kelola Statistik</SheetTitle>
                                                </SheetHeader>
                                            </SheetContent>
                                        </Sheet>
                                        <Button
                                            type="submit"
                                            className="bg-rose-600 hover:bg-rose-500"
                                        >
                                            Simpan
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="10000"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (!isNaN(value)) {
                                                                field.onChange(Number(value));
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Deskripsi</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Deskripsi singkat" {...field} />
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

                <div className="w-3/5 flex justify-center items-center p-6">
                    <div className="w-full max-w-4xl">
                        <StatikPreview />
                    </div>
                </div>
            </div>
        </div>
    );
}