import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const generatePrescriptionPDF = (data: {
    doctor: { name: string; specialization: string; license: string },
    patient: { name: string; age: string },
    medications: { name: string; dosage: string; frequency: string }[],
    date: string,
    id: string
}) => {
    const doc = new jsPDF()

    // 1. Header (Doctor Info)
    doc.setFontSize(22)
    doc.setTextColor(26, 86, 219) // Blue-600
    doc.text('MediHome', 20, 20)

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text(`Dr. ${data.doctor.name}`, 20, 35)
    doc.setFontSize(10)
    doc.text(data.doctor.specialization, 20, 40)
    doc.text(`Licence: ${data.doctor.license}`, 20, 45)

    // 2. Patient Info & Date
    doc.setDrawColor(230, 230, 230)
    doc.line(20, 55, 190, 55)

    doc.setFontSize(12)
    doc.text(`Patient: ${data.patient.name}`, 20, 65)
    doc.text(`Âge: ${data.patient.age}`, 20, 72)
    doc.text(`Date: ${data.date}`, 150, 65)
    doc.text(`ID Reference: #${data.id.slice(0, 8)}`, 150, 72)

    // 3. Medications Table
    // @ts-expect-error - jspdf-autotable types mismatch
    doc.autoTable({
        startY: 85,
        head: [['Médicament', 'Dosage', 'Fréquence']],
        body: data.medications.map(m => [m.name, m.dosage, m.frequency]),
        headStyles: { fillColor: [26, 86, 219], fontSize: 12 },
        bodyStyles: { fontSize: 10 },
        columnStyles: {
            0: { fontStyle: 'bold' }
        }
    })

    // 4. Footer & Signature
    // @ts-expect-error - jspdf-autotable internal property
    const finalY = doc.lastAutoTable.finalY || 150
    doc.setFontSize(10)
    doc.setTextColor(150, 150, 150)
    doc.text("Signature du médecin (Signé numériquement via MediHome)", 20, finalY + 30)

    // Save PDF
    doc.save(`ordonnance_medihome_${data.id.slice(0, 8)}.pdf`)
}
