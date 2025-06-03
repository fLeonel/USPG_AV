import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";

/**
 * Caso de uso: Actualizar un recordatorio existente.
 *
 * Esta clase encapsula la lógica para actualizar un recordatorio utilizando el repositorio correspondiente.
 */
export class UpdateReminder {
  /**
   * Crea una instancia del caso de uso `UpdateReminder`.
   *
   * @param repo - Repositorio encargado de las operaciones relacionadas con recordatorios.
   */
  constructor(private repo: ReminderRepository) {}

  /**
   * Ejecuta el caso de uso para actualizar un recordatorio.
   *
   * @param reminder - Objeto `Reminders` con los datos actualizados del recordatorio.
   * @returns Una promesa que se resuelve cuando el recordatorio ha sido actualizado exitosamente.
   */
  async execute(reminder: Reminders): Promise<void> {
    return await this.repo.update(reminder);
  }
}
