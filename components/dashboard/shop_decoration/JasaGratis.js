'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toaster, toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import PreviewMediaSocial from './previewcomponent/MediaSocialPreview';
import JasaGratisPreview from './previewcomponent/JasaGratisPreview';


const formSchema = z.object({
    companyName: z.string().min(1, { message: "Tidak boleh kosong" }),
    logo: z.any().refine((file) => file?.length > 0, "Logo harus diupload"),
});

export default function CompanyLogo() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            logo: null,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        toast("Data berhasil disimpan!", {
            description: "Logo perusahaan telah berhasil diperbarui.",
            duration: 5000,
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
                                    <h1 className="text-xl font-semibold">Jasa Gratis</h1>
                                    <div className="flex gap-3">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">Kelola</Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Kelola Logo Perusahaan</SheetTitle>
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
                                                        onChange={(e) => field.onChange(e.target.files)}
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
                <div className="w-3/5 flex justify-center items-center">
                    <div className="w-full max-w-4xl">
                        <JasaGratisPreview />
                    </div>
                </div>
            </div>
        </div>
    );
}

