/**
 * Formats a date string to a relative time format in Portuguese
 * @param dateString - ISO date string
 * @returns Formatted relative time (e.g., "há 2 dias", "há 1 semana")
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)

    if (diffMinutes < 1) {
        return 'agora'
    }

    if (diffMinutes < 60) {
        return `há ${diffMinutes} min`
    }

    if (diffHours < 24) {
        return diffHours === 1 ? 'há 1 hora' : `há ${diffHours} horas`
    }

    if (diffDays < 7) {
        return diffDays === 1 ? 'há 1 dia' : `há ${diffDays} dias`
    }

    if (diffWeeks < 4) {
        return diffWeeks === 1 ? 'há 1 semana' : `há ${diffWeeks} semanas`
    }

    if (diffMonths < 12) {
        return diffMonths === 1 ? 'há 1 mês' : `há ${diffMonths} meses`
    }

    // Format as date for older content
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

/**
 * Formats a date to a short format
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "30 Jan 2026")
 */
export function formatDateShort(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
