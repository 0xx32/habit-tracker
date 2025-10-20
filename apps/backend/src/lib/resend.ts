import { Resend } from 'resend'

import { APP_CONFIG } from '@/config/app.config'

export const resendClient = new Resend(APP_CONFIG.RESEND_API_KEY)
