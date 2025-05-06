import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface TransactionsOverviewProps {
  totalTransactions: number;
  from: string;
  to: string;
  averageTime: string;
  lastTransaction: string;
}

export default function TransactionsOverview({
  totalTransactions,
  from,
  to,
  averageTime,
  lastTransaction
}: TransactionsOverviewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{totalTransactions}</h2>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            From {from} To {to}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Average Transaction Time</h3>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xl font-bold">{averageTime}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Last transaction {lastTransaction}
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 