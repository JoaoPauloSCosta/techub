import { defineVitestConfig } from '@nuxt/test-utils/config'
import { config } from 'dotenv'

config()

export default defineVitestConfig({
    test: {
        environment: 'happy-dom'
    }
})
