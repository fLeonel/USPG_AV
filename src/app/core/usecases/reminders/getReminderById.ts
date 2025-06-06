import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";

/**
 * Caso de uso: Obtener un recordatorio por su ID.
 *
 * Esta clase encapsula la lógica para recuperar un recordatorio específico mediante su identificador.
 */
export class GetReminderById {
  /**
   * Crea una instancia del caso de uso `GetReminderById`.
   *
   * @param repo - Repositorio encargado de las operaciones relacionadas con recordatorios.
   */
  constructor(private repo: ReminderRepository) {}

  /**
   * Ejecuta el caso de uso para obtener un recordatorio por su ID.
   *
   * @param id - ID del recordatorio que se desea obtener.
   * @returns Una promesa que resuelve con el recordatorio si se encuentra, o `null` si no existe.
   */
  async execute(id: string): Promise<Reminders | null> {
    return await this.repo.getById(id);
  }
}
