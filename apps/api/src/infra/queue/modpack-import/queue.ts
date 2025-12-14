import { Queue } from 'bullmq'
import { connection } from '../connection'

export const MODPACK_IMPORT_QUEUE_NAME = 'modpack-import'

export const modpackImportQueue = new Queue(MODPACK_IMPORT_QUEUE_NAME, {
  connection,
})

export interface ModpackImportJobData {
  modpackId: string
  steamUrl: string
  userId: string // Para notificar o usuário depois, se necessário
}
