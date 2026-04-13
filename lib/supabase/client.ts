import { MOCK_REQUESTS, MOCK_PROFILES } from '../mock-data'

export function createClient() {
    return {
        auth: {
            getUser: async () => ({ data: { user: { id: 'demo-user-id' } }, error: null }),
            onAuthStateChange: (cb: any) => {
                return { data: { subscription: { unsubscribe: () => { } } } }
            }
        },
        from: (table: string) => ({
            select: () => ({
                eq: () => ({
                    single: async () => ({ data: table === 'profiles' ? MOCK_PROFILES[1] : MOCK_REQUESTS[0], error: null }),
                    order: () => ({ data: table === 'consultation_requests' ? MOCK_REQUESTS : [], error: null })
                }),
                order: () => ({ data: table === 'consultation_requests' ? MOCK_REQUESTS : [], error: null }),
            }),
            channel: () => ({
                on: () => ({
                    on: () => ({
                        subscribe: () => { }
                    })
                })
            })
        }),
        removeChannel: () => { }
    } as any
}
