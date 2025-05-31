import { Timestamp } from "firebase/firestore";

export class Reminders {
  constructor(
    public id: string,
    public title: string,
    public date: Date,
    public isCompleted: boolean,
    public user_id: string,
    public category: string = "General",
  ) {}

  static fromJson(
    id: string,
    json: {
      title: string;
      date: Timestamp | Date;
      isCompleted: boolean;
      user_id: string;
      category?: string;
    },
  ): Reminders {
    return new Reminders(
      id,
      json.title,
      json.date instanceof Timestamp ? json.date.toDate() : new Date(json.date),
      json.isCompleted,
      json.user_id,
      json.category ?? "General",
    );
  }

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
