'use client'

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
    title: z.string().min(1, { message: "Tidak boleh kosong" }),
    content: z.string().min(1, { message: "Tidak boleh kosong" }),
    category_id: z.string().min(1, { message: "Kategori FAQ harus dipilih" }),
});

export default function FAQForm({ mode, faq }) {
    const [categories, setCategories] = useState([]);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            category_id: "",
        },
    });

    useEffect(() => {
        if (mode === 'edit' && faq) {
            form.reset({
                title: faq.title,
                content: faq.content,
                category_id: faq.category_id.toString(),
            });
        }
    }, [mode, faq, form]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/dashboard/faq/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch FAQ categories:", error);
            }
        }
        fetchCategories();
    }, []);

    const handleSubmit = (data) => {
        startTransition(async () => {
            try {
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('content', data.content);
                formData.append('category_id', data.category_id);

                const response = await fetch('/api/dashboard/faq/insert', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to insert FAQ');
                }

                const result = await response.json();
                console.log('FAQ inserted successfully:', result);

                if (mode === 'add') {
                    form.reset();
                }
                // Tambahkan feedback ke pengguna di sini (misalnya, toast notification)
            } catch (error) {
                console.error('Error submitting form:', error);
                // Tambahkan feedback error ke pengguna di sini
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="lg:w-4/6">
                <div className="border">
                    <div className="flex justify-between items-center pb-4">
                        <h1 className="text-xl font-semibold">{mode === 'add' ? 'Tambah FAQ' : 'Edit FAQ'}</h1>
                        <div className="flex gap-3">
                            <Button variant="outline" type="button" onClick={() => form.reset()}>Cancel</Button>
                            <Button
                                variant="default"
                                type="submit"
                                className="bg-rose-600 hover:bg-rose-500"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {mode === 'add' ? 'Menambahkan...' : 'Menyimpan...'}
                                    </>
                                ) : (
                                    mode === 'add' ? 'Tambah' : 'Simpan Perubahan'
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="container mx-auto space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul FAQ</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan judul FAQ" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Konten FAQ</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Masukkan konten FAQ"
                                            {...field}
                                            onInput={(e) => {
                                                e.target.style.height = 'auto';
                                                e.target.style.height = `${e.target.scrollHeight}px`;
                                            }}
                                            style={{ overflow: 'hidden' }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori FAQ</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map(category => (
                                                    <SelectItem key={category.category_id} value={category.category_id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
}

