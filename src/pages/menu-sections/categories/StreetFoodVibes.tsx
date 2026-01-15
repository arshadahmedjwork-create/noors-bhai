
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const StreetFoodVibes = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Availability</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell>Kalaan</TableCell><TableCell>$9.99</TableCell><TableCell>Weekends</TableCell></TableRow>
      <TableRow><TableCell>Masala Puri</TableCell><TableCell>$9.99</TableCell><TableCell>Weekends</TableCell></TableRow>
      <TableRow><TableCell>Pani Puri</TableCell><TableCell>$9.99</TableCell><TableCell>Weekends</TableCell></TableRow>
    </TableBody>
  </Table>
);

export default StreetFoodVibes;
