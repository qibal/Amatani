"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/shadcnUi/button";
import { Input } from "@/components/shadcnUi/input";
import { Edit, Trash, Plus, Filter, Search, X, Loader2 } from 'lucide-react';
import Link from "next/link";
import { SidebarTrigger } from "@/components/shadcnUi/sidebar";
import { Separator } from "@/components/shadcnUi/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcnUi/breadcrumb";
import ManageCategoryFaqDialog from "@/components/dashboard/faq/CategoryFaqDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcnUi/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcnUi/alert-dialog";
import { Skeleton } from "@/components/shadcnUi/skeleton";
import { Badge } from "@/components/shadcnUi/badge";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/shadcnUi/select";
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
            const response = await fetch(`/api/v2/admin/faq${category || query ? `?${category ? `category=${category}&` : ''}${query ? `query=${query}` : ''}` : ''}`);
            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
                setFaqItems(result.data);
            } else {
                console.error("FAQs data is not an array:", result);
                setFaqItems([]);
            }
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/v2/admin/products/categories');
            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
                setCategories(result.data);
            } else {
                console.error("Categories data is not an array:", result);
                setCategories([]);
            }
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
                const response = await fetch(`/api/v2/admin/faq/${faqId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete FAQ');
                }
                await response.json();
                setFaqItems(prevFaqs => prevFaqs.filter(faq => faq.faq_id !== faqId));
                toast.success('The FAQ has been successfully deleted.');
                setLoading(true); // Start skeleton loading
                fetchFaqs(selectedCategory, searchQuery); // Refresh FAQs
            } catch (error) {
                toast.error(`Failed to delete FAQ: ${error.message}`);
                console.error('Failed to delete FAQ:', error);
            } finally {
                setPendingDeleteId(null);
                setLoading(false); // Stop skeleton loading
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true); // Start skeleton loading
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
                                    FAQ
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                            {/* <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem> */}
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
                <div className="flex flex-wrap gap-4 items-center justify-between ">
                    <ManageCategoryFaqDialog />
                    <div className="flex flex-row gap-x-4">
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
                        <Link href="/admin/faq/add" passHref>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Plus className="w-5 h-5 mr-2" />
                                Add FAQ
                            </Button>
                        </Link>
                        <Select
                            onValueChange={(value) => {
                                setSelectedCategory(value);
                                setLoading(true); // Start skeleton loading
                                fetchFaqs(value, searchQuery);
                            }}
                        >
                            <SelectTrigger className="w-auto gap-4">
                                <SelectValue placeholder="Filter" />
                                {/* <Filter className="w-5 h-5 ml-2" /> */}
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(category => (
                                    <SelectItem key={category.categories_id} value={category.categories_id}>
                                        {category.categories_name}
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
                                                    </Badge>
                                                </AccordionTrigger>
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