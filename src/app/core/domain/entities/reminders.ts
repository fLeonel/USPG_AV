import { Timestamp } from "firebase/firestore";

/**
 * Representa un recordatorio creado por un usuario.
 */
export class Reminders {
  /**
   * Crea una nueva instancia de `Reminders`.
   *
   * @param id - Identificador único del recordatorio.
   * @param title - Título del recordatorio.
   * @param date - Fecha del recordatorio.
   * @param isCompleted - Indica si el recordatorio ya fue completado.
   * @param user_id - ID del usuario que creó el recordatorio.
   * @param category - Categoría del recordatorio (por defecto es "General").
   */

  constructor(
    public id: string,
    public title: string,
    public date: Date,
    public isCompleted: boolean,
    public user_id: string,
    public category: string = "General"
  ) {}

  /**
   * Crea una instancia de `Reminders` a partir de un objeto JSON.
   *
   * @param id - Identificador único del recordatorio.
   * @param json - Objeto con los datos del recordatorio.
   * Puede contener un `date` como `Timestamp` de Firebase o como `Date`.
   * @returns Una nueva instancia de `Reminders`.
   */
  static fromJson(
    id: string,
    json: {
      title: string;
      date: Timestamp | Date;
      isCompleted: boolean;
      user_id: string;
      category?: string;
    }
  ): Reminders {
    return new Reminders(
      id,
      json.title,
      json.date instanceof Timestamp ? json.date.toDate() : new Date(json.date),
      json.isCompleted,
      json.user_id,
      json.category ?? "General"
    );
  }

  /**
   * Convierte la instancia actual de `Reminders` a un objeto JSON.
   *
   * @returns Un objeto que representa los datos del recordatorio.
   */
  toJson() {
    return {
      title: this.title,
      date: this.date,
      isCompleted: this.isCompleted,
      user_id: this.user_id,
      category: this.category,
    };
  }
}
