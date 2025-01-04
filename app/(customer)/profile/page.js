"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarIcon, PhoneIcon, } from "lucide-react";

export default function ShippingForm() {
    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>

            <form className="space-y-4">
                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <Textarea placeholder="Enter your full address" className="w-full" />
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <Input type="text" placeholder="City" className="w-full" />
                </div>

                {/* Province */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="jakarta">Jakarta</SelectItem>
                            <SelectItem value="jawa_barat">Jawa Barat</SelectItem>
                            <SelectItem value="jawa_tengah">Jawa Tengah</SelectItem>
                            {/* Tambahkan provinsi lain di sini */}
                        </SelectContent>
                    </Select>
                </div>

                {/* Postal Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <Input type="text" placeholder="Postal Code" className="w-full" />
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="indonesia">Indonesia</SelectItem>
                            <SelectItem value="malaysia">Malaysia</SelectItem>
                            <SelectItem value="singapore">Singapore</SelectItem>
                            {/* Tambahkan negara lain di sini */}
                        </SelectContent>
                    </Select>
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input type="tel" placeholder="Phone number" className="pl-10 w-full" />
                    </div>
                </div>

                {/* Shipping Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Date</label>
                    <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input type="date" className="pl-10 w-full" />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}
