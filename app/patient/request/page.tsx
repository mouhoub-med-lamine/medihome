import RequestWizard from '@/components/patient/RequestWizard'
import { Card, CardContent } from '@/components/ui/card'

export default function RequestPage() {
    return (
        <div className="max-w-3xl mx-auto py-4 md:py-10">
            <div className="mb-10 text-center space-y-2">
                <h1 className="text-4xl font-black italic tracking-tight underline decoration-blue-500 underline-offset-8 decoration-4">NOUVELLE DEMANDE</h1>
                <p className="text-gray-500 font-medium">Répondez à quelques questions pour trouver le meilleur médecin.</p>
            </div>

            <Card className="border-none shadow-2xl shadow-blue-100 dark:shadow-none bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 md:p-12">
                    <RequestWizard />
                </CardContent>
            </Card>
        </div>
    )
}
