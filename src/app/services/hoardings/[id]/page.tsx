"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Download, X, Check, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Navbar from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";
import apiService from "@/services/apiService";
import endPointApi from "@/services/endPointApi";
import PageTransition from "@/components/PageTransition";
import { generateHoardingsPdf } from "@/lib/hoardingPdf";

interface Hoarding {
  id: string;
  title: string;
  image: string;
  description: string;
  currentPrice: number;
  previousPrice: number;
  mapLink: string;
}

interface CityData {
  name: string;
  hoardings: Hoarding[];
}

const cityHoardings: Record<string, CityData> = {
  bhavnagar: {
    name: "Bhavnagar",
    hoardings: [
      {
        id: "bhavnagar-1",
        title: "Bhavnagar",
        image: "/hordingimage/Picture1.jpg?height=600&width=800&text=Bhavnagar+Hoarding+1",
        description: " SBV- KA03-B’nagar- kobdi  NH- 8E Talaja To B’nagar-Costal Hwy.",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/HDyRAVBGrK1HCJsTA"
      },
      {
        id: "bhavnagar-2",
        title: "Bhavnagar",
        image: "/hordingimage/Picture2.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "B’nagar- kobdi  NH- 8E  bhavnagar  to Talaja  –Toll plaza -Costal Hwy.",
        currentPrice: 18000,
        previousPrice: 20000,
        mapLink: "https://maps.app.goo.gl/HDyRAVBGrK1HCJsTA"
      }
    ]
  },
  surat: {
    name: "Surat",
    hoardings: [
      {
        id: "surat-1",
        title: "Olpad",
        image: "/surathording/olpad/Picture1.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – opp,Polise Station main Road",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/sKVV4HCF2KnQYuiv8"
      }
    ]
  },
  ahmedabad: {
    name: "Ahmedabad",
    hoardings: [
      {
        id: "ahmedabad-1",
        title: "Ahmedabad Central",
        image: "/ahmedabad/image4.jpg?height=600&width=800&text=Ahmedabad+Hoarding+1",
        description: "Description for hoarding 1",
        currentPrice: 200000,
        previousPrice: 220000,
        mapLink: "23.061785 & 72.552196"
      }
    ]
  }
};

export default function CityHoardingsPage() {
  const params = useParams();
  const router = useRouter();
  const [city, setCity] = useState<CityData | null>(null);
  const [selectedHoarding, setSelectedHoarding] = useState<Hoarding | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const cityKey = params.id.toLowerCase();
      
      apiService.get(endPointApi.hoardings)
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            const foundCity = data.find((c: any) => c.cityId?.toLowerCase() === cityKey);
            if (foundCity) {
              setCity({
                name: foundCity.cityName,
                hoardings: (foundCity.hoardings || []).map((h: any, idx: number) => ({
                  id: h._id || `${cityKey}-${idx}`,
                  title: h.name,
                  image: apiService.getImageUrl(h.mainImage, '/hordingimage/bhavnagar1.jpg'),
                  description: h.description || h.location || '',
                  currentPrice: h.currentPrice || 0,
                  previousPrice: h.previousPrice || 0,
                  mapLink: h.location || 'https://maps.google.com'
                }))
              });
              return;
            }
          }
          if (cityHoardings[cityKey]) {
            setCity(cityHoardings[cityKey]);
          }
        })
        .catch(() => {
          if (cityHoardings[cityKey]) {
            setCity(cityHoardings[cityKey]);
          }
        });
    }
  }, [params.id]);

  const handleDownload = async () => {
    if (!selectedHoarding) return;
    try {
      const descriptionFileName = selectedHoarding.description.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
      const imageUrl = selectedHoarding.image.split('?')[0];
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const imageBlob = await response.blob();

      const textContent = `${selectedHoarding.title}\n\n${selectedHoarding.description}`;
      const textBlob = new Blob([textContent], { type: 'text/plain' });

      const zip = new JSZip();
      zip.file(`${descriptionFileName}.txt`, textBlob);
      zip.file(`hoarding-image.jpg`, imageBlob);

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${descriptionFileName}-details.zip`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const handleDownloadPdf = async () => {
    if (!city) return;
    const selected = city.hoardings.filter((h) => selectedIds.has(h.id));
    if (selected.length === 0) return;

    setIsGeneratingPdf(true);
    try {
      await generateHoardingsPdf(selected, city.name);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!city) {
    return (
      <div className="bg-theme-cream min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-4 pt-36 pb-16 text-theme-navy flex flex-col items-center justify-center">
          <h1 className="text-4xl font-black mb-8 text-theme-navy">City not found</h1>
          <Button
            variant="outline"
            className="bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <PageTransition className="bg-slate-50 min-h-screen flex flex-col justify-between font-sans selection:bg-theme-navy selection:text-white">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 pt-36 pb-24 lg:pt-40 lg:pb-32 max-w-[1400px] flex-grow">

        {/* Top Header Section */}
        <div className="mb-12 lg:mb-16">
          <Link href="/services/hoardings">
            <Button
              variant="outline"
              className="mb-10 bg-white border-theme-navy/10 text-theme-navy hover:bg-theme-navy hover:text-white transition-all duration-300 rounded-xl group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Cities
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-theme-navy/10 text-theme-navy mb-6 bg-white shadow-sm">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Location Hub</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-theme-navy tracking-tight mb-6 leading-none">
              {city.name}
            </h1>
            <p className="text-lg text-theme-navy/70 leading-relaxed max-w-2xl">
              Explore premium hoarding locations in {city.name}. Dominate the local landscape with high-impact advertising spots curated for maximum visibility.
            </p>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 text-theme-navy/50 text-sm font-medium">
              <div className="h-px bg-theme-navy/20 flex-grow" />
              <span>{city.hoardings.length} Locations Available</span>
            </div>
          </motion.div>
        </div>

        {/* Hoardings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {city.hoardings.map((hoarding, index) => (
                  <motion.div
                    key={hoarding.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border cursor-pointer h-full flex flex-col ${
                        selectedIds.has(hoarding.id) ? 'border-theme-navy ring-2 ring-theme-navy' : 'border-theme-navy/5'
                      }`}
                      onClick={() => setSelectedHoarding(hoarding)}
                    >
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image
                          src={hoarding.image}
                          alt={hoarding.title}
                          fill
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                        <button
                          type="button"
                          onClick={(e) => toggleSelect(hoarding.id, e)}
                          aria-label={selectedIds.has(hoarding.id) ? 'Deselect hoarding' : 'Select hoarding'}
                          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 ${
                            selectedIds.has(hoarding.id)
                              ? 'bg-theme-navy text-white'
                              : 'bg-white/20 text-white hover:bg-white/40'
                          }`}
                        >
                          {selectedIds.has(hoarding.id) ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border-2 border-white" />
                          )}
                        </button>

                        <div className="absolute bottom-6 left-6 right-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                          <h3 className="font-black text-2xl text-white mb-2">{hoarding.title}</h3>
                          <div className="h-1 w-12 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-0 group-hover:w-full transition-all duration-500" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow justify-between bg-white relative z-10">
                        <p className="text-theme-navy/70 text-sm mb-6 line-clamp-2 leading-relaxed">
                          {hoarding.description}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-theme-navy/50 font-bold mb-1">Estimated Price</p>
                            {hoarding.currentPrice > 0 ? (
                              <div className="flex items-center gap-3">
                                <p className="text-xl text-theme-navy font-black tracking-tight">
                                  ₹{hoarding.currentPrice.toLocaleString()}
                                </p>
                                {hoarding.previousPrice > hoarding.currentPrice && (
                                  <p className="text-sm text-theme-navy/40 line-through font-medium">
                                    ₹{hoarding.previousPrice.toLocaleString()}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p className="text-lg text-theme-navy font-black tracking-tight">Contact for Price</p>
                            )}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-theme-navy group-hover:text-white transition-colors duration-300 text-theme-navy">
                            <ArrowLeft className="w-4 h-4 rotate-135" style={{ transform: "rotate(135deg)" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        {/* Selection Action Bar */}
        <AnimatePresence>
          {selectedIds.size > 0 && (
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] bg-theme-navy text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 md:gap-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <span className="text-sm font-bold whitespace-nowrap">
                {selectedIds.size} Hoarding{selectedIds.size > 1 ? 's' : ''} Selected
              </span>
              <button
                onClick={clearSelection}
                className="text-xs text-white/60 hover:text-white underline whitespace-nowrap"
              >
                Clear
              </button>
              <Button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="bg-white text-theme-navy hover:bg-white/90 rounded-xl h-10 px-5 font-bold whitespace-nowrap disabled:opacity-70"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal for Hoarding Details */}
        <AnimatePresence>
          {selectedHoarding && (
            <motion.div
              className="fixed inset-0 bg-[#1a2332]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-[2.5rem] w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden shadow-2xl relative"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <button
                  className="absolute top-6 right-6 text-theme-navy/50 hover:text-theme-navy bg-white/80 backdrop-blur-md rounded-full p-2 z-10 transition-colors shadow-sm hover:bg-slate-100"
                  onClick={() => setSelectedHoarding(null)}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-full lg:w-3/5 h-64 md:h-96 lg:h-auto relative">
                  <Image
                    src={selectedHoarding.image}
                    alt={selectedHoarding.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                </div>
                
                <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-theme-navy mb-6 w-max">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{city.name}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black mb-6 text-theme-navy leading-tight">
                    {selectedHoarding.title}
                  </h2>
                  
                  <p className="text-theme-navy/70 mb-8 text-base leading-relaxed">
                    {selectedHoarding.description}
                  </p>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                    <p className="text-[10px] uppercase tracking-wider text-theme-navy/50 font-bold mb-2">Investment</p>
                    {selectedHoarding.currentPrice > 0 ? (
                      <div className="flex items-end gap-4">
                        <p className="text-4xl text-theme-navy font-black tracking-tighter">
                          ₹{selectedHoarding.currentPrice.toLocaleString()}
                        </p>
                        {selectedHoarding.previousPrice > selectedHoarding.currentPrice && (
                          <p className="text-lg text-theme-navy/40 line-through font-medium mb-1">
                            ₹{selectedHoarding.previousPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-2xl text-theme-navy font-black tracking-tighter">Contact for Price</p>
                    )}
                  </div>

                  <div className="flex gap-4 flex-col sm:flex-row">
                    <Button
                      className="flex-1 rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all bg-theme-navy text-white hover:bg-theme-navy/90 hover:-translate-y-1"
                      onClick={handleDownload}
                    >
                      <Download className="w-5 h-5 mr-2" /> Download Details
                    </Button>
                    <a
                      href={selectedHoarding.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-xl h-14 text-base font-bold border-theme-navy/20 text-theme-navy hover:bg-slate-50 transition-all hover:-translate-y-1"
                      >
                        <MapPin className="w-5 h-5 mr-2" /> View on Map
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </PageTransition>
  );
}
