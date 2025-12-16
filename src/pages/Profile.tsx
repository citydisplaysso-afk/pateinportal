import { motion } from 'framer-motion';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Edit2,
  Download,
  Bell,
  Globe,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { mockPatient, hospitalInfo } from '@/data/mockData';
import { format, parseISO } from 'date-fns';

export default function Profile() {
  const fullName = `${mockPatient.name.given.join(' ')} ${mockPatient.name.family}`;
  const age = new Date().getFullYear() - new Date(mockPatient.birthDate).getFullYear();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-md"
        >
          <div className="bg-gradient-hero p-6 lg:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold text-white backdrop-blur-sm">
                {mockPatient.name.given[0][0]}
                {mockPatient.name.family[0]}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white lg:text-3xl">
                  {fullName}
                </h1>
                <p className="mt-1 text-white/70">Patient ID: {mockPatient.id}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge className="bg-white/20 text-white">
                    <Shield className="mr-1 h-3 w-3" />
                    Verified Patient
                  </Badge>
                  <Badge className="bg-white/20 text-white">Active Since 2023</Badge>
                </div>
              </div>
              <Button
                variant="soft"
                className="bg-white/20 text-white hover:bg-white/30"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid gap-4 p-6 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date of Birth</p>
                <p className="font-medium text-foreground">
                  {format(parseISO(mockPatient.birthDate), 'MMM d, yyyy')}
                </p>
                <p className="text-xs text-muted-foreground">{age} years old</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="font-medium capitalize text-foreground">
                  {mockPatient.gender}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{mockPatient.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">
                  {mockPatient.address.city}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Personal Information
              </h2>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Xogta Shakhsiga / Your personal details
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium text-foreground">{fullName}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">National ID (e-Aqoonsi)</span>
                <span className="font-medium text-foreground">
                  {mockPatient.nationalId}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">
                  {mockPatient.email || 'Not provided'}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Address</span>
                <span className="font-medium text-foreground">
                  {mockPatient.address.district}, {mockPatient.address.city}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Ogeysiisyada / Manage how you receive updates
            </p>

            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">Appointment Reminders</Label>
                    <p className="text-xs text-muted-foreground">
                      Xusuusinta ballamaha
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">Lab Results Ready</Label>
                    <p className="text-xs text-muted-foreground">
                      Natiijooyinka shaybaarka
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">SMS Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Fariimaha SMS-ka
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="font-medium">Language / Luuqadda</Label>
                    <p className="text-xs text-muted-foreground">Somali & English</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Hospital Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">
              Hospital Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Xogta Isbitaalka / Your registered hospital
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {hospitalInfo.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hospitalInfo.nameLocal}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {hospitalInfo.address}
                  </p>
                  <p className="text-sm text-muted-foreground">{hospitalInfo.city}</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">General Inquiries</p>
                  <p className="font-medium text-foreground">{hospitalInfo.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Emergency</p>
                  <p className="font-medium text-destructive">
                    {hospitalInfo.emergencyPhone}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data & Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">Data & Privacy</h2>
            <p className="text-sm text-muted-foreground">
              Xogta iyo Asturnaanta / Manage your health data
            </p>

            <div className="mt-6 space-y-4">
              <Button variant="medical" className="w-full justify-start gap-3">
                <Download className="h-5 w-5" />
                Download My Health Data
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <User className="h-5 w-5" />
                Linked Family Members
              </Button>

              <div className="rounded-lg bg-muted/50 p-4 text-sm">
                <p className="font-medium text-foreground">Data Security</p>
                <p className="mt-1 text-muted-foreground">
                  Your health data is encrypted and stored securely. Only you and your
                  authorized healthcare providers can access your records.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
