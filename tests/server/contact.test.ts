import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('Contact API', async () => {
    await setup({
        server: true
    })

    it('SHOULD reject request when honeypot is filled (Anti-Spam)', async () => {
        // We expect a 400 error
        try {
            await $fetch('/api/contact', {
                method: 'POST',
                body: {
                    name: 'Spam Bot',
                    email: 'bot@spam.com',
                    message: 'Spam',
                    website: 'I am a bot' // Honeypot filled
                }
            })
            // If it doesn't throw, fail the test
            expect(true).toBe(false)
        } catch (e: any) {
            expect(e.response.status).toBe(400)
        }
    })

    it('SHOULD reject request when fields are missing', async () => {
        try {
            await $fetch('/api/contact', {
                method: 'POST',
                body: { name: 'John' } // Missing email/message
            })
            expect(true).toBe(false)
        } catch (e: any) {
            expect(e.response.status).toBe(400)
        }
    })

    /* 
     * Note: We are skipping the SUCCESS test here to avoid sending real emails 
     * during automated testing, unless we mock the Resend import.
     * For now, validating security/validation logic is sufficient.
     */
})
