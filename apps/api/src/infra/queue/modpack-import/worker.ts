import { Worker } from 'bullmq'
import { makeImportModpackUseCase } from '@/domain/modpack/factories/make-import-modpack-use-case'
import { connection } from '../connection'
import { MODPACK_IMPORT_QUEUE_NAME, type ModpackImportJobData } from './queue'

export const modpackImportWorker = new Worker<ModpackImportJobData>(
  MODPACK_IMPORT_QUEUE_NAME,
  async (job) => {
    console.log(
      `[ModpackImportWorker] Processing job ${job.id} for modpack ${job.data.modpackId}`,
    )

    try {
      const importModpackUseCase = makeImportModpackUseCase()
      const result = await importModpackUseCase.execute(
        job.data.modpackId,
        job.data.steamUrl,
      )

      console.log(
        `[ModpackImportWorker] Job ${job.id} completed. Added ${result.addedMods.length} mods.`,
      )

      if (result.errors.length > 0) {
        console.warn(
          `[ModpackImportWorker] Job ${job.id} had errors:`,
          result.errors,
        )
      }

      return result
    } catch (error) {
      console.error(`[ModpackImportWorker] Job ${job.id} failed:`, error)
      throw error
    }
  },
  {
    connection,
    concurrency: 5, // Processar até 5 importações simultaneamente
  },
)

modpackImportWorker.on('completed', (job) => {
  console.log(`[ModpackImportWorker] Job ${job.id} has completed!`)
})

modpackImportWorker.on('failed', (job, err) => {
  console.error(
    `[ModpackImportWorker] Job ${job?.id} has failed with ${err.message}`,
  )
})
