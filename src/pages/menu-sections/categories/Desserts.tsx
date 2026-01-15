
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Desserts = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Availability</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell>Bread Halwa</TableCell><TableCell>$2.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Kesari</TableCell><TableCell>$2.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Kheer</TableCell><TableCell>$3.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Gulab Jamun</TableCell><TableCell>$1.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Shahi Tukra</TableCell><TableCell>$9.99</TableCell><TableCell>All Days</TableCell></TableRow>
    </TableBody>
  </Table>
);

export default Desserts;
