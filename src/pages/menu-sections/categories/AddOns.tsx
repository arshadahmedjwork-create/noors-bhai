
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const AddOns = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Item</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Availability</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell>Idly</TableCell><TableCell>$2.49</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Kal Dosai</TableCell><TableCell>$4.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Parotta</TableCell><TableCell>$4.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Idiyappam</TableCell><TableCell>$1.99</TableCell><TableCell>Weekends</TableCell></TableRow>
      <TableRow><TableCell>Boiled Egg</TableCell><TableCell>$1.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Raitha</TableCell><TableCell>$1.99</TableCell><TableCell>All Days</TableCell></TableRow>
      <TableRow><TableCell>Brinjal Chutney</TableCell><TableCell>$2.99</TableCell><TableCell>All Days</TableCell></TableRow>
    </TableBody>
  </Table>
);

export default AddOns;
