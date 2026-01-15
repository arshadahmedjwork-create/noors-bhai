
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const SidesGravies = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="w-full md:w-2/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>Empty Salna</TableCell><TableCell>$7.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Mixed Veg Gravy</TableCell><TableCell>$9.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Chicken Gravy</TableCell><TableCell>$9.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Paya</TableCell><TableCell>$14.99</TableCell><TableCell>Weekends</TableCell></TableRow>
            <TableRow><TableCell>Kudal Gravy</TableCell><TableCell>$14.99</TableCell><TableCell>Weekends</TableCell></TableRow>
            <TableRow><TableCell>Pepper Chicken</TableCell><TableCell>$14.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Tawa Kheema Chicken</TableCell><TableCell>$12.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Lamb Gravy</TableCell><TableCell>$14.99</TableCell><TableCell>Weekends</TableCell></TableRow>
            <TableRow><TableCell>Kadai Masala</TableCell><TableCell>$14.99</TableCell><TableCell>Weekends</TableCell></TableRow>
            <TableRow><TableCell>Prawn Masala</TableCell><TableCell>$14.99</TableCell><TableCell>Weekends</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-full md:w-1/3">
        <div className="rounded-lg overflow-hidden shadow-md border border-cafe-gold/30">
          <img 
            src="/lovable-uploads/4331a91c-8627-4873-b747-6f01e4f16e83.png" 
            alt="Rich and aromatic South Indian curry with traditional brass serving bowl" 
            className="w-full h-auto object-cover"
          />
          <div className="bg-cafe-black/90 text-white p-2 text-center text-sm">
            <p>Traditional South Indian gravies and curries</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-cafe-gold/10 p-4 rounded-lg border border-cafe-gold/20">
      <p className="text-cafe-brown font-medium italic text-sm">
        <span className="text-cafe-gold font-bold">Authentic Flavors:</span> Our gravies are slow-cooked with traditional spices and served in authentic brass vessels to enhance the dining experience.
      </p>
    </div>
  </div>
);

export default SidesGravies;
