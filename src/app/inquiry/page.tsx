"use client";

import { FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const InquiryPage = () => {
  return (
    <section className="py-24 lg:py-32 bg-theme-cream min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1B2642]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#1B2642]/5 rounded-full blur-[100px]" />
      </div>

      <div className="absolute top-8 left-8 z-20">
        <Link href="/">
          <Button
            variant="outline"
            className="bg-white border-[#1B2642]/10 text-[#1B2642] hover:bg-[#1B2642] hover:text-white transition-all duration-300 rounded-xl px-5 shadow-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl mx-4 relative z-10"
      >
        <Card className="bg-white border-[#1B2642]/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(27,38,66,0.06)]">
          <CardHeader className="bg-[#1B2642]/5 border-b border-[#1B2642]/10 p-10">
            <CardTitle className="text-4xl font-serif text-[#1B2642] tracking-tight">
              Service <span className="text-[#1B2642]">Inquiry</span>
            </CardTitle>
            <CardDescription className="text-[#1B2642]/70 text-base mt-3 leading-relaxed font-light">
              Let us know what you&apos;re looking for, and our team will get back to you with a custom premium proposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10">
            <form className="space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="space-y-2"
              >
                <label className="block text-[10px] font-bold text-[#1B2642]/60 uppercase tracking-widest">
                  Full Name
                </label>
                <Input 
                  type="text" 
                  className="h-14 bg-slate-50 border-[#1B2642]/10 text-[#1B2642] focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] rounded-2xl px-5 font-medium transition-all" 
                  placeholder="e.g. Rajesh Kumar" 
                />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-2"
                >
                  <label className="block text-[10px] font-bold text-[#1B2642]/60 uppercase tracking-widest">
                    Email Address
                  </label>
                  <Input 
                    type="email" 
                    className="h-14 bg-slate-50 border-[#1B2642]/10 text-[#1B2642] focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] rounded-2xl px-5 font-medium transition-all" 
                    placeholder="name@company.com" 
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-2"
                >
                  <label className="block text-[10px] font-bold text-[#1B2642]/60 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <Input 
                    type="tel" 
                    className="h-14 bg-slate-50 border-[#1B2642]/10 text-[#1B2642] focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] rounded-2xl px-5 font-medium transition-all" 
                    placeholder="+91 98765 43210" 
                  />
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-2"
              >
                <label className="block text-[10px] font-bold text-[#1B2642]/60 uppercase tracking-widest">
                  Project details / Requirements
                </label>
                <Textarea
                  className="bg-slate-50 border-[#1B2642]/10 text-[#1B2642] focus:border-[#1B2642] focus:ring-1 focus:ring-[#1B2642] rounded-2xl p-5 font-medium resize-none transition-all"
                  rows={4}
                  placeholder="Tell us about your outdoor campaign goals, target locations, or sizes..."
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-end gap-4 pt-4"
              >
                <Link href="/">
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="h-14 px-8 rounded-full border-[#1B2642]/10 text-[#1B2642] hover:bg-slate-100 transition-all font-semibold"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit"
                  className="h-14 px-10 rounded-full bg-[#1B2642] hover:bg-[#1B2642]/90 text-white font-semibold shadow-lg hover:shadow-[#1B2642]/20 transition-all duration-300 flex items-center gap-2"
                >
                  <FiSend />
                  Submit Inquiry
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default InquiryPage;
