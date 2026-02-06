import { defineEventHandler, readBody, createError } from 'h3'

const DESTINATION_EMAIL = "joaopsilvacosta1984@gmail.com"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        // 1. Honeypot Check (Anti-Spam)
        // If the hidden 'website' field is filled, it's likely a bot.
        if (body.website) {
            // Reject silently or with 400 as requested. 
            // Using 400 to indicate bad request to the caller.
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request: Bot detected'
            })
        }

        // 2. Validate required fields
        if (!body.name || !body.email || !body.message) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields'
            })
        }

        // 3. Send Email via Resend
        // We import dynamically or top-level. Since it's nitro, top-level is fine if package is installed.
        // However, better to keep imports together. I will add the import at the top of the file in a separate edit if needed, 
        // OR I can use a dynamic import here if I haven't added it yet. 
        // Let's rewrite the whole file in the next step to be clean, but for this tool I must use chunks.
        // Actually, I can use the replace_file_content to replace the whole simulation block.

        const config = useRuntimeConfig()

        if (!config.resendApiKey) {
            console.error('RESEND_API_KEY is missing in runtimeConfig')
            throw createError({
                statusCode: 500,
                statusMessage: 'Server configuration error'
            })
        }

        // Import Resend class
        const { Resend } = await import('resend')
        const resend = new Resend(config.resendApiKey)

        const { data, error: resendError } = await resend.emails.send({
            from: 'TechHub Contact <onboarding@resend.dev>', // Default for testing/unverified domains
            to: [DESTINATION_EMAIL],
            replyTo: body.email,
            subject: `🔔 Novo Contato: ${body.name}`,
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h2>Nova mensagem do formulário de contato</h2>
                    <p><strong>Nome:</strong> ${body.name}</p>
                    <p><strong>Email:</strong> ${body.email}</p>
                    <hr />
                    <h3>Mensagem:</h3>
                    <p style="background-color: #f4f4f5; padding: 15px; border-radius: 5px;">
                        ${body.message.replace(/\n/g, '<br>')}
                    </p>
                </div>
            `
        })

        if (resendError) {
            console.error('Resend Error:', resendError)
            throw createError({
                statusCode: 500,
                statusMessage: `Failed to send email: ${resendError.message || resendError.name || 'Unknown error'}`
            })
        }

        // 4. Return Success
        return { success: true, id: data?.id }

    } catch (error: any) {
        // If it's already an h3 error, rethrow it
        if (error.statusCode) {
            throw error
        }

        // Fallback error
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})
