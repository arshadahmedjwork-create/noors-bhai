
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Beverages = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Availability</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell>Rosemilk</TableCell><TableCell>$5.49</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Nannari Sharbat</TableCell><TableCell>$4.49</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Lime Soda</TableCell><TableCell>$4.49</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Mango Lassi</TableCell><TableCell>$7.49</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Water</TableCell><TableCell>$2.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Pop (Soft Drink)</TableCell><TableCell>$2.99</TableCell><TableCell>All Days</TableCell></TableRow>
    </TableBody>
  </Table>
);

export default Beverages;
