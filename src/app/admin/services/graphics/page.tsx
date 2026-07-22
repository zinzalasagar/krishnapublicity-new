'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FileUpload from '@/components/admin/FileUpload';
import Modal from '@/components/Modal';
import ConfirmModal from '@/components/admin/ConfirmModal';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

interface GraphicsItem {
  _id?: string;
  slug: string;
  name: string;
  image: string;
  galleryImages: string[];
  description: string;
}

export default function AdminGraphics() {
  const [items, setItems] = useState<GraphicsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GraphicsItem | null>(null);
  const [form, setForm] = useState<GraphicsItem>({
    slug: '',
    name: '',
    image: '',
    galleryImages: [],
    description: ''
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Delete confirm state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchGraphics();
  }, []);

  const fetchGraphics = async () => {
    try {
      const data = await apiService.get(endPointApi.graphics);
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (error) {
      console.error('Error fetching graphics items:', error);
      toast.error('Failed to load graphics services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: GraphicsItem) => {
    if (item) {
      setEditingItem(item);
      setForm({
        slug: item.slug,
        name: item.name,
        image: item.image,
        galleryImages: item.galleryImages || [],
        description: item.description
      });
    } else {
      setEditingItem(null);
      setForm({ slug: '', name: '', image: '', galleryImages: [], description: '' });
    }
    setNewGalleryUrl('');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name) {
      toast.error('Name is required');
      return;
    }

    const toastId = toast.loading(editingItem ? 'Updating graphics service...' : 'Creating graphics service...');
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    try {
      if (editingItem?._id) {
        await apiService.put(`${endPointApi.graphics}/${editingItem._id}`, {
          ...form,
          slug
        });
      } else {
        await apiService.post(endPointApi.graphics, {
          ...form,
          slug
        });
      }
      toast.success('Graphics service saved!', { id: toastId });
      setIsModalOpen(false);
      fetchGraphics();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save graphics service', { id: toastId });
    }
  };

  const requestDelete = (id: string) => {
    setDeletingId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    const toastId = toast.loading('Deleting graphics service...');
    try {
      await apiService.delete(`${endPointApi.graphics}/${deletingId}`);
      toast.success('Service deleted', { id: toastId });
      fetchGraphics();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete service', { id: toastId });
    } finally {
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const handleAddGalleryImage = (url: string) => {
    if (!url) return;
    setForm(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, url]
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1B2642]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1B2642]">Graphics Services</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Manage all graphic design options (Board Banner, Business Card, Letterhead, etc.)</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#1B2642] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#1B2642]/90 transition-all shadow-md flex items-center gap-2"
        >
          <span>+ Add Graphics Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id || item.slug} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <img
                src={apiService.getImageUrl(item.image, '/graphicsimage/bordbanner.jpg')}
                alt={item.name}
                className="w-full h-44 rounded-2xl object-cover border border-gray-100"
              />
              <div>
                <h3 className="text-lg font-bold text-[#1B2642]">{item.name}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">slug: {item.slug}</p>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{item.description}</p>
              </div>
              {item.galleryImages?.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Gallery Photos ({item.galleryImages.length}):</span>
                  <div className="flex gap-1.5 mt-1 overflow-x-auto pb-1">
                    {item.galleryImages.slice(0, 4).map((gImg, idx) => (
                      <img key={idx} src={apiService.getImageUrl(gImg)} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleOpenModal(item)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Edit Details
              </button>
              <button
                onClick={() => requestDelete(item._id!)}
                className="px-4 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Graphics Service Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Graphics Service' : 'Add Graphics Service'}>
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
            <span className="text-xs text-gray-400">Save your changes here</span>
            <button onClick={handleSave} className="px-4 py-1.5 bg-[#1B2642] text-white text-[11px] font-bold rounded-xl hover:bg-[#1B2642]/90 transition-colors">
              Save Service
            </button>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Service Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm"
              placeholder="e.g. Board Banner, Business Card, Pamphlet"
            />
          </div>

          <FileUpload
            label="Main Thumbnail Image"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm h-24"
              placeholder="Describe this graphics service..."
            />
          </div>

          {/* Inner Gallery Slider Photos */}
          <div className="border-t border-gray-100 pt-4">
            <label className="block text-xs font-bold text-[#1B2642] mb-2 uppercase tracking-wider">
              Inner Carousel / Gallery Photos ({form.galleryImages?.length || 0})
            </label>
            <FileUpload
              label="Add Slider Image"
              value={newGalleryUrl}
              onChange={(url) => handleAddGalleryImage(url)}
              helperText="Upload images to be displayed in the detail page image carousel"
            />

            {form.galleryImages?.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {form.galleryImages.map((gUrl, idx) => (
                  <div key={idx} className="relative group">
                    <img src={apiService.getImageUrl(gUrl)} alt="" className="w-full h-16 rounded-xl object-cover border" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-xs font-bold text-gray-500">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2.5 bg-[#1B2642] text-white text-xs font-bold rounded-xl">Save Service</button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Graphics Service"
        message="Are you sure you want to delete this graphics service? This action cannot be undone."
      />
    </div>
  );
}
