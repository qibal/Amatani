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
import StatikPreview from './previewcomponent/StatikPreview';

const formSchema = z.object({
    visitors: z.string().min(1, { message: "Tidak boleh kosong" }),
    profession: z.string().min(1, { message: "Tidak boleh kosong" }),
});

export default function Statik() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            visitors: "",
            profession: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        toast("Data berhasil disimpan!", {
            description: "Statistik telah berhasil diperbarui.",
            duration: 5000,
        });
    };


    return (
        <div className="">
            {/* Combined Form and Preview Section */}
            <div className="flex gap-6 w-full border rounded-lg overflow-hidden">
                {/* Form Section */}
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
                                        name="visitors"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="10000" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="profession"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Deskripsi</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Petani Peternak" {...field} />
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
                        <StatikPreview />
                    </div>
                </div>
            </div>
        </div>
    );
}