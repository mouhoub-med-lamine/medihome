export const MOCK_PROFILES = [
    {
        id: 'admin-1',
        email: 'admin@demo.com',
        full_name: 'Administrateur MediHome',
        role: 'admin',
    },
    {
        id: 'doctor-1',
        email: 'doctor@demo.com',
        full_name: 'Dr. Jean Dupont',
        role: 'doctor',
        doctor_profile: {
            specialty: 'Généraliste',
            hospital: 'Hôpital Central',
            phone: '0123456789',
        }
    },
    {
        id: 'patient-1',
        email: 'patient@demo.com',
        full_name: 'Alice Martin',
        role: 'patient',
        phone: '0612345678',
        gender: 'F',
        date_of_birth: '1990-05-15',
    }
];

export const MOCK_REQUESTS = [
    {
        id: 'req-1',
        patient_id: 'patient-1',
        status: 'pending',
        address: '12 Rue de la Paix, Paris',
        reason: 'Fièvre et toux persistante depuis 2 jours',
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        patient_name: 'Alice Martin',
        patient_phone: '0612345678',
    },
    {
        id: 'req-2',
        patient_id: 'patient-2',
        status: 'pending',
        address: '45 Avenue Foch, Lyon',
        reason: 'Douleurs abdominales aiguës',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        patient_name: 'Marc Lefebvre',
        patient_phone: '0789456123',
    }
];

export const MOCK_DOCTORS = [
    {
        id: 'doctor-1',
        full_name: 'Dr. Jean Dupont',
        specialty: 'Généraliste',
        status: 'available',
    },
    {
        id: 'doctor-2',
        full_name: 'Dr. Sarah Smith',
        specialty: 'Pédiatre',
        status: 'available',
    }
];
