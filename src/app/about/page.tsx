//app/about/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, Award, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const stats = [
  { icon: Users, value: "10+", label: "Years of Experience", progress: 100 },
  { icon: CheckCircle, value: "5000+", label: "Clients Served", progress: 85 },
  { icon: Award, value: "3600+", label: "Projects Completed", progress: 70 },
  { icon: Zap, value: "98%", label: "Client Satisfaction", progress: 98 },
];

const teamMembers = [
  {
    name: "Mr.Sanjay Ahir",
    role: "Ceo&founder",
    image: "/placeholder.svg?height=200&width=200&text=John+Doe",
    bio: "Mr.Sanjay Ahir has over 15 years of experience in the industry and is passionate about driving innovation.",
  },
  {
    name: "Mr.Umesh zinzala",
    role: "Creative Director",
    image: "/placeholder.svg?height=200&width=200&text=Jane+Smith",
    bio: "Mr.Umesh zinzala brings a wealth of creative expertise and has led numerous award-winning campaigns.",
  },
  {
    name: "Viky",
    role: "Marketing Manager",
    image: "/placeholder.svg?height=200&width=200&text=Mike+Johnson",
    bio: "Viky specializes in digital marketing strategies and has a track record of driving growth.",
  },
  {
    name: "Sarah Brown",
    role: "Lead Designer",
    image: "/placeholder.svg?height=200&width=200&text=Sarah+Brown",
    bio: "Sarah's innovative designs have helped many clients stand out in their respective markets.",
  },
];

const milestones = [
  { year: 2016, event: "Company founded", icon: Zap },
  { year: 2017, event: "Expanded to international markets", icon: Users },
  { year: 2018, event: "Launched innovative digital marketing services", icon: Award },
  { year: 2020, event: "Achieved 500+ client milestone", icon: CheckCircle },
  { year: 2023, event: "Opened new headquarters", icon: Users },
];

export default function About() {
  const [currentMember, setCurrentMember] = useState(0);
  const [activeTab, setActiveTab] = useState("story");
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    if (activeTab === "story") {
      const interval = setInterval(() => {
        setAnimatedStats((prev) =>
          prev.map((stat, index) => {
            if (stat < stats[index].progress) {
              return stat + 1;
            }
            return stat;
          })
        );
      }, 20);

      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const nextMember = () => {
    setCurrentMember((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentMember(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary-darker  to-[#31516f]"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-center text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#2c6190] rounded-t-lg">
            <TabsTrigger
              value="story"
              className="text-white data-[state=active]:bg-[#3982c3] transition-all duration-300"
            >
              Our Story
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="text-white data-[state=active]:bg-[#3982c3] transition-all duration-300"
            >
              Our Team
            </TabsTrigger>
            <TabsTrigger
              value="milestones"
              className="text-white data-[state=active]:bg-[#3982c3] transition-all duration-300"
            >
              Milestones
            </TabsTrigger>
          </TabsList>
          <TabsContent value="story">
            <Card className="bg-white shadow-lg rounded-b-lg">
              <CardHeader>
                <CardTitle className="text-[#3982c3] text-2xl">Our Journey</CardTitle>
                <CardDescription className="text-[#1e4060]">
                  From humble beginnings to industry leaders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.p
                  className="text-lg mb-4 text-[#1e4060]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  We are a company dedicated to delivering high-quality products
                  and services. With years of experience, we focus on customer
                  satisfaction and excellence.
                </motion.p>
                <motion.p
                  className="text-lg mb-6 text-[#1e4060]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Our mission is to innovate and lead in our industry,
                  continually pushing the boundaries to provide our clients with
                  outstanding products and unparalleled service.
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden bg-[#f0f8ff] hover:shadow-md transition-shadow duration-300">
                        <CardHeader className="pb-2">
                          <stat.icon className="w-8 h-8 text-[#3982c3] mb-2" />
                          <CardTitle className="text-[#3982c3] text-2xl">
                            {stat.value}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2 text-[#1e4060]">{stat.label}</p>
                          <Progress
                            value={animatedStats[index]}
                            className="h-2 bg-[#d1e8ff]"
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                {/* <Button className="bg-[#3982c3] hover:bg-[#2c6190] text-white transition-colors duration-300">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button> */}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="team">
            <Card className="bg-white shadow-lg rounded-b-lg">
              <CardHeader>
                <CardTitle className="text-[#3982c3] text-2xl">Meet Our Team</CardTitle>
                <CardDescription className="text-[#1e4060]">
                  The experts behind our success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <Button
                    variant="ghost"
                    onClick={prevMember}
                    className="text-[#3982c3] hover:text-[#2c6190] transition-colors duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMember}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      {/* <img
                        src={teamMembers[currentMember].image}
                        alt={teamMembers[currentMember].name}
                        className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-[#3982c3] transition-transform duration-300 hover:scale-105"
                      /> */}
                      <h3 className="text-xl font-semibold text-[#3982c3]">
                        {teamMembers[currentMember].name}
                      </h3>
                      <p className="text-[#2c6190] mb-2">
                        {teamMembers[currentMember].role}
                      </p>
                      <p className="text-sm max-w-md mx-auto text-[#1e4060]">
                        {teamMembers[currentMember].bio}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <Button
                    variant="ghost"
                    onClick={nextMember}
                    className="text-[#3982c3] hover:text-[#2c6190] transition-colors duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <p className="text-sm text-[#1e4060] text-center max-w-2xl">
                  Our team is composed of industry experts who are passionate
                  about what they do. We believe in the power of collaboration
                  and strive to build long-lasting partnerships with our
                  clients.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="milestones">
            <Card className="bg-white shadow-lg rounded-b-lg">
              <CardHeader>
                <CardTitle className="text-[#3982c3] text-2xl">Our Milestones</CardTitle>
                <CardDescription className="text-[#1e4060]">
                  Key moments in our company history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-[#3982c3] pl-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="mb-8"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="absolute w-4 h-4 bg-[#3982c3] rounded-full mt-1.5 -left-2 border-2 border-white" />
                      <time className="mb-1 text-sm font-normal leading-none text-[#2c6190]">
                        {milestone.year}
                      </time>
                      <div className="flex items-center">
                        <milestone.icon className="w-6 h-6 text-[#3982c3] mr-2" />
                        <h3 className="text-lg font-semibold text-[#3982c3]">
                          {milestone.event}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

