"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FileUpload from '@/components/admin/FileUpload';
import Modal from '@/components/Modal';
import ConfirmModal from '@/components/admin/ConfirmModal';
import apiService from '@/services/apiService';
import endPointApi from '@/services/endPointApi';

interface Hoarding {
  _id?: string;
  name: string;
  location: string;
  mainImage: string;
  description: string;
}

interface City {
  _id?: string;
  cityId: string;
  cityName: string;
  cityImage: string;
  cityDescription: string;
  hoardings: Hoarding[];
}

export default function AdminHoardings() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for City
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [cityForm, setCityForm] = useState({
    cityId: '',
    cityName: '',
    cityImage: '',
    cityDescription: ''
  });

  // Modal State for Hoarding
  const [isHoardingModalOpen, setIsHoardingModalOpen] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [hoardingForm, setHoardingForm] = useState<Hoarding>({
    name: '',
    location: '',
    mainImage: '',
    description: ''
  });

  // Delete confirm state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingType, setDeletingType] = useState<'city' | 'hoarding' | null>(null);
  const [deletingCityId, setDeletingCityId] = useState<string | null>(null);
  const [deletingHoardingIndex, setDeletingHoardingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const data = await apiService.get(endPointApi.hoardings);
      if (Array.isArray(data)) {
        setCities(data);
      }
    } catch (error) {
      console.error('Error fetching hoarding cities:', error);
      toast.error('Failed to load hoardings');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCityModal = (city?: City) => {
    if (city) {
      setEditingCity(city);
      setCityForm({
        cityId: city.cityId,
        cityName: city.cityName,
        cityImage: city.cityImage,
        cityDescription: city.cityDescription
      });
    } else {
      setEditingCity(null);
      setCityForm({ cityId: '', cityName: '', cityImage: '', cityDescription: '' });
    }
    setIsCityModalOpen(true);
  };

  const handleSaveCity = async () => {
    if (!cityForm.cityName) {
      toast.error('City name is required');
      return;
    }

    const toastId = toast.loading(editingCity ? 'Updating city...' : 'Creating city...');
    const cityId = cityForm.cityId || cityForm.cityName.toLowerCase().replace(/\s+/g, '-');

    try {
      if (editingCity?._id) {
        await apiService.put(`${endPointApi.hoardings}/${editingCity._id}`, {
          ...cityForm,
          cityId
        });
      } else {
        await apiService.post(endPointApi.hoardings, {
          ...cityForm,
          cityId
        });
      }
      toast.success('City saved successfully!', { id: toastId });
      setIsCityModalOpen(false);
      fetchCities();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save city', { id: toastId });
    }
  };

  const requestDeleteCity = (id: string) => {
    setDeletingType('city');
    setDeletingCityId(id);
    setDeleteConfirmOpen(true);
  };

  const requestDeleteHoarding = (cityId: string, index: number) => {
    setDeletingType('hoarding');
    setDeletingCityId(cityId);
    setDeletingHoardingIndex(index);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingType === 'city' && deletingCityId) {
      const toastId = toast.loading('Deleting city...');
      try {
        await apiService.delete(`${endPointApi.hoardings}/${deletingCityId}`);
        toast.success('City deleted', { id: toastId });
        fetchCities();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete city', { id: toastId });
      }
    } else if (deletingType === 'hoarding' && deletingCityId && deletingHoardingIndex !== null) {
      const city = cities.find(c => c._id === deletingCityId);
      if (!city) return;

      const toastId = toast.loading('Deleting hoarding...');
      const updatedHoardings = city.hoardings.filter((_, idx) => idx !== deletingHoardingIndex);

      try {
        await apiService.put(`${endPointApi.hoardings}/${deletingCityId}`, {
          hoardings: updatedHoardings
        });
        toast.success('Hoarding deleted!', { id: toastId });
        fetchCities();
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete hoarding', { id: toastId });
      }
    }
    setDeleteConfirmOpen(false);
    setDeletingType(null);
    setDeletingCityId(null);
    setDeletingHoardingIndex(null);
  };

  const handleOpenHoardingModal = (cityId: string) => {
    setSelectedCityId(cityId);
    setHoardingForm({ name: '', location: '', mainImage: '', description: '' });
    setIsHoardingModalOpen(true);
  };

  const handleSaveHoarding = async () => {
    if (!selectedCityId || !hoardingForm.name) {
      toast.error('Hoarding name is required');
      return;
    }

    const city = cities.find(c => c._id === selectedCityId);
    if (!city) return;

    const toastId = toast.loading('Adding hoarding location...');
    const updatedHoardings = [...(city.hoardings || []), hoardingForm];

    try {
      await apiService.put(`${endPointApi.hoardings}/${selectedCityId}`, {
        hoardings: updatedHoardings
      });
      toast.success('Hoarding location added!', { id: toastId });
      setIsHoardingModalOpen(false);
      fetchCities();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add hoarding', { id: toastId });
    }
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
          <h1 className="text-2xl font-extrabold text-[#1B2642]">Outdoor Hoardings & Cities</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Manage City locations and billboard inventory</p>
        </div>
        <button
          onClick={() => handleOpenCityModal()}
          className="bg-[#1B2642] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#1B2642]/90 transition-all shadow-md flex items-center gap-2"
        >
          <span>+ Add New City</span>
        </button>
      </div>

      <div className="space-y-8">
        {cities.map((city) => (
          <div key={city._id || city.cityId} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <img 
                  src={apiService.getImageUrl(city.cityImage, '/hordingimage/bhavnagar1.jpg')} 
                  alt={city.cityName} 
                  className="w-16 h-16 rounded-2xl object-cover border border-gray-100"
                />
                <div>
                  <h2 className="text-xl font-bold text-[#1B2642]">{city.cityName}</h2>
                  <p className="text-xs text-gray-500 max-w-lg">{city.cityDescription}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenHoardingModal(city._id!)}
                  className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  + Add Hoarding
                </button>
                <button
                  onClick={() => handleOpenCityModal(city)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Edit City
                </button>
                <button
                  onClick={() => requestDeleteCity(city._id!)}
                  className="px-4 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Hoardings Grid */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Hoardings in {city.cityName} ({city.hoardings?.length || 0})
              </h3>
              {city.hoardings?.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                  No hoarding locations added for {city.cityName} yet. Click &quot;+ Add Hoarding&quot; to add one.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {city.hoardings.map((hoarding, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-2xl p-4 flex flex-col justify-between space-y-3 bg-gray-50/50">
                      <div className="space-y-2">
                        <img 
                          src={apiService.getImageUrl(hoarding.mainImage, '/hordingimage/bhavnagar1.jpg')} 
                          alt={hoarding.name} 
                          className="w-full h-36 rounded-xl object-cover"
                        />
                        <h4 className="font-bold text-sm text-[#1B2642]">{hoarding.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{hoarding.location}</p>
                        <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">{hoarding.description}</p>
                      </div>
                      <button
                        onClick={() => requestDeleteHoarding(city._id!, idx)}
                        className="text-xs text-rose-500 font-bold hover:underline self-end"
                      >
                        Remove Hoarding
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* City Modal */}
      <Modal isOpen={isCityModalOpen} onClose={() => setIsCityModalOpen(false)} title={editingCity ? 'Edit City' : 'Add New City'}>
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
            <span className="text-xs text-gray-400">Save changes here</span>
            <button onClick={handleSaveCity} className="px-4 py-1.5 bg-[#1B2642] text-white text-[11px] font-bold rounded-xl hover:bg-[#1B2642]/90 transition-colors">
              Save City
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">City Name</label>
            <input
              type="text"
              value={cityForm.cityName}
              onChange={(e) => setCityForm({ ...cityForm, cityName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm"
              placeholder="e.g. Surat, Bhavnagar, Rajkot"
            />
          </div>
          <FileUpload
            label="City Thumbnail Image"
            value={cityForm.cityImage}
            onChange={(url) => setCityForm({ ...cityForm, cityImage: url })}
          />
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
            <textarea
              value={cityForm.cityDescription}
              onChange={(e) => setCityForm({ ...cityForm, cityDescription: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm h-20"
              placeholder="Brief description of hoardings in this city..."
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button onClick={() => setIsCityModalOpen(false)} className="px-5 py-2.5 text-xs font-bold text-gray-500">Cancel</button>
            <button onClick={handleSaveCity} className="px-6 py-2.5 bg-[#1B2642] text-white text-xs font-bold rounded-xl">Save City</button>
          </div>
        </div>
      </Modal>

      {/* Hoarding Modal */}
      <Modal isOpen={isHoardingModalOpen} onClose={() => setIsHoardingModalOpen(false)} title="Add Hoarding Location">
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-4">
            <span className="text-xs text-gray-400">Save changes here</span>
            <button onClick={handleSaveHoarding} className="px-4 py-1.5 bg-[#1B2642] text-white text-[11px] font-bold rounded-xl hover:bg-[#1B2642]/90 transition-colors">
              Add Hoarding
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Hoarding Title / Name</label>
            <input
              type="text"
              value={hoardingForm.name}
              onChange={(e) => setHoardingForm({ ...hoardingForm, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm"
              placeholder="e.g. Bhavnagar Central, Ring Road Board"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Location Address</label>
            <input
              type="text"
              value={hoardingForm.location}
              onChange={(e) => setHoardingForm({ ...hoardingForm, location: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm"
              placeholder="e.g. Kalanala Chowk, Bhavnagar"
            />
          </div>
          <FileUpload
            label="Hoarding Image"
            value={hoardingForm.mainImage}
            onChange={(url) => setHoardingForm({ ...hoardingForm, mainImage: url })}
          />
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
            <textarea
              value={hoardingForm.description}
              onChange={(e) => setHoardingForm({ ...hoardingForm, description: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm h-20"
              placeholder="Details about size, traffic, and visibility..."
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button onClick={() => setIsHoardingModalOpen(false)} className="px-5 py-2.5 text-xs font-bold text-gray-500">Cancel</button>
            <button onClick={handleSaveHoarding} className="px-6 py-2.5 bg-[#1B2642] text-white text-xs font-bold rounded-xl">Add Hoarding</button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={deletingType === 'city' ? "Delete City" : "Remove Hoarding"}
        message={deletingType === 'city' ? "Are you sure you want to delete this city and all its hoardings? This action cannot be undone." : "Are you sure you want to remove this hoarding location?"}
      />
    </div>
  );
}
