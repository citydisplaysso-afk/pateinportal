import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  titleLocal?: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  delay?: number;
}

const variantStyles = {
  default: {
    card: 'bg-card',
    icon: 'bg-muted text-muted-foreground',
  },
  primary: {
    card: 'bg-primary-light',
    icon: 'bg-primary text-primary-foreground',
  },
  success: {
    card: 'bg-success-light',
    icon: 'bg-success text-success-foreground',
  },
  warning: {
    card: 'bg-warning-light',
    icon: 'bg-warning text-warning-foreground',
  },
};

export function StatCard({
  title,
  titleLocal,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  delay = 0,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'rounded-xl border border-border p-5 shadow-sm transition-shadow hover:shadow-md',
        styles.card
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {titleLocal && (
            <p className="text-xs text-muted-foreground/60">{titleLocal}</p>
          )}
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn('rounded-lg p-3', styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
