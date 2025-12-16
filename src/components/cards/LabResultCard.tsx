import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LabResult } from '@/types/health';

interface LabResultCardProps {
  result: LabResult;
  delay?: number;
}

export function LabResultCard({ result, delay = 0 }: LabResultCardProps) {
  const isPending = result.status === 'pending';
  const isAbnormal = result.isAbnormal && !isPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md',
        isAbnormal ? 'border-warning/50' : 'border-border'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-b p-4',
          isAbnormal
            ? 'border-warning/30 bg-warning-light'
            : isPending
            ? 'border-border bg-muted/30'
            : 'border-border bg-gradient-card'
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'rounded-lg p-2',
              isAbnormal
                ? 'bg-warning/20 text-warning'
                : isPending
                ? 'bg-muted text-muted-foreground'
                : 'bg-primary/10 text-primary'
            )}
          >
            {isPending ? (
              <Clock className="h-5 w-5" />
            ) : isAbnormal ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{result.testName}</h3>
            <p className="text-xs text-muted-foreground">{result.category}</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            'border',
            isPending
              ? 'border-muted-foreground/30 bg-muted text-muted-foreground'
              : isAbnormal
              ? 'border-warning/30 bg-warning-light text-warning'
              : 'border-success/30 bg-success-light text-success'
          )}
        >
          {isPending ? 'Pending' : isAbnormal ? 'Review Needed' : 'Normal'}
        </Badge>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold text-foreground">
              {result.value}
            </span>
            {result.unit && (
              <span className="ml-2 text-lg text-muted-foreground">
                {result.unit}
              </span>
            )}
          </div>
          {result.referenceRange && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Reference</p>
              <p className="text-sm font-medium text-foreground">
                {result.referenceRange}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{result.orderedBy}</span>
          </div>
          <span>{format(parseISO(result.performedDate), 'MMM d, yyyy')}</span>
        </div>
      </div>
    </motion.div>
  );
}
