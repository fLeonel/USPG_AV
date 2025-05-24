import { createNoteService } from "@/core/services/noteService";
import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

describe("noteService (unit)", () => {
  const mockRepo: jest.Mocked<NoteRepository> = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAllByUser: jest.fn(),
  };

  const service = createNoteService(mockRepo);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a note", async () => {
    const note = new Note(
      "123",
      "user-1",
      "Test title",
      "Test content",
      false,
      ["unit"],
      new Date(),
      new Date(),
    );

    mockRepo.create.mockResolvedValueOnce(undefined);

    await service.createNote(note);

    expect(mockRepo.create).toHaveBeenCalledWith(note);
  });

  it("should get a note by ID", async () => {
    const note = new Note(
      "xyz",
      "user-1",
      "Title",
      "Content",
      false,
      [],
      new Date(),
      new Date(),
    );

    mockRepo.getById.mockResolvedValueOnce(note);

    const result = await service.getNoteById("xyz");

    expect(mockRepo.getById).toHaveBeenCalledWith("xyz");
    expect(result).toEqual(note);
  });

  it("should delete a note", async () => {
    mockRepo.delete.mockResolvedValueOnce(undefined);

    await service.deleteNote("abc");

    expect(mockRepo.delete).toHaveBeenCalledWith("abc");
  });
});
