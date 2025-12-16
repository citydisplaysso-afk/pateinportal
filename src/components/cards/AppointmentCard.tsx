import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, MoreVertical } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/health';

interface AppointmentCardProps {
  appointment: Appointment;
  variant?: 'compact' | 'full';
  delay?: number;
}

const statusStyles = {
  booked: {
    badge: 'bg-primary-light text-primary border-primary/20',
    label: 'Booked',
  },
  confirmed: {
    badge: 'bg-success-light text-success border-success/20',
    label: 'Confirmed',
  },
  completed: {
    badge: 'bg-muted text-muted-foreground border-border',
    label: 'Completed',
  },
  cancelled: {
    badge: 'bg-destructive/10 text-destructive border-destructive/20',
    label: 'Cancelled',
  },
  pending: {
    badge: 'bg-warning-light text-warning border-warning/20',
    label: 'Pending',
  },
};

export function AppointmentCard({
  appointment,
  variant = 'full',
  delay = 0,
}: AppointmentCardProps) {
  const status = statusStyles[appointment.status];
  const startDate = parseISO(appointment.start);

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay }}
        className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
      >
        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary-light">
          <span className="text-lg font-bold text-primary">
            {format(startDate, 'd')}
          </span>
          <span className="text-xs font-medium uppercase text-primary/70">
            {format(startDate, 'MMM')}
          </span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{appointment.type}</p>
          <p className="text-sm text-muted-foreground">
            {appointment.doctor.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(startDate, 'h:mm a')}
          </p>
        </div>
        <Badge variant="outline" className={cn('border', status.badge)}>
          {status.label}
        </Badge>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="border-b border-border bg-gradient-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {appointment.type}
            </h3>
            <p className="text-sm text-muted-foreground">
              {appointment.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn('border', status.badge)}>
              {status.label}
            </Badge>
            <Button variant="ghost" size="icon-sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-foreground">
            {format(startDate, 'EEEE, MMMM d, yyyy')}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-foreground">{format(startDate, 'h:mm a')}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <User className="h-4 w-4 text-primary" />
          <span className="text-foreground">
            {appointment.doctor.name} - {appointment.doctor.specialty}
          </span>
        </div>
        {appointment.location && (
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{appointment.location}</span>
          </div>
        )}
      </div>

      {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
        <div className="flex gap-2 border-t border-border p-4">
          <Button variant="outline" size="sm" className="flex-1">
            Reschedule
          </Button>
          <Button variant="destructive" size="sm" className="flex-1">
            Cancel
          </Button>
        </div>
      )}
    </motion.div>
  );
}
