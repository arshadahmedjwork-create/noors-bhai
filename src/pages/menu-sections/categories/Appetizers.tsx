
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Appetizers = () => (
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
            <TableRow><TableCell>Chicken 65 (Bone-In)</TableCell><TableCell>$9.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Chicken 65 (Boneless)</TableCell><TableCell>$12.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Cauliflower 65</TableCell><TableCell>$12.99</TableCell><TableCell>All Days</TableCell></TableRow>
            <TableRow><TableCell>Prawn 65</TableCell><TableCell>$12.99</TableCell><TableCell>Weekends</TableCell></TableRow>
            <TableRow><TableCell>Fish Fry</TableCell><TableCell>*</TableCell><TableCell>Weekends</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-full md:w-1/3">
        <div className="rounded-lg overflow-hidden shadow-md border border-cafe-gold/30">
          <img 
            src="/lovable-uploads/d044f0ad-1809-437f-88f7-038ac57d4826.png" 
            alt="Spicy chicken appetizers with traditional South Indian spices" 
            className="w-full h-auto object-cover"
          />
          <div className="bg-cafe-black/90 text-white p-2 text-center text-sm">
            <p>Authentic Chicken 65 and spiced appetizers</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-cafe-gold/10 p-4 rounded-lg border border-cafe-gold/20">
      <p className="text-cafe-brown font-medium italic text-sm">
        <span className="text-cafe-gold font-bold">Chef's Special:</span> Our appetizers are marinated with traditional South Indian spices and cooked to perfection, offering the perfect start to your meal.
      </p>
    </div>
  </div>
);

export default Appetizers;
