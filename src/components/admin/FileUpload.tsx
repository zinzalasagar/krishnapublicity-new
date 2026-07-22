'use client';

import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, ExternalLink, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  accept?: string;
  className?: string;
}

export default function FileUpload({
  value,
  onChange,
  label = 'Upload Image',
  helperText = 'SVG, PNG, JPG or WEBP (Max 5MB)',
  accept = 'image/*',
  className = '',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    setUploading(true);
    const toastId = toast.loading('Uploading image...');

    try {
      const imagePath = await apiService.uploadFile(file);
      onChange(imagePath);
      toast.success('Image uploaded successfully!', { id: toastId });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'An error occurred while uploading.', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    const toastId = toast.loading('Deleting image from server...');
    try {
      const token = localStorage.getItem('token');
      await fetch(`${endPointApi.baseUrl}/${endPointApi.upload}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ imageUrl: value }),
      });

      onChange('');
      toast.success('Image removed & deleted from server', { id: toastId });
    } catch (error) {
      console.error('Delete error:', error);
      onChange('');
      toast.success('Image removed', { id: toastId });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {label && (
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}

      {value ? (
        /* Image Preview Card */
        <div className="relative group rounded-2xl border border-gray-200/80 bg-white p-3 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center">
            <img
              src={apiService.getImageUrl(value)}
              alt="Uploaded Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-[#1B2642]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <a
                href={apiService.getImageUrl(value)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/90 text-[#1B2642] rounded-xl hover:bg-white transition-transform hover:scale-110 shadow-lg text-xs font-bold flex items-center gap-1.5"
                title="View Full Size"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View</span>
              </a>

              <button
                type="button"
                onClick={handleRemove}
                className="p-2.5 bg-red-600/90 text-white rounded-xl hover:bg-red-600 transition-transform hover:scale-110 shadow-lg text-xs font-bold flex items-center gap-1.5"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Image Attached</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono truncate max-w-[200px]">
              {value.split('/').pop()}
            </span>
          </div>
        </div>
      ) : (
        /* Dropzone Card */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 text-center flex flex-col items-center justify-center cursor-pointer min-h-[160px] ${
            dragActive
              ? 'border-[#1B2642] bg-[#1B2642]/5 scale-[1.01]'
              : 'border-gray-200 hover:border-[#1B2642]/40 bg-gray-50/50 hover:bg-gray-50'
          }`}
        >
          <input
            type="file"
            onChange={handleFileChange}
            disabled={uploading}
            accept={accept}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="w-8 h-8 text-[#1B2642] animate-spin" />
              <p className="text-xs font-bold text-[#1B2642] uppercase tracking-wider">
                Uploading Image...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#1B2642] group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="w-6 h-6 text-[#1B2642]" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#1B2642]">
                  Click to upload <span className="font-normal text-gray-400">or drag and drop</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">{helperText}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
