'use client'

import React, { useCallback, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from 'next/image'

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ProductImageUpload({ onChange, value, error }) {
  const fileInputRef = useRef(null)
  const validateFile = useCallback((file) => {
    if (file.size > MAX_FILE_SIZE) {
      return false
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return false
    }
    return true
  }, [])

  const handleFiles = useCallback((selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(validateFile)

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
      onChange([...value, ...newFiles])
    }
  }, [onChange, validateFile, value])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = useCallback((fileToRemove) => {
    onChange(value.filter(file => file !== fileToRemove))
    URL.revokeObjectURL(fileToRemove.preview)
  }, [onChange, value])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className="w-full">
      <Label htmlFor="product-images" className="block text-sm font-medium text-gray-700 mb-2">
        Product Images
      </Label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <Input
          id="product-images"
          type="file"
          className="hidden"
          onChange={handleChange}
          multiple
          accept=".jpg,.jpeg,.png,.webp"
          ref={fileInputRef}
        />
        <p className="text-sm text-gray-500">
          Drag and drop product images here, or click to select files
        </p>
        <p className="text-xs text-gray-400 mt-1">
          (JPG, PNG, JPEG, WebP, max 4MB each)
        </p>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {value.map((file, index) => (
          <div key={index} className="relative">
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <Image
                width={300}
                height={300}
                src={file.preview}
                alt={`Preview ${index + 1}`}
                className="rounded-md object-cover w-full h-full"
              />
            </AspectRatio>
            <button
              onClick={() => removeFile(file)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
              type="button"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

