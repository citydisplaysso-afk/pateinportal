import { motion } from 'framer-motion';
import { Pill, RefreshCw, Calendar, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Prescription } from '@/types/health';

interface PrescriptionCardProps {
  prescription: Prescription;
  delay?: number;
}

const statusStyles = {
  active: {
    badge: 'bg-success-light text-success border-success/20',
    label: 'Active',
  },
  completed: {
    badge: 'bg-muted text-muted-foreground border-border',
    label: 'Completed',
  },
  cancelled: {
    badge: 'bg-destructive/10 text-destructive border-destructive/20',
    label: 'Cancelled',
  },
};

export function PrescriptionCard({ prescription, delay = 0 }: PrescriptionCardProps) {
  const status = statusStyles[prescription.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between border-b border-border bg-gradient-card p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Pill className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {prescription.medication}
            </h3>
            <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn('border', status.badge)}>
          {status.label}
        </Badge>
      </div>

      <div className="space-y-3 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Frequency</p>
            <p className="font-medium text-foreground">{prescription.frequency}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium text-foreground">{prescription.duration}</p>
          </div>
        </div>

        {prescription.instructions && (
          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            <p className="font-medium text-foreground">Instructions</p>
            <p className="mt-1 text-muted-foreground">{prescription.instructions}</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{prescription.prescribedBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(parseISO(prescription.prescribedDate), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </div>

      {prescription.status === 'active' && prescription.refillsRemaining !== undefined && (
        <div className="flex items-center justify-between border-t border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm">
            <RefreshCw className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {prescription.refillsRemaining} refills remaining
            </span>
          </div>
          <Button variant="medical" size="sm">
            Request Refill
          </Button>
        </div>
      )}
    </motion.div>
  );
}
