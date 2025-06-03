import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";

/**
 * Caso de uso: Crear un nuevo recordatorio.
 *
 * Esta clase encapsula la lógica para crear un recordatorio utilizando el repositorio correspondiente.
 */
export class CreateReminder {
  /**
   * Crea una instancia del caso de uso `CreateReminder`.
   *
   * @param repo - Repositorio encargado de las operaciones relacionadas con recordatorios.
   */
  constructor(private repo: ReminderRepository) {}

  /**
   * Ejecuta el caso de uso para crear un recordatorio.
   *
   * @param reminder - Objeto `Reminders` con los datos del recordatorio a crear.
   * @returns Una promesa que se resuelve cuando el recordatorio ha sido creado exitosamente.
   */
  async execute(reminder: Reminders): Promise<void> {
    return await this.repo.create(reminder);
  }
}
