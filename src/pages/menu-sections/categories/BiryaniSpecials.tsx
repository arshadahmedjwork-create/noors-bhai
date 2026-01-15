
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const BiryaniSpecials = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="w-full md:w-2/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Price (S / L)</TableHead>
              <TableHead>Served With</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Chicken Biryani</TableCell>
              <TableCell>$12.99 / $19.99</TableCell>
              <TableCell>Boiled Egg, Brinjal Chutney, Onion Raitha</TableCell>
              <TableCell>All Days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Veg Biryani</TableCell>
              <TableCell>$9.99 / $19.99</TableCell>
              <TableCell>Brinjal Chutney, Onion Raitha</TableCell>
              <TableCell>Weekends</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Goat Biryani</TableCell>
              <TableCell>$14.99 / $29.99</TableCell>
              <TableCell>Boiled Egg, Brinjal Chutney, Onion Raitha</TableCell>
              <TableCell>Sunday Special</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-full md:w-1/3">
        <div className="rounded-lg overflow-hidden shadow-md border border-cafe-gold/30">
          <img 
            src="/lovable-uploads/e8379e1b-ff29-4d0f-a3b3-4791e63f30eb.png" 
            alt="Traditional biryani preparation with authentic spices and garnish" 
            className="w-full h-auto object-cover"
          />
          <div className="bg-cafe-black/90 text-white p-2 text-center text-sm">
            <p>Traditional biryani garnished with fried onions and herbs</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-cafe-gold/10 p-4 rounded-lg border border-cafe-gold/20">
      <p className="text-cafe-brown font-medium italic text-sm">
        <span className="text-cafe-gold font-bold">Chef's Note:</span> Our signature biryanis are prepared using a special blend of spices imported directly from Chennai, India. Each biryani is layered and slow-cooked to perfection in traditional clay pots.
      </p>
    </div>
  </div>
);

export default BiryaniSpecials;
