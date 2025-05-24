export class Reminder {
  constructor(
    public id: string,
    public title: string,
    public date: Date,
    public isCompleted: boolean,
    public user_id: string,
  ) {}
  static fromJson(id: string, json: Record<string, any>): Reminder {
    return new Reminder(
      id,
      json.title,
      json.dat.toDate?.() ?? new Date(json.date),
      json.isCompleted,
      json.user_id,
    );
  }

  toJson() {
    return {
      title: this.title,
      date: this.date,
      isCompleted: this.isCompleted,
      user_id: this.user_id,
    };
  }
}
