import { Class } from '@/types/course';
import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface ClassItemProps {
  classItem: Class;
  onClick: () => void;
}

const ClassItem = ({ classItem, onClick }: ClassItemProps) => {
  return (
    <TableRow className="cursor-pointer" onClick={onClick}>
      <TableCell>{classItem.date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-secondary rounded-full" />
          <span>{classItem.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {classItem.status === 'Completed' ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          <span>Sent to</span>
          <span className="font-mono">****uzb9t</span>
        </div>
      </TableCell>
      <TableCell>{classItem.videoUrl}</TableCell>
      <TableCell>
        <Badge 
          variant={classItem.status === 'Completed' ? 'default' : 'secondary'}
        >
          {classItem.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default ClassItem; 