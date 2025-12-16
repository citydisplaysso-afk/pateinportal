import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Pill, TestTube, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { LabResultCard } from '@/components/cards/LabResultCard';
import { PrescriptionCard } from '@/components/cards/PrescriptionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockLabResults, mockPrescriptions } from '@/data/mockData';

export default function Records() {
  const [labFilter, setLabFilter] = useState<string>('all');
  const [rxFilter, setRxFilter] = useState<string>('all');

  const filteredLabResults = mockLabResults.filter(
    (result) => labFilter === 'all' || result.status === labFilter
  );

  const filteredPrescriptions = mockPrescriptions.filter(
    (rx) => rxFilter === 'all' || rx.status === rxFilter
  );

  const abnormalCount = mockLabResults.filter((r) => r.isAbnormal).length;
  const pendingCount = mockLabResults.filter((r) => r.status === 'pending').length;
  const activeRxCount = mockPrescriptions.filter((rx) => rx.status === 'active').length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Health Records</h1>
          <p className="text-muted-foreground">
            Diiwaanka Caafimaadka / View your medical records and prescriptions
          </p>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <TestTube className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lab Results</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockLabResults.length}
                  </p>
                </div>
              </div>
              {pendingCount > 0 && (
                <Badge variant="outline" className="bg-warning-light text-warning">
                  {pendingCount} pending
                </Badge>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-success/10 p-2 text-success">
                  <Pill className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prescriptions</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockPrescriptions.length}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-success-light text-success">
                {activeRxCount} active
              </Badge>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2 text-warning">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Review</p>
                <p className="text-2xl font-bold text-foreground">{abnormalCount}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="lab" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-none lg:gap-2">
            <TabsTrigger value="lab" className="gap-2">
              <TestTube className="h-4 w-4" />
              Lab Results
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="gap-2">
              <Pill className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
          </TabsList>

          {/* Lab Results Tab */}
          <TabsContent value="lab" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Laboratory Results
              </h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={labFilter} onValueChange={setLabFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="final">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredLabResults.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredLabResults.map((result, index) => (
                  <LabResultCard
                    key={result.id}
                    result={result}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
              >
                <TestTube className="mx-auto h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No lab results found
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Your lab results will appear here once available
                </p>
              </motion.div>
            )}

            {/* Disclaimer */}
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Important Notice / Ogeysiis</p>
              <p className="mt-1">
                Lab results should be discussed with your doctor. If you have concerns
                about any result, please schedule an appointment.
              </p>
              <p className="mt-1 text-xs">
                Natiijooyinka shaybaarka waa in lala wadaago dhakhtarkaaga. Haddii aad
                walaac ka qabtid natiijo kasta, fadlan ballan qabso.
              </p>
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Your Prescriptions
              </h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={rxFilter} onValueChange={setRxFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredPrescriptions.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredPrescriptions.map((prescription, index) => (
                  <PrescriptionCard
                    key={prescription.id}
                    prescription={prescription}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
              >
                <Pill className="mx-auto h-16 w-16 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No prescriptions found
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Your prescriptions will appear here
                </p>
              </motion.div>
            )}

            {/* Pharmacy Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-primary/20 bg-primary-light p-4"
            >
              <h3 className="font-semibold text-primary">Hospital Pharmacy</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Farmashiyaha Isbitaalka
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button variant="medical" size="sm">
                  Find Nearest Pharmacy
                </Button>
                <Button variant="outline" size="sm">
                  Pharmacy Hours
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
