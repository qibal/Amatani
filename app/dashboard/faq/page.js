"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Plus, Filter, Search, X, Loader2 } from 'lucide-react';
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ManageCategoryFaqDialog from "@/components/dashboard/faq/CategoryFaqDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function FaqPage() {
    const [faqItems, setFaqItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isPending, startTransition] = useTransition();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchFaqs = async (category = "", query = "") => {
        try {
            const response = await fetch(`/api/dashboard/faq${category || query ? `?${category ? `category=${category}&` : ''}${query ? `query=${query}` : ''}` : ''}`);
            const data = await response.json();
            setFaqItems(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/dashboard/faq/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchFaqs();
        fetchCategories();
    }, []);

    const handleDeleteFaq = (faqId) => {
        setPendingDeleteId(faqId);
        startTransition(async () => {
            try {
                const response = await fetch(`/api/dashboard/faq/delete/${faqId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete FAQ');
                }
                await response.json();
                setFaqItems(prevFaqs => prevFaqs.filter(faq => faq.faq_id !== faqId));
                toast.success('The FAQ has been successfully deleted.');
            } catch (error) {
                toast.error('Failed to delete FAQ. Please try again.');
                console.error('Failed to delete FAQ:', error);
            } finally {
                setPendingDeleteId(null);
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFaqs(selectedCategory, searchQuery);
    };


    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="p-4 sm:p-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-lg sm:text-xl font-semibold">All FAQs</h1>
                    <p className="text-xs text-gray-500">
                        Total of {faqItems?.length > 0 ? `${faqItems.length} FAQs` : 'No FAQs available'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <ManageCategoryFaqDialog />
                    <div className="flex flex-row gap-4 items-center w-full sm:w-auto ">
                        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
                            <div className="flex items-center w-full lg:w-auto">
                                <div className="relative flex items-center w-full lg:w-[220px]">
                                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                                    <Input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-8 rounded-l-full rounded-r-none"
                                    />
                                    <Button
                                        type="reset"
                                        size="icon"
                                        className="bg-transparent hover:border hover:rounded-full hover:bg-transparent hover:text-gray-800 shadow-none absolute right-1 top-1/2 -translate-y-1/2 transform"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        <X className="h-4 w-4 text-gray-950" />
                                    </Button>
                                </div>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="w-full sm:w-auto rounded-r-full rounded-l-none"
                                >
                                    Cari
                                </Button>
                            </div>
                        </form>
                        <Link href="/dashboard/faq/add" passHref>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Plus className="w-5 h-5 mr-2" />
                                Add FAQ
                            </Button>
                        </Link>
                        <Select
                            onValueChange={(value) => {
                                setSelectedCategory(value);
                                fetchFaqs(value);
                            }}
                        >
                            <SelectTrigger className="w-auto gap-4">
                                <SelectValue placeholder="Filter" />
                                {/* <Filter className="w-5 h-5 ml-2" /> */}
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(category => (
                                    <SelectItem key={category.category_id} value={category.category_id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-4">
                    {isPending || loading ? (
                        <div className="space-y-4">
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="space-y-2 flex flex-row justify-between">
                                    <Skeleton className="h-8 w-1/2" />
                                    <div className="flex space-x-3">
                                        <Skeleton className="h-8 w-20" />
                                        <Skeleton className="h-8 w-20" />
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {faqItems.length === 0 ? (
                                <p className="text-center text-gray-500">No FAQs available.</p>
                            ) : (
                                <Accordion type="single" collapsible className="w-full">
                                    {faqItems.map((faq) => (
                                        <AccordionItem key={faq.faq_id} value={`item-${faq.faq_id}`} className="border-b">
                                            <div className="flex items-center justify-between">
                                                <AccordionTrigger className="flex-grow text-left flex items-center">
                                                    {faq.title}
                                                    <Badge className="ml-2 bg-rose-100 text-rose-600 hover:bg-rose-200">
                                                        {faq.category_name || 'tidak ada kategori'}
                                                    </Badge>                                                </AccordionTrigger>
                                                <div className="flex space-x-3">
                                                    <Link href={`/dashboard/faq/edit/${faq.faq_id}`} passHref>
                                                        <Button variant="outline" className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-md">
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className="flex items-center justify-center w-9 h-9 rounded-md relative"
                                                                disabled={pendingDeleteId === faq.faq_id}
                                                            >
                                                                {pendingDeleteId === faq.faq_id ? (
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <Trash className="w-5 h-5" />
                                                                )}
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete the FAQ
                                                                    from our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteFaq(faq.faq_id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                            <AccordionContent>
                                                <p>{faq.content}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}