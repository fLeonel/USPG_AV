import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";

/**
 * Caso de uso: Eliminar un recordatorio existente.
 *
 * Esta clase encapsula la lógica para eliminar un recordatorio por su ID.
 */
export class DeleteReminder {
  /**
   * Crea una instancia del caso de uso `DeleteReminder`.
   *
   * @param repo - Repositorio encargado de las operaciones relacionadas con recordatorios.
   */
  constructor(private repo: ReminderRepository) {}

  /**
   * Ejecuta el caso de uso para eliminar un recordatorio.
   *
   * @param id - ID del recordatorio que se desea eliminar.
   * @returns Una promesa que se resuelve cuando el recordatorio ha sido eliminado exitosamente.
   */
  async execute(id: string): Promise<void> {
    return await this.repo.delete(id);
  }
}
