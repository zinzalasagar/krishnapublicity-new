"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      },
      {
        id: "bhavnagar-3",
        title: "Bhavnagar",
        image: "/hordingimage/Picture3.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "B’nagar- Rajpara-khodiyar maa mandir main roed – bhavnagar to rajkot ",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/5hcewPYsDxH9LjTE6"
      },
      {
        id: "bhavnagar-4",
        title: "Bhavnagar",
        image: "/hordingimage/Picture4.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "B’nagar- Rajpara-khodiyar maa mandir main roed – bhavnagar to rajkot  ",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/5hcewPYsDxH9LjTE6"
      },
      {
        id: "bhavnagar-5",
        title: "Mahuva",
        image: "/hordingimage/Picture6.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Neswad Chokdi",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/ic1Nf8PH86eiXYvd7"
      },
      {
        id: "bhavnagar-6",
        title: "Mahuva",
        image: "/hordingimage/Picture7.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Neswad Chokdi",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/ic1Nf8PH86eiXYvd7"
      },
      {
        id: "bhavnagar-7",
        title: "Mahuva",
        image: "/hordingimage/Picture8.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda chokdi",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/jajddgxXLFEMinjU7"
      },
      {
        id: "bhavnagar-8",
        title: "Mahuva",
        image: "/hordingimage/Picture9.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda chokdi – cng pump ",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/jajddgxXLFEMinjU7"
      },
      {
        id: "bhavnagar-9",
        title: "Mahuva",
        image: "/hordingimage/Picture10.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda chokdi – mahuva to bhavnagar Exway 08",
        currentPrice: 18000,
        previousPrice: 20000,
        mapLink: "https://maps.app.goo.gl/jajddgxXLFEMinjU7"
      },
      {
        id: "bhavnagar-10",
        title: "Mahuva",
        image: "/hordingimage/Picture11.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Bhaguda mogal maa tampl– parking ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/ECJWgL77gYnYV8dq9"
      },
      {
        id: "bhavnagar-11",
        title: "Mahuva",
        image: "/hordingimage/Picture12.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– Nr. New Pollice Station S T Rd",
        currentPrice: 9000,
        previousPrice: 11000,
        mapLink: "https://maps.app.oo.gl/5hcewPYsDxH9LjTE6"
      },
      {
        id: "bhavnagar-12",
        title: "Mahuva",
        image: "/hordingimage/Picture13.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– BAGDANA-bapasitaram tample   ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/YbPNzWiWDpBtQtmq6"
      },
      {
        id: "bhavnagar-13",
        title: "Mahuva",
        image: "/hordingimage/Picture14.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "SM C01-- Mahuva– BAGDANA-bapasitaram tample   ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/YbPNzWiWDpBtQtmq6"
      },
      {
        id: "bhavnagar-14",
        title: "Talaja",
        image: "/hordingimage/Picture15.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja – bhupatbhai gardan main road",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/QkeGS6rTvH2WUj8i7"
      },
      {
        id: "bhavnagar-15",
        title: "Talaja",
        image: "/hordingimage/Picture16.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja – bhupatbhai gardan main road",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/QkeGS6rTvH2WUj8i7"
      },
      {
        id: "bhavnagar-16",
        title: "Talaja",
        image: "/hordingimage/Picture17.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja opp krishna hotel –City entry –Bhavnagar highway 08",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/eTERdbyBNU4havu16"
      },
      {
        id: "bhavnagar-17",
        title: "Talaja",
        image: "/hordingimage/Picture18.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja opp krishna hotel –City entry –Bhavnagar highway 08 ",
        currentPrice: 8000,
        previousPrice: 10000,
        mapLink: "https://maps.app.goo.gl/eTERdbyBNU4havu16"
      },
      {
        id: "bhavnagar-18",
        title: "Talaja",
        image: "/hordingimage/Picture19.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01-- Talaja opp jagabhai hotel –City entry –Bhavnagar to Mahuva highway",
        currentPrice: 22000,
        previousPrice: 24000,
        mapLink: "https://maps.app.goo.gl/RZWvmrVa22kyDYEp9"
      },
      {
        id: "bhavnagar-19",
        title: "Talaja",
        image: "/hordingimage/Picture20.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Talaja- opp Prarambh hotel –City entry –Bhavnagar to Mahuva highway   ",
        currentPrice: 12000,
        previousPrice: 14000,
        mapLink: "https://maps.app.goo.gl/uzRmPzzMiPjW3WSG6"
      },
      {
        id: "bhavnagar-20",
        title: "Talaja",
        image: "/hordingimage/Picture21.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Talaja- opp Prarambh hotel –City entry –Bhavnagar to Mahuva highway ",
        currentPrice: 12000,
        previousPrice: 14000,
        mapLink: "https://maps.app.goo.gl/uzRmPzzMiPjW3WSG6"
      },
      {
        id: "bhavnagar-21",
        title: "Talaja",
        image: "/hordingimage/Picture22.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Velavadar – somnath Bhavnagar highway ",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://maps.app.goo.gl/pPonC7uijPKR5fFg9"
      },
      {
        id: "bhavnagar-22",
        title: "Talaja",
        image: "/hordingimage/Picture23.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A01– Velavadar – somnath Bhavnagar highway   ",
        currentPrice: 20000,
        previousPrice: 220000,
        mapLink: "https://maps.app.goo.gl/pPonC7uijPKR5fFg9"
      },
      {
        id: "bhavnagar-23",
        title: "Talaja",
        image: "/hordingimage/Picture24.jpg?height=600&width=800&text=Bhavnagar+Hoarding+2",
        description: "VST A054– Bhandariya – opp Nath hills Fc Talaja main Road",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://maps.app.goo.gl/y8gEL65pvqk7sqXa7"
      },
    ],
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
      },
      {
        id: "surat-2",
        title: "Olpad",
        image: "/surathording/olpad/Picture2.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – opp,Polise Station main Road",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/sKVV4HCF2KnQYuiv8"
      },
      {
        id: "surat-3",
        title: "Olpad",
        image: "/surathording/olpad/Picture3.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – opp,Polise Station main Road",
        currentPrice: 10000,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/sKVV4HCF2KnQYuiv8"
      },
      {
        id: "surat-4",
        title: "Olpad",
        image: "/surathording/olpad/Picture4.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – BSNL office main Road-fc.kim road ",
        currentPrice: 8500,
        previousPrice: 11000,
        mapLink: "https://maps.app.goo.gl/9xMKSetfwXxe5WqbA"
      },
      {
        id: "surat-5",
        title: "Olpad",
        image: "/surathording/olpad/Picture5.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – BSNL office main Road-fc.kim road",
        currentPrice: 8500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/9xMKSetfwXxe5WqbA"
      },
      {
        id: "surat-6",
        title: "Olpad",
        image: "/surathording/olpad/Picture6.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – BSNL office main Road-fc.Surat city road",
        currentPrice: 0,
        previousPrice: 0,
        mapLink: "https://maps.app.goo.gl/9xMKSetfwXxe5WqbA"
      },
      {
        id: "surat-7",
        title: "Olpad",
        image: "/surathording/olpad/Picture7.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – HP pump main Road-fc.Surat city road",
        currentPrice: 8500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/z5Rps3VUGE3Y38c5A"
      },
      {
        id: "surat-8",
        title: "Olpad",
        image: "/surathording/olpad/Picture8.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – HP pump main Road-fc.Surat city road",
        currentPrice: 8500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/z5Rps3VUGE3Y38c5A"
      },
      {
        id: "surat-9",
        title: "Olpad",
        image: "/surathording/olpad/Picture9.png?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Fruit Market city entry ",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/Kz3agMym8xGakMrH6"
      },
      {
        id: "surat-10",
        title: "Olpad",
        image: "/surathording/olpad/Picture10.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – Fruit Market city entry (BG)",
        currentPrice: 9200,
        previousPrice: 12000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "surat-11",
        title: "Olpad",
        image: "/surathording/olpad/Picture11.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Senakhadi-city exit .fc surat city",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "https://maps.app.goo.gl/kixw2nZnqofKXMKH9"
      },
      {
        id: "surat-12",
        title: "Olpad",
        image: "/surathording/olpad/Picture12.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Senakhadi-city exit .fc surat city",
        currentPrice: 15000,
        previousPrice: 17000,
        mapLink: "https://maps.app.goo.gl/kixw2nZnqofKXMKH9"
      },
      {
        id: "surat-13",
        title: "Olpad",
        image: "/surathording/olpad/Picture13.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad – Senakhadi-city entry .fc surat to olpad",
        currentPrice: 14000,
        previousPrice: 16000,
        mapLink: "https://goo.gl/maps/exampleBhavnagarLink1"
      },
      {
        id: "surat-14",
        title: "Olpad",
        image: "/surathording/olpad/Picture14.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – Senakhadi-city entry .fc kim –Ankleswar ",
        currentPrice: 9500,
        previousPrice: 12000,
        mapLink: "https://maps.app.goo.gl/mg3usL2DRDBeGqh47"
      },
      {
        id: "surat-15",
        title: "Olpad",
        image: "/surathording/olpad/Picture15.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad –fruit market fc-surat city",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "https://maps.app.goo.gl/feT2CdCMgrJEu9Sb8"
      },
      {
        id: "surat-16",
        title: "Olpad",
        image: "/surathording/olpad/Picture16.jpg?height=600&width=800&text=Surat+Hoarding+1",
        description: "Surat-olpad –fruit market fc-surat city",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "Surat-olpad –fruit market fc-surat city"
      },
      {
        id: "surat-17",
        title: "Olpad",
        image: "/surathording/olpad/Picture17.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – fruit market -city entry .fc kim –Ankleswar",
        currentPrice: 7500,
        previousPrice: 9500,
        mapLink: "https://maps.app.goo.gl/feT2CdCMgrJEu9Sb8"
      },
      {
        id: "surat-18",
        title: "Olpad",
        image: "/surathording/olpad/Picture18.jpg?height=600&width=800&text=Surat+Hoarding+2",
        description: "Surat-olpad – fruit market -city entry .fc kim –Ankleswar",
        currentPrice: 7500,
        previousPrice: 9000,
        mapLink: "https://maps.app.goo.gl/feT2CdCMgrJEu9Sb8"
      },

    ],
  },
  ahmedabad: {
    name: "Ahmedabad",
    hoardings: [
      {
        id: "ahmedabad-1",
        title: "  1 ",
        image: "/ahmedabad/image4.jpg?height=600&width=800&text=Ahmedabad+Hoarding+1",
        description: "Description for hoarding 1",
        currentPrice: 200000,
        previousPrice: 220000,
        mapLink: "23.061785 & 72.552196"
      },
      {
        id: "ahmedabad-2",
        title: "  2",
        image: "/ahmedabad/image5.jpg?height=600&width=800&text=Ahmedabad+Hoarding+2",
        description: "Description for hoarding 2",
        currentPrice: 200000,
        previousPrice: 220000,
        mapLink: "https://goo.gl/maps/location2"
      },
      {
        id: "ahmedabad-3",
        title: "  3",
        image: "/ahmedabad/image6.jpg?height=600&width=800&text=Ahmedabad+Hoarding+3",
        description: "Description for hoarding 3",
        currentPrice: 100000,
        previousPrice: 120000,
        mapLink: "https://goo.gl/maps/location3"
      },
      {
        id: "ahmedabad-4",
        title: "  4",
        image: "/ahmedabad/image7.jpg?height=600&width=800&text=Ahmedabad+Hoarding+3",
        description: "Description for hoarding 3",
        currentPrice: 130000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location3"
      },
      {
        id: "ahmedabad-5",
        title: "  5",
        image: "/ahmedabad/image8.jpg?height=600&width=800&text=Ahmedabad+Hoarding+3",
        description: "Description for hoarding 5",
        currentPrice: 130000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location5"
      },
      {
        id: "ahmedabad-6",
        title: "  6",
        image: "/ahmedabad/image9.jpg?height=600&width=800&text=Ahmedabad+Hoarding+3",
        description: "Description for hoarding 6",
        currentPrice: 300000,
        previousPrice: 320000,
        mapLink: "https://goo.gl/maps/location6"
      },
      {
        id: "ahmedabad-7",
        title: "  7",
        image: "/ahmedabad/image10.jpg?height=600&width=800&text=Ahmedabad+Hoarding+3",
        description: "Description for hoarding 7",
        currentPrice: 150000,
        previousPrice: 170000,
        mapLink: "https://goo.gl/maps/location7"
      },
      {
        id: "ahmedabad-8",
        title: "  8",
        image: "/ahmedabad/image11.jpg?height=600&width=800&text=Ahmedabad+Hoarding+8",
        description: "Description for hoarding 8",
        currentPrice: 150000,
        previousPrice: 170000,
        mapLink: "https://goo.gl/maps/location8"
      },
      {
        id: "ahmedabad-9",
        title: "  9",
        image: "/ahmedabad/image12.jpg?height=600&width=800&text=Ahmedabad+Hoarding+9",
        description: "Description for hoarding 9",
        currentPrice: 300000,
        previousPrice: 340000,
        mapLink: "https://goo.gl/maps/location9"
      },
      {
        id: "ahmedabad-10",
        title: "  10",
        image: "/ahmedabad/image13.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 10",
        currentPrice: 125000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location10"
      },
      {
        id: "ahmedabad-11",
        title: "  11",
        image: "/ahmedabad/image14.jpg?height=600&width=800&text=Ahmedabad+Hoarding+11",
        description: "Description for hoarding 11",
        currentPrice: 250000,
        previousPrice: 270000,
        mapLink: "https://goo.gl/maps/location11"
      },
      {
        id: "ahmedabad-12",
        title: "  12",
        image: "/ahmedabad/image15.jpg?height=600&width=800&text=Ahmedabad+Hoarding+12",
        description: "Description for hoarding 12",
        currentPrice: 120000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location12"
      },
      {
        id: "ahmedabad-13",
        title: "  13",
        image: "/ahmedabad/image16.jpg?height=600&width=800&text=Ahmedabad+Hoarding+13",
        description: "Description for hoarding 13",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location13"
      },
      {
        id: "ahmedabad-14",
        title: "  14",
        image: "/ahmedabad/image17.jpg?height=600&width=800&text=Ahmedabad+Hoarding+14",
        description: "Description for hoarding 14",
        currentPrice: 200000,
        previousPrice: 210000,
        mapLink: "https://goo.gl/maps/location14"
      },
      {
        id: "ahmedabad-15",
        title: "  15",
        image: "/ahmedabad/image18.jpg?height=600&width=800&text=Ahmedabad+Hoarding+15",
        description: "Description for hoarding 15",
        currentPrice: 80000,
        previousPrice: 89000,
        mapLink: "https://goo.gl/maps/location15"
      },
      {
        id: "ahmedabad-16",
        title: "  16",
        image: "/ahmedabad/image19.jpg?height=600&width=800&text=Ahmedabad+Hoarding+16",
        description: "Description for hoarding 16",
        currentPrice: 40000,
        previousPrice: 42000,
        mapLink: "https://goo.gl/maps/location16"
      },
      {
        id: "ahmedabad-17",
        title: "  17",
        image: "/ahmedabad/image20.jpg?height=600&width=800&text=Ahmedabad+Hoarding+17",
        description: "Description for hoarding 17",
        currentPrice: 45000,
        previousPrice: 48000,
        mapLink: "https://goo.gl/maps/location17"
      },
      {
        id: "ahmedabad-18",
        title: "  18",
        image: "/ahmedabad/image21.jpg?height=600&width=800&text=Ahmedabad+Hoarding+18",
        description: "Description for hoarding 18",
        currentPrice: 45000,
        previousPrice: 47000,
        mapLink: "https://goo.gl/maps/location18"
      },
      {
        id: "ahmedabad-19",
        title: "  19",
        image: "/ahmedabad/image22.jpg?height=600&width=800&text=Ahmedabad+Hoarding+19",
        description: "Description for hoarding 19",
        currentPrice: 45000,
        previousPrice: 47000,
        mapLink: "https://goo.gl/maps/location19"
      },
      {
        id: "ahmedabad-20",
        title: "  20",
        image: "/ahmedabad/image23.jpg?height=600&width=800&text=Ahmedabad+Hoarding+20",
        description: "Description for hoarding 20",
        currentPrice: 40000,
        previousPrice: 42000,
        mapLink: "https://goo.gl/maps/location20"
      },
      {
        id: "ahmedabad-21",
        title: "  21",
        image: "/ahmedabad/image24.jpg?height=600&width=800&text=Ahmedabad+Hoarding+21",
        description: "Description for hoarding 21",
        currentPrice: 40000,
        previousPrice: 44000,
        mapLink: "https://goo.gl/maps/location21"
      },
      {
        id: "ahmedabad-22",
        title: "  22",
        image: "/ahmedabad/image25.jpg?height=600&width=800&text=Ahmedabad+Hoarding+22",
        description: "Description for hoarding 22",
        currentPrice: 40000,
        previousPrice: 43000,
        mapLink: "https://goo.gl/maps/location22"
      },
      {
        id: "ahmedabad-23",
        title: "  23",
        image: "/ahmedabad/image26.jpg?height=600&width=800&text=Ahmedabad+Hoarding+23",
        description: "Description for hoarding 23",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location23"
      },
      {
        id: "ahmedabad-24",
        title: "  24",
        image: "/ahmedabad/image27.jpg?height=600&width=800&text=Ahmedabad+Hoarding+24",
        description: "Description for hoarding 24",
        currentPrice: 80000,
        previousPrice: 85000,
        mapLink: "https://goo.gl/maps/location24"
      },
      {
        id: "ahmedabad-25",
        title: "  25",
        image: "/ahmedabad/image28.jpg?height=600&width=800&text=Ahmedabad+Hoarding+25",
        description: "Description for hoarding 25",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location25"
      },
      {
        id: "ahmedabad-26",
        title: "  26",
        image: "/ahmedabad/image29.jpg?height=600&width=800&text=Ahmedabad+Hoarding+26",
        description: "Description for hoarding 26",
        currentPrice: 100000,
        previousPrice: 110000,
        mapLink: "https://goo.gl/maps/location26"
      },
      {
        id: "ahmedabad-27",
        title: "  27",
        image: "/ahmedabad/image30.jpg?height=600&width=800&text=Ahmedabad+Hoarding+27",
        description: "Description for hoarding 27",
        currentPrice: 30000,
        previousPrice: 32000,
        mapLink: "https://goo.gl/maps/location27"
      },
      {
        id: "ahmedabad-28",
        title: "  28",
        image: "/ahmedabad/image31.jpg?height=600&width=800&text=Ahmedabad+Hoarding+28",
        description: "Description for hoarding 28",
        currentPrice: 30000,
        previousPrice: 32000,
        mapLink: "https://goo.gl/maps/location28"
      },
      {
        id: "ahmedabad-29",
        title: "  29",
        image: "/ahmedabad/image32.jpg?height=600&width=800&text=Ahmedabad+Hoarding+29",
        description: "Description for hoarding 29",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://goo.gl/maps/location29"
      },
      {
        id: "ahmedabad-30",
        title: "  30",
        image: "/ahmedabad/image33.jpg?height=600&width=800&text=Ahmedabad+Hoarding+30",
        description: "Description for hoarding 30",
        currentPrice: 50000,
        previousPrice: 52000,
        mapLink: "https://goo.gl/maps/location30"
      },
      {
        id: "ahmedabad-31",
        title: "  31",
        image: "/ahmedabad/image34.jpg?height=600&width=800&text=Ahmedabad+Hoarding+31",
        description: "Description for hoarding 31",
        currentPrice: 200000,
        previousPrice: 220000,
        mapLink: "https://goo.gl/maps/location31"
      },
      {
        id: "ahmedabad-32",
        title: "  32",
        image: "/ahmedabad/image35.jpg?height=600&width=800&text=Ahmedabad+Hoarding+32",
        description: "Description for hoarding 32",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location32"
      },
      {
        id: "ahmedabad-33",
        title: "  33",
        image: "/ahmedabad/image36.jpg?height=600&width=800&text=Ahmedabad+Hoarding+33",
        description: "Description for hoarding 33",
        currentPrice: 90000,
        previousPrice: 100000,
        mapLink: "https://goo.gl/maps/location33"
      },
      {
        id: "ahmedabad-34",
        title: "  34",
        image: "/ahmedabad/image37.jpg?height=600&width=800&text=Ahmedabad+Hoarding+34",
        description: "Description for hoarding 34",
        currentPrice: 70000,
        previousPrice: 73000,
        mapLink: "https://goo.gl/maps/location34"
      },
      {
        id: "ahmedabad-35",
        title: "  35",
        image: "/ahmedabad/image38.jpg?height=600&width=800&text=Ahmedabad+Hoarding+35",
        description: "Description for hoarding 35",
        currentPrice: 80000,
        previousPrice: 90000,
        mapLink: "https://goo.gl/maps/location35"
      },
      {
        id: "ahmedabad-36",
        title: "  36",
        image: "/ahmedabad/image39.jpg?height=600&width=800&text=Ahmedabad+Hoarding+36",
        description: "Description for hoarding 36",
        currentPrice: 40000,
        previousPrice: 43000,
        mapLink: "https://goo.gl/maps/location36"
      },
      {
        id: "ahmedabad-37",
        title: "  37",
        image: "/ahmedabad/image40.jpg?height=600&width=800&text=Ahmedabad+Hoarding+37",
        description: "Description for hoarding 37",
        currentPrice: 50000,
        previousPrice: 52000,
        mapLink: "https://goo.gl/maps/location37"
      },
      {
        id: "ahmedabad-38",
        title: "  38",
        image: "/ahmedabad/image41.jpg?height=600&width=800&text=Ahmedabad+Hoarding+38",
        description: "Description for hoarding 38",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location38"
      },
      {
        id: "ahmedabad-39",
        title: "  39",
        image: "/ahmedabad/image42.jpg?height=600&width=800&text=Ahmedabad+Hoarding+39",
        description: "Description for hoarding 39",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location39"
      },
      {
        id: "ahmedabad-40",
        title: "  40",
        image: "/ahmedabad/image43.jpg?height=600&width=800&text=Ahmedabad+Hoarding+40",
        description: "Description for hoarding 40",
        currentPrice: 160000,
        previousPrice: 170000,
        mapLink: "https://goo.gl/maps/location40"
      },
      {
        id: "ahmedabad-41",
        title: "  41",
        image: "/ahmedabad/image44.jpg?height=600&width=800&text=Ahmedabad+Hoarding+41",
        description: "Description for hoarding 41",
        currentPrice: 100000,
        previousPrice: 110000,
        mapLink: "https://goo.gl/maps/location41"
      },
      {
        id: "ahmedabad-42",
        title: "  42",
        image: "/ahmedabad/image45.jpg?height=600&width=800&text=Ahmedabad+Hoarding+42",
        description: "Description for hoarding 42",
        currentPrice: 125000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location42"
      },
      {
        id: "ahmedabad-43",
        title: "  43",
        image: "/ahmedabad/image46.jpg?height=600&width=800&text=Ahmedabad+Hoarding+43",
        description: "Description for hoarding 43",
        currentPrice: 90000,
        previousPrice: 93000,
        mapLink: "https://goo.gl/maps/location43"
      },
      {
        id: "ahmedabad-44",
        title: "  44",
        image: "/ahmedabad/image47.jpg?height=600&width=800&text=Ahmedabad+Hoarding+44",
        description: "Description for hoarding 44",
        currentPrice: 30000,
        previousPrice: 33000,
        mapLink: "https://goo.gl/maps/location44"
      },
      {
        id: "ahmedabad-45",
        title: "  45",
        image: "/ahmedabad/image48.jpg?height=600&width=800&text=Ahmedabad+Hoarding+45",
        description: "Description for hoarding 45",
        currentPrice: 100000,
        previousPrice: 120000,
        mapLink: "https://goo.gl/maps/location45"
      },
      {
        id: "ahmedabad-46",
        title: "  46",
        image: "/ahmedabad/image49.jpg?height=600&width=800&text=Ahmedabad+Hoarding+46",
        description: "Description for hoarding 46",
        currentPrice: 130000,
        previousPrice: 140000,
        mapLink: "https://goo.gl/maps/location46"
      },
      {
        id: "ahmedabad-47",
        title: "  47",
        image: "/ahmedabad/image50.jpg?height=600&width=800&text=Ahmedabad+Hoarding+47",
        description: "Description for hoarding 47",
        currentPrice: 50000,
        previousPrice: 52000,
        mapLink: "https://goo.gl/maps/location47"
      },
      {
        id: "ahmedabad-48",
        title: "  48",
        image: "/ahmedabad/image51.jpg?height=600&width=800&text=Ahmedabad+Hoarding+48",
        description: "Description for hoarding 48",
        currentPrice: 150000,
        previousPrice: 170000,
        mapLink: "https://goo.gl/maps/location48"
      },
      {
        id: "ahmedabad-49",
        title: "  49",
        image: "/ahmedabad/image52.jpg?height=600&width=800&text=Ahmedabad+Hoarding+49",
        description: "Description for hoarding 49",
        currentPrice: 150000,
        previousPrice: 170000,
        mapLink: "https://goo.gl/maps/location49"
      },
      {
        id: "ahmedabad-50",
        title: "  50",
        image: "/ahmedabad/image53.jpg?height=600&width=800&text=Ahmedabad+Hoarding+50",
        description: "Description for hoarding 50",
        currentPrice: 130000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location50"
      },
      {
        id: "ahmedabad-51",
        title: "  51",
        image: "/ahmedabad/image54.jpg?height=600&width=800&text=Ahmedabad+Hoarding+51",
        description: "Description for hoarding 51",
        currentPrice: 60000,
        previousPrice: 63000,
        mapLink: "https://goo.gl/maps/location51"
      },
      {
        id: "ahmedabad-52",
        title: "  52",
        image: "/ahmedabad/image55.jpg?height=600&width=800&text=Ahmedabad+Hoarding+52",
        description: "Description for hoarding 52",
        currentPrice: 180000,
        previousPrice: 190000,
        mapLink: "https://goo.gl/maps/location52"
      },
      {
        id: "ahmedabad-53",
        title: "  53",
        image: "/ahmedabad/image56.jpg?height=600&width=800&text=Ahmedabad+Hoarding+53",
        description: "Description for hoarding 53",
        currentPrice: 300000,
        previousPrice: 320000,
        mapLink: "https://goo.gl/maps/location53"
      },
      {
        id: "ahmedabad-54",
        title: "  54",
        image: "/ahmedabad/image57.jpg?height=600&width=800&text=Ahmedabad+Hoarding+54",
        description: "Description for hoarding 54",
        currentPrice: 100000,
        previousPrice: 120000,
        mapLink: "https://goo.gl/maps/location54"
      },
      {
        id: "ahmedabad-55",
        title: "  55",
        image: "/ahmedabad/image58.jpg?height=600&width=800&text=Ahmedabad+Hoarding+55",
        description: "Description for hoarding 55",
        currentPrice: 150000,
        previousPrice: 170000,
        mapLink: "https://goo.gl/maps/location55"
      },
      {
        id: "ahmedabad-56",
        title: "  56",
        image: "/ahmedabad/image59.jpg?height=600&width=800&text=Ahmedabad+Hoarding+56",
        description: "Description for hoarding 56",
        currentPrice: 30000,
        previousPrice: 33000,
        mapLink: "https://goo.gl/maps/location56"
      },
      {
        id: "ahmedabad-57",
        title: "  57",
        image: "/ahmedabad/image60.jpg?height=600&width=800&text=Ahmedabad+Hoarding+57",
        description: "Description for hoarding 57",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://goo.gl/maps/location57"
      },
      {
        id: "ahmedabad-58",
        title: "  58",
        image: "/ahmedabad/image61.jpg?height=600&width=800&text=Ahmedabad+Hoarding+58",
        description: "Description for hoarding 58",
        currentPrice: 230000,
        previousPrice: 250000,
        mapLink: "https://goo.gl/maps/location58"
      },
      {
        id: "ahmedabad-59",
        title: "  59",
        image: "/ahmedabad/image62.jpg?height=600&width=800&text=Ahmedabad+Hoarding+59",
        description: "Description for hoarding 59",
        currentPrice: 230000,
        previousPrice: 240000,
        mapLink: "https://goo.gl/maps/location59"
      },
      {
        id: "ahmedabad-60",
        title: "  60",
        image: "/ahmedabad/image63.jpg?height=600&width=800&text=Ahmedabad+Hoarding+60",
        description: "Description for hoarding 60",
        currentPrice: 250000,
        previousPrice: 270000,
        mapLink: "https://goo.gl/maps/location60"
      },
      {
        id: "ahmedabad-61",
        title: "  61",
        image: "/ahmedabad/image64.jpg?height=600&width=800&text=Ahmedabad+Hoarding+61",
        description: "Description for hoarding 61",
        currentPrice: 125000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location61"
      },
      {
        id: "ahmedabad-62",
        title: "  62",
        image: "/ahmedabad/image65.jpg?height=600&width=800&text=Ahmedabad+Hoarding+62",
        description: "Description for hoarding 62",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location62"
      },
      {
        id: "ahmedabad-63",
        title: "  63",
        image: "/ahmedabad/image66.jpg?height=600&width=800&text=Ahmedabad+Hoarding+63",
        description: "Description for hoarding 63",
        currentPrice: 200000,
        previousPrice: 220000,
        mapLink: "https://goo.gl/maps/location63"
      },
      {
        id: "ahmedabad-64",
        title: "  64",
        image: "/ahmedabad/image67.jpg?height=600&width=800&text=Ahmedabad+Hoarding+64",
        description: "Description for hoarding 64",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location64"
      },
      {
        id: "ahmedabad-65",
        title: "  65",
        image: "/ahmedabad/image68.jpg?height=600&width=800&text=Ahmedabad+Hoarding+65",
        description: "Description for hoarding 65",
        currentPrice: 80000,
        previousPrice: 82000,
        mapLink: "https://goo.gl/maps/location65"
      },
      {
        id: "ahmedabad-66",
        title: "  66",
        image: "/ahmedabad/image69.jpg?height=600&width=800&text=Ahmedabad+Hoarding+66",
        description: "Description for hoarding 66",
        currentPrice: 60000,
        previousPrice: 61000,
        mapLink: "https://goo.gl/maps/location66"
      },
      {
        id: "ahmedabad-67",
        title: "  67",
        image: "/ahmedabad/image70.jpg?height=600&width=800&text=Ahmedabad+Hoarding+67",
        description: "Description for hoarding 67",
        currentPrice: 50000,
        previousPrice: 52000,
        mapLink: "https://goo.gl/maps/location67"
      },
      {
        id: "ahmedabad-68",
        title: "  68",
        image: "/ahmedabad/image71.jpg?height=600&width=800&text=Ahmedabad+Hoarding+68",
        description: "Description for hoarding 68",
        currentPrice: 75000,
        previousPrice: 79000,
        mapLink: "https://goo.gl/maps/location68"
      },
      {
        id: "ahmedabad-69",
        title: "  69",
        image: "/ahmedabad/image72.jpg?height=600&width=800&text=Ahmedabad+Hoarding+69",
        description: "Description for hoarding 69",
        currentPrice: 350000,
        previousPrice: 380000,
        mapLink: "https://goo.gl/maps/location69"
      },
      {
        id: "ahmedabad-70",
        title: "  70",
        image: "/ahmedabad/image73.jpg?height=600&width=800&text=Ahmedabad+Hoarding+70",
        description: "Description for hoarding 70",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://goo.gl/maps/location70"
      },
      {
        id: "ahmedabad-71",
        title: "  71",
        image: "/ahmedabad/image74.jpg?height=600&width=800&text=Ahmedabad+Hoarding+71",
        description: "Description for hoarding 71",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location71"
      },
      {
        id: "ahmedabad-72",
        title: "  72",
        image: "/ahmedabad/image75.jpg?height=600&width=800&text=Ahmedabad+Hoarding+72",
        description: "Description for hoarding 72",
        currentPrice: 200000,
        previousPrice: 220000,
        mapLink: "https://goo.gl/maps/location72"
      },
      {
        id: "ahmedabad-73",
        title: "  73",
        image: "/ahmedabad/image76.jpg?height=600&width=800&text=Ahmedabad+Hoarding+73",
        description: "Description for hoarding 73",
        currentPrice: 200000,
        previousPrice: 210000,
        mapLink: "https://goo.gl/maps/location73"
      },
      {
        id: "ahmedabad-74",
        title: "  74",
        image: "/ahmedabad/image77.jpg?height=600&width=800&text=Ahmedabad+Hoarding+74",
        description: "Description for hoarding 74",
        currentPrice: 80000,
        previousPrice: 81000,
        mapLink: "https://goo.gl/maps/location74"
      },
      {
        id: "ahmedabad-75",
        title: "  75",
        image: "/ahmedabad/image78.jpg?height=600&width=800&text=Ahmedabad+Hoarding+75",
        description: "Description for hoarding 75",
        currentPrice: 80000,
        previousPrice: 81000,
        mapLink: "https://goo.gl/maps/location75"
      },
      {
        id: "ahmedabad-76",
        title: "  76",
        image: "/ahmedabad/image79.jpg?height=600&width=800&text=Ahmedabad+Hoarding+76",
        description: "Description for hoarding 76",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location76"
      },
      {
        id: "ahmedabad-77",
        title: "  77",
        image: "/ahmedabad/image80.jpg?height=600&width=800&text=Ahmedabad+Hoarding+77",
        description: "Description for hoarding 77",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location77"
      },
      {
        id: "ahmedabad-78",
        title: "  78",
        image: "/ahmedabad/image81.jpg?height=600&width=800&text=Ahmedabad+Hoarding+78",
        description: "Description for hoarding 78",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location78"
      },
      {
        id: "ahmedabad-79",
        title: "  79",
        image: "/ahmedabad/image82.jpg?height=600&width=800&text=Ahmedabad+Hoarding+79",
        description: "Description for hoarding 79",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location79"
      },
      {
        id: "ahmedabad-80",
        title: "  80",
        image: "/ahmedabad/image83.jpg?height=600&width=800&text=Ahmedabad+Hoarding+80",
        description: "Description for hoarding 80",
        currentPrice: 70000,
        previousPrice: 80000,
        mapLink: "https://goo.gl/maps/location80"
      },
      {
        id: "ahmedabad-81",
        title: "  81",
        image: "/ahmedabad/image84.jpg?height=600&width=800&text=Ahmedabad+Hoarding+81",
        description: "Description for hoarding 81",
        currentPrice: 70000,
        previousPrice: 73000,
        mapLink: "https://goo.gl/maps/location81"
      },
      {
        id: "ahmedabad-82",
        title: "  82",
        image: "/ahmedabad/image85.jpg?height=600&width=800&text=Ahmedabad+Hoarding+82",
        description: "Description for hoarding 82",
        currentPrice: 40000,
        previousPrice: 42000,
        mapLink: "https://goo.gl/maps/location82"
      },
      {
        id: "ahmedabad-83",
        title: "  83",
        image: "/ahmedabad/image86.jpg?height=600&width=800&text=Ahmedabad+Hoarding+83",
        description: "Description for hoarding 83",
        currentPrice: 40000,
        previousPrice: 42000,
        mapLink: "https://goo.gl/maps/location83"
      },
      {
        id: "ahmedabad-84",
        title: "  84",
        image: "/ahmedabad/image87.jpg?height=600&width=800&text=Ahmedabad+Hoarding+84",
        description: "Description for hoarding 84",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location84"
      },
      {
        id: "ahmedabad-85",
        title: "  85",
        image: "/ahmedabad/image88.jpg?height=600&width=800&text=Ahmedabad+Hoarding+85",
        description: "Description for hoarding 85",
        currentPrice: 35000,
        previousPrice: 36000,
        mapLink: "https://goo.gl/maps/location85"
      },
      {
        id: "ahmedabad-86",
        title: "  86",
        image: "/ahmedabad/image89.jpg?height=600&width=800&text=Ahmedabad+Hoarding+86",
        description: "Description for hoarding 86",
        currentPrice: 35000,
        previousPrice: 36000,
        mapLink: "https://goo.gl/maps/location86"
      },
      {
        id: "ahmedabad-87",
        title: "  87",
        image: "/ahmedabad/image90.jpg?height=600&width=800&text=Ahmedabad+Hoarding+87",
        description: "Description for hoarding 87",
        currentPrice: 50000,
        previousPrice: 53000,
        mapLink: "https://goo.gl/maps/location87"
      },
      {
        id: "ahmedabad-88",
        title: "  88",
        image: "/ahmedabad/image91.jpg?height=600&width=800&text=Ahmedabad+Hoarding+88",
        description: "Description for hoarding 88",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location88"
      },
      {
        id: "ahmedabad-89",
        title: "  89",
        image: "/ahmedabad/image92.jpg?height=600&width=800&text=Ahmedabad+Hoarding+89",
        description: "Description for hoarding 89",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location89"
      },
      {
        id: "ahmedabad-90",
        title: "  90",
        image: "/ahmedabad/image93.jpg?height=600&width=800&text=Ahmedabad+Hoarding+90",
        description: "Description for hoarding 90",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://goo.gl/maps/location90"
      },
      {
        id: "ahmedabad-91",
        title: "  91",
        image: "/ahmedabad/image94.jpg?height=600&width=800&text=Ahmedabad+Hoarding+91",
        description: "Description for hoarding 91",
        currentPrice: 20000,
        previousPrice: 22000,
        mapLink: "https://goo.gl/maps/location91"
      },
      {
        id: "ahmedabad-92",
        title: "  92",
        image: "/ahmedabad/image95.jpg?height=600&width=800&text=Ahmedabad+Hoarding+92",
        description: "Description for hoarding 92",
        currentPrice: 125000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location92"
      },
      {
        id: "ahmedabad-93",
        title: "  93",
        image: "/ahmedabad/image96.jpg?height=600&width=800&text=Ahmedabad+Hoarding+93",
        description: "Description for hoarding 93",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location93"
      },
      {
        id: "ahmedabad-94",
        title: "  94",
        image: "/ahmedabad/image97.jpg?height=600&width=800&text=Ahmedabad+Hoarding+94",
        description: "Description for hoarding 94",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location94"
      },
      {
        id: "ahmedabad-95",
        title: "  95",
        image: "/ahmedabad/image98.jpg?height=600&width=800&text=Ahmedabad+Hoarding+95",
        description: "Description for hoarding 95",
        currentPrice: 120000,
        previousPrice: 130000,
        mapLink: "https://goo.gl/maps/location95"
      },
      {
        id: "ahmedabad-96",
        title: "  96",
        image: "/ahmedabad/image99.jpg?height=600&width=800&text=Ahmedabad+Hoarding+96",
        description: "Description for hoarding 96",
        currentPrice: 110000,
        previousPrice: 120000,
        mapLink: "https://goo.gl/maps/location96"
      },
      {
        id: "ahmedabad-97",
        title: "  97",
        image: "/ahmedabad/image100.jpg?height=600&width=800&text=Ahmedabad+Hoarding+97",
        description: "Description for hoarding 97",
        currentPrice: 80000,
        previousPrice: 81000,
        mapLink: "https://goo.gl/maps/location97"
      },
      {
        id: "ahmedabad-98",
        title: "  98",
        image: "/ahmedabad/image101.jpg?height=600&width=800&text=Ahmedabad+Hoarding+98",
        description: "Description for hoarding 98",
        currentPrice: 45000,
        previousPrice: 50000,
        mapLink: "https://goo.gl/maps/location98"
      },
      {
        id: "ahmedabad-99",
        title: "  99",
        image: "/ahmedabad/image102.jpg?height=600&width=800&text=Ahmedabad+Hoarding+99",
        description: "Description for hoarding 99",
        currentPrice: 50000,
        previousPrice: 60000,
        mapLink: "https://goo.gl/maps/location99"
      },
      {
        id: "ahmedabad-100",
        title: "  100",
        image: "/ahmedabad/image103.jpg?height=600&width=800&text=Ahmedabad+Hoarding+100",
        description: "Description for hoarding 100",
        currentPrice: 200000,
        previousPrice: 210000,
        mapLink: "https://goo.gl/maps/location100"
      },
      {
        id: "ahmedabad-101",
        title: "  101",
        image: "/ahmedabad/image104.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 101",
        currentPrice: 200000,
        previousPrice: 210000,
        mapLink: "https://goo.gl/maps/location101"
      },
      {
        id: "ahmedabad-102",
        title: "  102",
        image: "/ahmedabad/image105.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 102",
        currentPrice: 60000,
        previousPrice: 62000,
        mapLink: "https://goo.gl/maps/location102"
      },
      {
        id: "ahmedabad-103",
        title: "  103",
        image: "/ahmedabad/image106.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 103",
        currentPrice: 25000,
        previousPrice: 29000,
        mapLink: "https://goo.gl/maps/location103"
      },
      {
        id: "ahmedabad-104",
        title: "  104",
        image: "/ahmedabad/image107.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 104",
        currentPrice: 80000,
        previousPrice: 84000,
        mapLink: "23.061785 & 72.552196"
      },
      {
        id: "ahmedabad-105",
        title: "  105",
        image: "/ahmedabad/image108.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 105",
        currentPrice: 160000,
        previousPrice: 170000,
        mapLink: "https://goo.gl/maps/location105"
      },
      {
        id: "ahmedabad-106",
        title: "  106",
        image: "/ahmedabad/image109.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 106",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location106"
      },
      {
        id: "ahmedabad-107",
        title: "  107",
        image: "/ahmedabad/image110.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 107",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location107"
      },
      {
        id: "ahmedabad-108",
        title: "  108",
        image: "/ahmedabad/image111.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 108",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location108"
      },
      {
        id: "ahmedabad-109",
        title: "  109",
        image: "/ahmedabad/image112.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 109",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location109"
      },
      {
        id: "ahmedabad-110",
        title: "  110",
        image: "/ahmedabad/image113.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 110",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location110"
      },
      {
        id: "ahmedabad-111",
        title: "  111",
        image: "/ahmedabad/image114.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 111",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location111"
      },
      {
        id: "ahmedabad-112",
        title: "  112",
        image: "/ahmedabad/image115.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 112",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location112"
      },
      {
        id: "ahmedabad-113",
        title: "  113",
        image: "/ahmedabad/image116.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 113",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location113"
      },
      {
        id: "ahmedabad-114",
        title: "  114",
        image: "/ahmedabad/image117.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 114",
        currentPrice: 300000,
        previousPrice: 340000,
        mapLink: "https://goo.gl/maps/location114"
      },
      {
        id: "ahmedabad-115",
        title: "  115",
        image: "/ahmedabad/image118.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 115",
        currentPrice: 140000,
        previousPrice: 150000,
        mapLink: "https://goo.gl/maps/location115"
      },
      {
        id: "ahmedabad-116",
        title: "  116",
        image: "/ahmedabad/image119.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 116",
        currentPrice: 130000,
        previousPrice: 140000,
        mapLink: "https://goo.gl/maps/location116"
      },
      {
        id: "ahmedabad-117",
        title: "  117",
        image: "/ahmedabad/image120.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 117",
        currentPrice: 300000,
        previousPrice: 330000,
        mapLink: "https://goo.gl/maps/location117"
      },
      {
        id: "ahmedabad-118",
        title: "  118",
        image: "/ahmedabad/image121.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 118",
        currentPrice: 300000,
        previousPrice: 330000,
        mapLink: "https://goo.gl/maps/location118"
      },
      {
        id: "ahmedabad-119",
        title: "  119",
        image: "/ahmedabad/image122.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 119",
        currentPrice: 300000,
        previousPrice: 330000,
        mapLink: "https://goo.gl/maps/location119"
      },
      {
        id: "ahmedabad-120",
        title: "  120",
        image: "/ahmedabad/image123.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 120",
        currentPrice: 400000,
        previousPrice: 420000,
        mapLink: "https://goo.gl/maps/location120"
      },
      {
        id: "ahmedabad-121",
        title: "  121",
        image: "/ahmedabad/image124.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 121",
        currentPrice: 250000,
        previousPrice: 270000,
        mapLink: "https://goo.gl/maps/location121"
      },
      {
        id: "ahmedabad-122",
        title: "  122",
        image: "/ahmedabad/image125.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 122",
        currentPrice: 250000,
        previousPrice: 270000,
        mapLink: "https://goo.gl/maps/location122"
      },
      {
        id: "ahmedabad-123",
        title: "  123",
        image: "/ahmedabad/image126.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 123",
        currentPrice: 250000,
        previousPrice: 290000,
        mapLink: "https://goo.gl/maps/location123"
      },
      {
        id: "ahmedabad-124",
        title: "  124",
        image: "/ahmedabad/image127.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 124",
        currentPrice: 400000,
        previousPrice: 440000,
        mapLink: "https://goo.gl/maps/location124"
      },
      {
        id: "ahmedabad-125",
        title: "  125",
        image: "/ahmedabad/image128.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 125",
        currentPrice: 40000,
        previousPrice: 44000,
        mapLink: "https://goo.gl/maps/location125"
      },
      {
        id: "ahmedabad-126",
        title: "  126",
        image: "/ahmedabad/image129.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 126",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location126"
      },
      {
        id: "ahmedabad-127",
        title: "  127",
        image: "/ahmedabad/image130.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 127",
        currentPrice: 300000,
        previousPrice: 340000,
        mapLink: "https://goo.gl/maps/location127"
      },
      {
        id: "ahmedabad-128",
        title: "  128",
        image: "/ahmedabad/image131.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 128",
        currentPrice: 40000,
        previousPrice: 43000,
        mapLink: "https://goo.gl/maps/location128"
      },
      {
        id: "ahmedabad-129",
        title: "  129",
        image: "/ahmedabad/image132.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 129",
        currentPrice: 250000,
        previousPrice: 260000,
        mapLink: "https://goo.gl/maps/location129"
      },
      {
        id: "ahmedabad-130",
        title: "  130",
        image: "/ahmedabad/image133.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 130",
        currentPrice: 300000,
        previousPrice: 340000,
        mapLink: "https://goo.gl/maps/location130"
      },
      {
        id: "ahmedabad-131",
        title: "  131",
        image: "/ahmedabad/image134.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 131",
        currentPrice: 250000,
        previousPrice: 270000,
        mapLink: "https://goo.gl/maps/location131"
      },
      {
        id: "ahmedabad-132",
        title: "  132",
        image: "/ahmedabad/image135.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 132",
        currentPrice: 250000,
        previousPrice: 23000000000,
        mapLink: "https://goo.gl/maps/location132"
      },
      {
        id: "ahmedabad-133",
        title: "  133",
        image: "/ahmedabad/image136.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 133",
        currentPrice: 300000,
        previousPrice: 340000,
        mapLink: "https://goo.gl/maps/location133"
      },
      {
        id: "ahmedabad-134",
        title: "  134",
        image: "/ahmedabad/image137.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 134",
        currentPrice: 300000,
        previousPrice: 330000,
        mapLink: "https://goo.gl/maps/location134"
      },
      {
        id: "ahmedabad-135",
        title: "  135",
        image: "/ahmedabad/image138.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 135",
        currentPrice: 250000,
        previousPrice: 260000,
        mapLink: "https://goo.gl/maps/location135"
      },
      {
        id: "ahmedabad-136",
        title: "  136",
        image: "/ahmedabad/image139.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 136",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location136"
      },
      {
        id: "ahmedabad-137",
        title: "  137",
        image: "/ahmedabad/image140.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 137",
        currentPrice: 100000,
        previousPrice: 110000,
        mapLink: "https://goo.gl/maps/location137"
      },
      {
        id: "ahmedabad-138",
        title: "  138",
        image: "/ahmedabad/image141.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 138",
        currentPrice: 125000,
        previousPrice: 129000,
        mapLink: "https://goo.gl/maps/location138"
      },
      {
        id: "ahmedabad-139",
        title: "  139",
        image: "/ahmedabad/image142.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 139",
        currentPrice: 125000,
        previousPrice: 129000,
        mapLink: "https://goo.gl/maps/location139"
      },
      {
        id: "ahmedabad-140",
        title: "  140",
        image: "/ahmedabad/image143.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 140",
        currentPrice: 350000,
        previousPrice: 400000,
        mapLink: "https://goo.gl/maps/location140"
      },
      {
        id: "ahmedabad-141",
        title: "  141",
        image: "/ahmedabad/image144.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 141",
        currentPrice: 250000,
        previousPrice: 290000,
        mapLink: "https://goo.gl/maps/location141"
      },
      {
        id: "ahmedabad-142",
        title: "  142",
        image: "/ahmedabad/image145.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 142",
        currentPrice: 450000,
        previousPrice: 490000,
        mapLink: "https://goo.gl/maps/location142"
      },
      {
        id: "ahmedabad-143",
        title: "  143",
        image: "/ahmedabad/image146.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 143",
        currentPrice: 200000,
        previousPrice: 210000,
        mapLink: "https://goo.gl/maps/location143"
      },
      {
        id: "ahmedabad-144",
        title: "  144",
        image: "/ahmedabad/image147.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 144",
        currentPrice: 300000,
        previousPrice: 310000,
        mapLink: "https://goo.gl/maps/location144"
      },
      {
        id: "ahmedabad-145",
        title: "  145",
        image: "/ahmedabad/image148.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 145",
        currentPrice: 240000,
        previousPrice: 250000,
        mapLink: "https://goo.gl/maps/location145"
      },
      {
        id: "ahmedabad-146",
        title: "  146",
        image: "/ahmedabad/image149.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 146",
        currentPrice: 300000,
        previousPrice: 310000,
        mapLink: "https://goo.gl/maps/location146"
      },
      {
        id: "ahmedabad-147",
        title: "  147",
        image: "/ahmedabad/image150.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 147",
        currentPrice: 250000,
        previousPrice: 260000,
        mapLink: "https://goo.gl/maps/location147"
      },
      {
        id: "ahmedabad-148",
        title: "  148",
        image: "/ahmedabad/image151.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 148",
        currentPrice: 240000,
        previousPrice: 250000,
        mapLink: "https://goo.gl/maps/location148"
      },
      {
        id: "ahmedabad-149",
        title: "  149",
        image: "/ahmedabad/image152.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 149",
        currentPrice: 240000,
        previousPrice: 250000,
        mapLink: "https://goo.gl/maps/location149"
      },
      {
        id: "ahmedabad-150",
        title: "  150",
        image: "/ahmedabad/image153.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 150",
        currentPrice: 80000,
        previousPrice: 84000,
        mapLink: "https://goo.gl/maps/location150"
      },
      {
        id: "ahmedabad-151",
        title: "  151",
        image: "/ahmedabad/image154.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 151",
        currentPrice: 150000,
        previousPrice: 160000,
        mapLink: "https://goo.gl/maps/location151"
      },
      {
        id: "ahmedabad-152",
        title: "  152",
        image: "/ahmedabad/image155.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 152",
        currentPrice: 350000,
        previousPrice: 360000,
        mapLink: "https://goo.gl/maps/location152"
      },
      {
        id: "ahmedabad-153",
        title: "  153",
        image: "/ahmedabad/image156.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 153",
        currentPrice: 200000,
        previousPrice: 210000,
        mapLink: "https://goo.gl/maps/location153"
      },
      {
        id: "ahmedabad-154",
        title: "  154",
        image: "/ahmedabad/image157.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 154",
        currentPrice: 250000,
        previousPrice: 260000,
        mapLink: "https://goo.gl/maps/location154"
      },
      {
        id: "ahmedabad-155",
        title: "  155",
        image: "/ahmedabad/image158.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 155",
        currentPrice: 600000,
        previousPrice: 620000,
        mapLink: "https://goo.gl/maps/location155"
      },
      {
        id: "ahmedabad-156",
        title: "  156",
        image: "/ahmedabad/image159.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 156",
        currentPrice: 220000,
        previousPrice: 230000,
        mapLink: "https://goo.gl/maps/location156"
      },
      {
        id: "ahmedabad-157",
        title: "  157",
        image: "/ahmedabad/image160.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 157",
        currentPrice: 250000,
        previousPrice: 260000,
        mapLink: "https://goo.gl/maps/location157"
      },
      {
        id: "ahmedabad-158",
        title: "  158",
        image: "/ahmedabad/image161.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 158",
        currentPrice: 300000,
        previousPrice: 330000,
        mapLink: "https://goo.gl/maps/location158"
      },
      {
        id: "ahmedabad-159",
        title: "  159",
        image: "/ahmedabad/image162.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 159",
        currentPrice: 330000,
        previousPrice: 340000,
        mapLink: "https://goo.gl/maps/location159"
      },
      {
        id: "ahmedabad-160",
        title: "  160",
        image: "/ahmedabad/image163.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 160",
        currentPrice: 300000,
        previousPrice: 310000,
        mapLink: "https://goo.gl/maps/location160"
      },
      {
        id: "ahmedabad-161",
        title: "  161",
        image: "/ahmedabad/image164.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 161",
        currentPrice: 400000,
        previousPrice: 410000,
        mapLink: "https://goo.gl/maps/location161"
      },
      {
        id: "ahmedabad-162",
        title: "  162",
        image: "/ahmedabad/image165.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 162",
        currentPrice: 270000,
        previousPrice: 280000,
        mapLink: "https://goo.gl/maps/location162"
      },
      {
        id: "ahmedabad-163",
        title: "  163",
        image: "/ahmedabad/image166.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 163",
        currentPrice: 260000,
        previousPrice: 270000,
        mapLink: "https://goo.gl/maps/location163"
      },
      {
        id: "ahmedabad-164",
        title: "  164",
        image: "/ahmedabad/image167.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 164",
        currentPrice: 80000,
        previousPrice: 85000,
        mapLink: "https://goo.gl/maps/location164"
      },
      {
        id: "ahmedabad-165",
        title: "  165",
        image: "/ahmedabad/image168.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 165",
        currentPrice: 250000,
        previousPrice: 260000,
        mapLink: "https://goo.gl/maps/location165"
      },
      {
        id: "ahmedabad-166",
        title: "  166",
        image: "/ahmedabad/image169.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 166",
        currentPrice: 250000,
        previousPrice: 260000,
        mapLink: "https://goo.gl/maps/location166"
      },
      {
        id: "ahmedabad-167",
        title: "  167",
        image: "/ahmedabad/image170.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 167",
        currentPrice: 300000,
        previousPrice: 310000,
        mapLink: "https://goo.gl/maps/location167"
      },
      {
        id: "ahmedabad-168",
        title: "  168",
        image: "/ahmedabad/image171.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 168",
        currentPrice: 40000,
        previousPrice: 41000,
        mapLink: "https://goo.gl/maps/location168"
      },
      {
        id: "ahmedabad-169",
        title: "  169",
        image: "/ahmedabad/image172.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 169",
        currentPrice: 40000,
        previousPrice: 41000,
        mapLink: "https://goo.gl/maps/location169"
      },
      {
        id: "ahmedabad-170",
        title: "  170",
        image: "/ahmedabad/image173.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 170",
        currentPrice: 300000,
        previousPrice: 310000,
        mapLink: "https://goo.gl/maps/location170"
      },
      {
        id: "ahmedabad-171",
        title: "  171",
        image: "/ahmedabad/image174.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 171",
        currentPrice: 40000,
        previousPrice: 41000,
        mapLink: "https://goo.gl/maps/location171"
      },
      {
        id: "ahmedabad-172",
        title: "  172",
        image: "/ahmedabad/image175.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 172",
        currentPrice: 40000,
        previousPrice: 41000,
        mapLink: "https://goo.gl/maps/location172"
      },
      {
        id: "ahmedabad-173",
        title: "  173",
        image: "/ahmedabad/image176.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 173",
        currentPrice: 40000,
        previousPrice: 41000,
        mapLink: "https://goo.gl/maps/location173"
      },
      {
        id: "ahmedabad-174",
        title: "  174",
        image: "/ahmedabad/image177.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 174",
        currentPrice: 30000,
        previousPrice: 31000,
        mapLink: "https://goo.gl/maps/location174"
      },
      {
        id: "ahmedabad-175",
        title: "  175",
        image: "/ahmedabad/image178.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 175",
        currentPrice: 30000,
        previousPrice: 31000,
        mapLink: "https://goo.gl/maps/location175"
      },
      {
        id: "ahmedabad-176",
        title: "  176",
        image: "/ahmedabad/image179.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 176",
        currentPrice: 50000,
        previousPrice: 51000,
        mapLink: "https://goo.gl/maps/location176"
      },
      {
        id: "ahmedabad-177",
        title: "  177",
        image: "/ahmedabad/image180.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 177",
        currentPrice: 50000,
        previousPrice: 51000,
        mapLink: "https://goo.gl/maps/location177"
      },
      {
        id: "ahmedabad-178",
        title: "  178",
        image: "/ahmedabad/image181.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 178",
        currentPrice: 50000,
        previousPrice: 51000,
        mapLink: "https://goo.gl/maps/location178"
      },
      {
        id: "ahmedabad-179",
        title: "  179",
        image: "/ahmedabad/image182.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 179",
        currentPrice: 130000,
        previousPrice: 140000,
        mapLink: "https://goo.gl/maps/location179"
      },
      {
        id: "ahmedabad-180",
        title: "  180",
        image: "/ahmedabad/image183.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 180",
        currentPrice: 350000,
        previousPrice: 360000,
        mapLink: "https://goo.gl/maps/location180"
      },
      {
        id: "ahmedabad-181",
        title: "  181",
        image: "/ahmedabad/image184.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 181",
        currentPrice: 20000,
        previousPrice: 21000,
        mapLink: "https://goo.gl/maps/location181"
      },
      {
        id: "ahmedabad-182",
        title: "  182",
        image: "/ahmedabad/image185.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 182",
        currentPrice: 200000,
        previousPrice: 210000,
        mapLink: "https://goo.gl/maps/location182"
      },
      {
        id: "ahmedabad-183",
        title: "  183",
        image: "/ahmedabad/image186.jpg?height=600&width=800&text=Ahmedabad+Hoarding",
        description: "Description for hoarding 183",
        currentPrice: 500000,
        previousPrice: 510000,
        mapLink: "https://goo.gl/maps/location183"
      },

    ],
  },
};

export default function CityHoardingsPage() {
  const params = useParams();
  const router = useRouter();
  const [city, setCity] = useState<CityData | null>(null);
  const [selectedHoarding, setSelectedHoarding] = useState<Hoarding | null>(null);
  const [hoverPreview, setHoverPreview] = useState<Hoarding | null>(null);
  console.log("Selected Hoarding:", hoverPreview);
  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const cityData = cityHoardings[params.id];
      if (cityData) {
        setCity(cityData);
      }
    }
  }, [params.id]);

  const handleDownload = async () => {
    if (!selectedHoarding) return;

    try {
      // Sanitize description for filename
      const sanitizeForFilename = (str: string) => {
        return str
          .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-')            // Replace spaces with dashes
          .substring(0, 50)               // Limit to 50 characters
          .toLowerCase();                 // Convert to lowercase
      };

      const descriptionFileName = sanitizeForFilename(selectedHoarding.description);

      // Get clean image URL without query parameters
      const imageUrl = selectedHoarding.image.split('?')[0];

      // Fetch image data
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const imageBlob = await response.blob();

      // Create text file with description
      const textContent = `${selectedHoarding.title}\n\n${selectedHoarding.description}`;
      const textBlob = new Blob([textContent], { type: 'text/plain' });

      // Create ZIP file
      const zip = new JSZip();
      zip.file(`${selectedHoarding.title}.txt`, textBlob);
      zip.file(`hoarding-image.jpg`, imageBlob);

      // Generate and save ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${descriptionFileName}-details.zip`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  if (!city) {
    return (
      <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
        <Button
          variant="outline"
          className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-4xl font-bold mb-8">City not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-[#3982c3] to-[#1e4060] min-h-screen text-white">
      <Link href="/services/hoardings">
        <Button
          variant="outline"
          className="mb-8 bg-white text-[#3982c3] hover:bg-[#3982c3] hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cities
        </Button>
      </Link>
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hoardings in {city.name}
      </motion.h1>
      <motion.p
        className="text-xl text-[#d1e8ff] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore our premium hoarding locations in {city.name}.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {city.hoardings.map((hoarding: Hoarding) => (
          <motion.div
            key={hoarding.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="h-full flex flex-col justify-between overflow-hidden bg-white text-[#1e4060]">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-center text-gray-500">
                  {hoarding.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="relative h-48 mb-4 overflow-hidden rounded-md"
                  onMouseEnter={() => setHoverPreview(hoarding)}
                  onMouseLeave={() => setHoverPreview(null)}
                >

                  <Image
                    src={hoarding.image}
                    alt={hoarding.title}
                    layout="fill"
                    objectFit="cover"
                    className="h-[600px] w-[80px]"
                  />
                  {/* {hoverPreview && (
                    <div className="fixed right-8 top-1/4 z-50 bg-white rounded-lg p-6 shadow-2xl max-w-md animate-fade-in">
                      <h3 className="text-xl font-bold mb-2 text-[#3982c3]">{hoverPreview.title}</h3>
                      <div className="relative h-64 w-full mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={hoverPreview.image || "/placeholder.svg"}
                          alt={hoverPreview.title}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <p className="text-gray-500 mb-2">{hoverPreview.description}</p>
                      <p className="text-gray-500 font-bold">
                        Current Price: ₹{hoverPreview.currentPrice.toLocaleString()}
                      </p>
                    </div>
                  )} */}
                  <a
                    href={hoarding.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3982c3] focus:ring-opacity-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MapPin className="h-6 w-6 text-[#3982c3]" />
                  </a>
                </div>

                <p className="text-sm text-gray-500 mb-2">{hoarding.description}</p>
                <p className="text-sm text-gray-500 font-bold">
                  Current Price: ₹{hoarding.currentPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  Previous Price: ₹{hoarding.previousPrice.toLocaleString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  className="bg-[#3982c3] text-white hover:bg-[#2c6190]"
                  onClick={() => setSelectedHoarding(hoarding)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>

          </motion.div>
        ))}
      </div>
      {selectedHoarding && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-2xl w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close Icon at the Top */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedHoarding(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#3982c3]">{selectedHoarding.title}</h2>
            <Image
              src={selectedHoarding.image}
              alt={selectedHoarding.title}
              width={800}
              height={600}
              objectFit="cover"
              className="rounded-lg mb-4"
            />
            <p className="text-gray-500 mb-4">{selectedHoarding.description}</p>
            <p className="text-gray-500 font-bold mb-2">
              Current Price: ₹{selectedHoarding.currentPrice.toLocaleString()}
            </p>
            <p className="text-gray-500 line-through mb-4">
              Previous Price: ₹{selectedHoarding.previousPrice.toLocaleString()}
            </p>

            {/* Save Button */}
            {/* <Button
              className="bg-[#3982c3] text-white hover:bg-[#2c6190] mr-2"
              onClick={async () => {
                try {
                  const imageUrl = selectedHoarding.image.split('?')[0];
                  const response = await fetch(imageUrl);
                  if (!response.ok) throw new Error('Failed to fetch image');
                  const imageBlob = await response.blob();

                  const textContent = `${selectedHoarding.title}\n\n${selectedHoarding.description}`;
                  const textBlob = new Blob([textContent], { type: 'text/plain' });

                  const zip = new JSZip();
                  zip.file(`${selectedHoarding.title}.txt`, textBlob);
                  zip.file(`hoarding-image.jpg`, imageBlob);

                  const content = await zip.generateAsync({ type: 'blob' });
                  saveAs(content, `${selectedHoarding.title}-details.zip`);
                } catch (error) {
                  console.error('Save error:', error);
                  alert('Save failed. Please try again.');
                }
              }}
            >
              Save
            </Button> */}

            {/* Download Button */}
            <Button
              className="bg-[#3982c3] text-white hover:bg-[#2c6190]"
              onClick={handleDownload}
            >
              Download
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

