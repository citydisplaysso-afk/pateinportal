// FHIR-inspired types for the Somali Patient Portal

export interface Patient {
  id: string;
  nationalId: string; // e-Aqoonsi ID
  name: {
    given: string[];
    family: string;
  };
  phone: string;
  email?: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  address: {
    city: string;
    district?: string;
    country: string;
  };
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  status: 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'pending';
  type: string;
  description: string;
  start: string;
  end: string;
  doctor: {
    name: string;
    specialty: string;
    avatar?: string;
  };
  location?: string;
  notes?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  status: 'final' | 'pending' | 'preliminary';
  category: string;
  testName: string;
  code: string;
  value: number | string;
  unit?: string;
  referenceRange?: string;
  isAbnormal?: boolean;
  performedDate: string;
  reportedDate: string;
  orderedBy: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  status: 'active' | 'completed' | 'cancelled';
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedDate: string;
  prescribedBy: string;
  refillsRemaining?: number;
  instructions?: string;
}

export interface Notification {
  id: string;
  type: 'appointment' | 'result' | 'prescription' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
