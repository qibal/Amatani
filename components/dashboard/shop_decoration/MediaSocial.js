'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/shadcnUi/input";
import { Button } from "@/components/shadcnUi/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcnUi/form";
import { Toaster, toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/shadcnUi/sheet";
import PreviewMediaSocial from './previewcomponent/MediaSocialPreview';


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
                                    <h1 className="text-xl font-semibold">Media Sosial</h1>
                                    <div className="flex gap-3">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">Kelola</Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Kelola Media Sosial</SheetTitle>
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
                                        name="instagram"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Instagram URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://instagram.com/yourusername" {...field} />
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
                <div className="w-3/5">
                    <div className="transform scale-[1] origin-top">
                        <PreviewMediaSocial />
                    </div>
                </div>
            </div>
        </div>
    );
}

