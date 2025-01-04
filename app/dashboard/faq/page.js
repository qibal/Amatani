"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Plus, SortDesc, Search, X, Loader2, AlertCircle } from 'lucide-react';
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ManageCategoryFaqDialog from "@/components/dashboard/faq/CategoryFaqDialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

export default function FaqPage() {
    const [faqItems, setFaqItems] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const fetchFaqs = async () => {
        try {
            const response = await fetch('/api/dashboard/faq');
            const data = await response.json();
            setFaqItems(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleDeleteFaq = async (faqId) => {
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
                console.log('Successfully deleted FAQ:', faqId);
                setShowDeleteAlert(true);
                setTimeout(() => setShowDeleteAlert(false), 5000); // Hide alert after 5 seconds
            } catch (error) {
                console.error('Failed to delete FAQ:', error);
            } finally {
                setPendingDeleteId(null);
            }
        });
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
                {showDeleteAlert && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            The FAQ has been successfully deleted.
                        </AlertDescription>
                    </Alert>
                )}
                <div className="space-y-2">
                    <h1 className="text-lg sm:text-xl font-semibold">All FAQs</h1>
                    <p className="text-xs text-gray-500">Total of {faqItems.length} FAQs</p>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <ManageCategoryFaqDialog />
                    <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
                        <div className="relative flex items-center w-full lg:w-[300px]">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-8 pr-8 rounded-full"
                            />
                            <Button
                                size="icon"
                                className="bg-transparent hover:bg-transparent hover:text-gray-800 shadow-none absolute right-1 top-1/2 -translate-y-1/2 transform"
                            >
                                <X className="h-4 w-4 text-gray-950" />
                            </Button>
                        </div>
                        <Link href="/dashboard/faq/add" passHref>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Plus className="w-5 h-5 mr-2" />
                                Add FAQ
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full sm:w-auto">
                            Sort by
                            <SortDesc className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-4">
                    {isPending ? (
                        <div className="flex justify-center items-center h-32">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((faq) => (
                                <AccordionItem key={faq.faq_id} value={`item-${faq.faq_id}`} className="border-b">
                                    <div className="flex items-center justify-between">
                                        <AccordionTrigger className="flex-grow text-left">
                                            {faq.title}
                                        </AccordionTrigger>
                                        <div className="flex space-x-3">
                                            <Button variant="outline" className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-md">
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit
                                            </Button>
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
                </div>
            </div>
        </div>
    );
}

