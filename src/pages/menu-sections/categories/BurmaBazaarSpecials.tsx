
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const BurmaBazaarSpecials = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Availability</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell>Atho Noodles</TableCell><TableCell>$12.99</TableCell><TableCell>Weekends</TableCell></TableRow>
      <TableRow><TableCell>Kara Muttai (Spicy Egg)</TableCell><TableCell>$2.99</TableCell><TableCell>All Days</TableCell></TableRow>
    </TableBody>
  </Table>
);

export default BurmaBazaarSpecials;
