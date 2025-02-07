//app/contact/page.tsx


"use client"
import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Contact = () => {
  
  

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary-darker"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Contact Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols- gap-8">
          {/* <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#3982c3]">Get in Touch</CardTitle>
                <CardDescription>
                  We love to hear from you. Please fill out this form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  <Button type="submit" disabled={loading} className="w-full bg-[#3982c3] hover:bg-[#2c6190] text-white">
                    {loading ? (
                      <>
                        <FiLoader className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div> */}

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#3982c3]">Contact Information</CardTitle>
                <CardDescription>
                  Feel free to reach out to us using the information below:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <FiMail className="text-[#3982c3] w-6 h-6" />
                  <span>krishnapublicity2016@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FiPhone className="text-[#3982c3] w-6 h-6" />
                  <span>+91 7878161516</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FiMapPin className="text-[#3982c3] w-6 h-6" />
                  <span>
                    C-107, First Floor, Ambikapark Apt, Opp. HDFC Bank, Nr.
                    Laxmi Tiles, Punagam, Surat, Gujarat, India
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1241.3165544824567!2d72.86615550177982!3d21.202212736660353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f7d045e2bc1%3A0x6e0d37977ac07b2c!2sKRISHNA%20PUBLICITY!5e0!3m2!1sen!2sin!4v1730006460466!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
      {/* <div className="text-center mt-8">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div> */}
    </section>
  );
};

export default Contact;

