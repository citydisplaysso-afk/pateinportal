import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Plus,
  Filter,
  Search,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppointmentCard } from '@/components/cards/AppointmentCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockAppointments } from '@/data/mockData';
import { Appointment } from '@/types/health';

export default function Appointments() {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch =
      apt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const groupedAppointments = filteredAppointments.reduce((groups, apt) => {
    const status = apt.status === 'completed' || apt.status === 'cancelled' ? 'past' : 'upcoming';
    if (!groups[status]) groups[status] = [];
    groups[status].push(apt);
    return groups;
  }, {} as Record<string, Appointment[]>);

  const doctors = [
    { name: 'Dr. Amina Hassan', specialty: 'General Medicine' },
    { name: 'Dr. Mohamed Ali', specialty: 'Cardiology' },
    { name: 'Dr. Fatima Omar', specialty: 'Laboratory Medicine' },
    { name: 'Dr. Yusuf Ahmed', specialty: 'Dentistry' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground">Ballamaha / Manage your medical appointments</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5" />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Request New Appointment</DialogTitle>
                <DialogDescription>
                  Codsiga ballanta cusub / Fill out the form to request an appointment
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Doctor / Dhakhtarka</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doc) => (
                        <SelectItem key={doc.name} value={doc.name}>
                          {doc.name} - {doc.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Appointment Type / Nooca Ballanta</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkup">General Checkup</SelectItem>
                      <SelectItem value="followup">Follow-up Visit</SelectItem>
                      <SelectItem value="lab">Lab Work</SelectItem>
                      <SelectItem value="specialist">Specialist Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8-12)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12-4)</SelectItem>
                        <SelectItem value="evening">Evening (4-6)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason for Visit / Sababta</Label>
                  <Textarea placeholder="Describe your symptoms or reason for the appointment..." />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDialogOpen(false);
                    }}
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Appointments List */}
        <div className="space-y-8">
          {/* Upcoming */}
          {groupedAppointments.upcoming && groupedAppointments.upcoming.length > 0 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {groupedAppointments.upcoming.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {groupedAppointments.past && groupedAppointments.past.length > 0 && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
                Past Appointments
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {groupedAppointments.past.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredAppointments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
            >
              <Calendar className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No appointments found
              </h3>
              <p className="mt-2 text-muted-foreground">
                {searchQuery || filter !== 'all'
                  ? 'Try adjusting your search or filter'
                  : "You don't have any appointments yet"}
              </p>
              <Button
                variant="medical"
                className="mt-6"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Book Your First Appointment
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
