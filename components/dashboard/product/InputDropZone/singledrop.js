'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { toast } from "sonner"
import { X } from 'lucide-react'

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB in bytes

export default function InputDropZone() {
    const [image, setImage] = useState(null)

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                toast.error("Ukuran file terlalu besar", {
                    description: "Ukuran file tidak boleh lebih dari 4 MB. Silakan pilih file yang lebih kecil.",
                })
                return
            }
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    setImage(e.target?.result)
                }
                reader.readAsDataURL(file)
            } else {
                toast.error("Unsupported file type", {
                    description: "Please upload only image files (jpg, png, jpeg, webp).",
                })
            }
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp']
        }
    })

    const removeImage = () => {
        setImage(null)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-gray-300'
                        }`}
                >
                    <input {...getInputProps()} />
                    {image ? (
                        <div className="relative">
                            <AspectRatio ratio={1 / 1} className="bg-muted">
                                <img
                                    src={image}
                                    alt="Uploaded image"
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeImage()
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-gray-600">
                                Drag n drop an image here, or click to select one (max 4 MB)
                            </p>
                            <Button className="mt-4">Select Image</Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
