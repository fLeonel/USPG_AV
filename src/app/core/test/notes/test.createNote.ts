import { CreateNote } from "@/usecases/notes/createNote";
import { Note } from "@/domain/entities/notes";
import { NoteRepositoryImpl } from "@/infra/repositories/fiebaseNotesRepository";

describe("CreateNote (integration)", () => {
  it("should create a note using the repository", async () => {
    const repo = new NoteRepositoryImpl();
    const useCase = new CreateNote(repo);

    const note = new Note(
      "note-id-test",
      "user-xyz",
      "Test Title",
      "This is the content",
      false,
      [],
      new Date(),
      new Date(),
    );

    const result = await useCase.execute(note);
    expect(result).toBeUndefined();
  });
});
