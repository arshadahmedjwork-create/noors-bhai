
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const ComboMeals = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Served With</TableHead>
        <TableHead>Availability</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Parotta (2pcs)</TableCell>
        <TableCell>$9.99</TableCell>
        <TableCell>Empty Salna</TableCell>
        <TableCell>All Days</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Kal Dosa (2pcs)</TableCell>
        <TableCell>$14.99</TableCell>
        <TableCell>Chicken / Veg Gravy</TableCell>
        <TableCell>All Days</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Idiyappam (3pcs)</TableCell>
        <TableCell>$14.99</TableCell>
        <TableCell>Paya</TableCell>
        <TableCell>Weekends</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Idly (2pcs)</TableCell>
        <TableCell>$12.99</TableCell>
        <TableCell>Chicken / Veg Gravy</TableCell>
        <TableCell>All Days</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Veg Pulav (Nei Soru)</TableCell>
        <TableCell>$12.99</TableCell>
        <TableCell>Chicken / Veg Gravy</TableCell>
        <TableCell>Weekends</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default ComboMeals;
