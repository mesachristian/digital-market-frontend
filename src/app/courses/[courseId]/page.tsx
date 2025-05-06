'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TransactionsOverview from '@/components/TransactionsOverview';
import ClassItem from '@/components/ClassItem';
import { Module, Class } from '@/types/course';

export default function CoursePage() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // This would come from your API
  const module: Module = {
    id: "1",
    title: "Module 1",
    description: "Introduction to the course",
    from: "Oct 1, 2024",
    to: "Dec 12, 2024",
    totalTransactions: 150,
    averageTime: "41s",
    classes: [
      {
        id: "1",
        title: "Introduction",
        description: "Course overview",
        videoUrl: "0.0094 USDT",
        date: "Dec 5, 2024, 9:16 AM",
        status: "Completed"
      },
      // Add more classes here
    ]
  };

  return (
    <div className="container mx-auto py-8">
      <TransactionsOverview 
        totalTransactions={module.totalTransactions}
        from={module.from}
        to={module.to}
        averageTime={module.averageTime}
        lastTransaction="Dec 6, 2024, 9:16 AM"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Assets</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {module.classes.map((classItem) => (
            <ClassItem
              key={classItem.id}
              classItem={classItem}
              onClick={() => setSelectedClass(classItem)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 