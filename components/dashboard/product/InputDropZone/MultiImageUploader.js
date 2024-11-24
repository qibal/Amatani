'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { toast } from "sonner"
import { CloudUpload, X } from 'lucide-react'
import Image from 'next/image'

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB in bytes

export default function MultiImageUploader({ image }) {
    const [images, setImages] = useState([]) // Multiple images state


    useEffect(() => {

        if (images) {
            image(images)

        }

    }, [images, image])

    const onDrop = useCallback((acceptedFiles) => {
        const validFiles = []
        acceptedFiles.forEach(file => {
            if (file.size > MAX_FILE_SIZE) {
                toast.error("Ukuran file terlalu besar", {
                    description: "Ukuran file tidak boleh lebih dari 4 MB. Silakan pilih file yang lebih kecil.",
                })
                return
            }
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    setImages(prevImages => [...prevImages, e.target?.result]) // Add image to state
                }
                reader.readAsDataURL(file)
            } else {
                toast.error("Unsupported file type", {
                    description: "Please upload only image files (jpg, png, jpeg, webp).",
                })
            }
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp']
        }
    })

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index))
    }

    return (

        <div
            {...getRootProps()}
            className={`border-2 border-dashed w-full  rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-gray-300'
                }`}
        >
            <input {...getInputProps()} multiple name='image' />
            {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <div className=''>
                                <AspectRatio ratio={1 / 1} className="bg-muted">
                                    <Image
                                        width={150}
                                        height={150}
                                        src={image}
                                        alt={`Uploaded image ${index + 1}`}
                                        className="rounded-md object-cover w-full"
                                    />
                                </AspectRatio>
                            </div>

                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeImage(index)
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <CloudUpload className='w-20 h-20 text-gray-300 mx-auto ' />
                    <p className="text-sm text-gray-600 mt-6">
                        Drag n drop images here, or click to select multiple (max 4 MB each)
                    </p>
                </div>
            )}
        </div>
    )
}
