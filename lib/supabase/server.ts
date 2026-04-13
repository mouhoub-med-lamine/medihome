import { MOCK_PROFILES, MOCK_REQUESTS } from '../mock-data'

export async function createClient() {
    return {
        auth: {
            getUser: async () => ({ data: { user: { id: 'demo-user-id', email: 'doctor@demo.com' } }, error: null }),
            getSession: async () => ({ data: { session: { user: { id: 'demo-user-id' } } }, error: null }),
            signOut: async () => ({ error: null }),
        },
        from: (table: string) => ({
            select: () => ({
                eq: () => ({
                    single: async () => ({
                        data: table === 'profiles' ? MOCK_PROFILES[1] : MOCK_REQUESTS[0],
                        error: null
                    }),
                    order: () => ({ data: table === 'consultation_requests' ? MOCK_REQUESTS : [], error: null })
                }),
                order: () => ({ data: table === 'consultation_requests' ? MOCK_REQUESTS : [], error: null }),
                single: async () => ({
                    data: table === 'profiles' ? MOCK_PROFILES[1] : MOCK_REQUESTS[0],
                    error: null
                }),
            }),
            insert: () => ({
                select: () => ({
                    single: async () => ({ data: { id: 'demo-id' }, error: null })
                })
            }),
            update: () => ({
                eq: () => ({ error: null })
            })
        })
    } as any
}
