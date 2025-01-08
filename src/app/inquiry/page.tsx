"use client";
import { FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const InquiryPage = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary-darker min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#3982c3]">
            Inquiry for Service
          </CardTitle>
          <CardDescription className="text-lg font-semibold">
            Price: $100
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input type="text" className="mt-1" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input type="email" className="mt-1" placeholder="Your Email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input type="tel" className="mt-1" placeholder="Your Phone" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea
                className="mt-1"
                rows={4}
                placeholder="Your Message"
              />
            </div>
            <div className="flex justify-between">
              <Button className="bg-gray-400 text-white hover:bg-gray-500 transition-colors">
                Cancel
              </Button>
              <Button className="bg-[#3982c3] text-white hover:bg-[#2c6190] transition-colors">
                <FiSend className="mr-2" />
                Submit Inquiry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default InquiryPage;
