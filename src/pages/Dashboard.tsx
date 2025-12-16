import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Pill,
  Bell,
  ArrowRight,
  Clock,
  Activity,
  Heart,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/cards/StatCard';
import { AppointmentCard } from '@/components/cards/AppointmentCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  mockPatient,
  mockAppointments,
  mockLabResults,
  mockPrescriptions,
  mockNotifications,
} from '@/data/mockData';

export default function Dashboard() {
  const upcomingAppointments = mockAppointments.filter(
    (apt) => apt.status === 'booked' || apt.status === 'confirmed'
  );
  const activePresciptions = mockPrescriptions.filter(
    (rx) => rx.status === 'active'
  );
  const pendingResults = mockLabResults.filter((r) => r.status === 'pending');
  const unreadNotifications = mockNotifications.filter((n) => !n.read);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { en: 'Good Morning', so: 'Subax wanaagsan' };
    if (hour < 17) return { en: 'Good Afternoon', so: 'Galab wanaagsan' };
    return { en: 'Good Evening', so: 'Fiid wanaagsan' };
  };

  const greeting = getGreeting();

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-hero p-6 text-white shadow-lg lg:p-8"
        >
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-sm font-medium text-white/80">{greeting.so}</p>
            <h1 className="mt-1 text-2xl font-bold lg:text-3xl">
              {greeting.en}, {mockPatient.name.given[0]}!
            </h1>
            <p className="mt-2 text-white/70">
              Here's your health overview for today
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/appointments">
                <Button variant="hero" className="bg-white/20 hover:bg-white/30">
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/records">
                <Button variant="soft" className="bg-white/10 text-white hover:bg-white/20">
                  <FileText className="h-4 w-4" />
                  View Records
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-4 right-4 hidden opacity-20 lg:block">
            <Activity className="h-32 w-32" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Upcoming Appointments"
            titleLocal="Ballamaha soo socda"
            value={upcomingAppointments.length}
            subtitle="Next one tomorrow"
            icon={Calendar}
            variant="primary"
            delay={0.1}
          />
          <StatCard
            title="Active Prescriptions"
            titleLocal="Daawooyinka"
            value={activePresciptions.length}
            subtitle={`${activePresciptions.reduce((acc, rx) => acc + (rx.refillsRemaining || 0), 0)} refills available`}
            icon={Pill}
            variant="success"
            delay={0.2}
          />
          <StatCard
            title="Pending Results"
            titleLocal="Natiijooyinka"
            value={pendingResults.length}
            subtitle="Lab results processing"
            icon={FileText}
            variant="warning"
            delay={0.3}
          />
          <StatCard
            title="Notifications"
            titleLocal="Ogeysiisyada"
            value={unreadNotifications.length}
            subtitle="Unread messages"
            icon={Bell}
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Appointments */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Upcoming Appointments
                </h2>
                <p className="text-sm text-muted-foreground">Ballamaha soo socda</p>
              </div>
              <Link to="/appointments">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingAppointments.slice(0, 3).map((appointment, index) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  variant="compact"
                  delay={index * 0.1}
                />
              ))}
              {upcomingAppointments.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center"
                >
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 font-medium text-foreground">
                    No upcoming appointments
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ma jiraan ballamo soo socda
                  </p>
                  <Link to="/appointments">
                    <Button variant="medical" size="sm" className="mt-4">
                      Book Now
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Actions & Health Tips */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
              <p className="text-xs text-muted-foreground">Ficilada degdegga ah</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link to="/appointments">
                  <Button
                    variant="medical"
                    className="h-auto w-full flex-col gap-2 py-4"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Book Appointment</span>
                  </Button>
                </Link>
                <Link to="/records">
                  <Button
                    variant="medical"
                    className="h-auto w-full flex-col gap-2 py-4"
                  >
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Lab Results</span>
                  </Button>
                </Link>
                <Link to="/records">
                  <Button
                    variant="medical"
                    className="h-auto w-full flex-col gap-2 py-4"
                  >
                    <Pill className="h-5 w-5" />
                    <span className="text-xs">Prescriptions</span>
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button
                    variant="medical"
                    className="h-auto w-full flex-col gap-2 py-4"
                  >
                    <Clock className="h-5 w-5" />
                    <span className="text-xs">Medical History</span>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Health Tip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="overflow-hidden rounded-xl border border-success/20 bg-success-light"
            >
              <div className="flex items-center gap-3 border-b border-success/20 bg-success/10 px-5 py-3">
                <Heart className="h-5 w-5 text-success" />
                <span className="font-medium text-success">Health Tip</span>
                <Badge className="ml-auto bg-success/20 text-success">Daily</Badge>
              </div>
              <div className="p-5">
                <p className="text-sm text-foreground">
                  Stay hydrated! Drink at least 8 glasses of water daily to maintain
                  good health.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Biyo cab! Cab ugu yaraan 8 koob biyaha maalin walba si aad
                  caafimaadkaaga u ilaaliso.
                </p>
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border border-destructive/20 bg-destructive/5 p-5"
            >
              <h3 className="font-semibold text-destructive">Emergency</h3>
              <p className="text-xs text-muted-foreground">Xaaladaha degdegga ah</p>
              <p className="mt-3 text-2xl font-bold text-foreground">
                +252 61 555 0911
              </p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
