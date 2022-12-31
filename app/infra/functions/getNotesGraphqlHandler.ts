import { AppSyncResolverHandler } from "aws-lambda";

import GetNotes from "../../core/usecase/getNotes";

import InMemoryDayRepository from "../repository/InMemoryDayRepository";

const repo = new InMemoryDayRepository();

type EventType = {
  dayId: string;
};

type NoteType = {
  content: string;
};

export const handler: AppSyncResolverHandler<EventType, NoteType[]> = async (
  event,
  _context
) => {
  const getNotesUseCase = new GetNotes(repo);

  console.log(event);

  const notes = getNotesUseCase.execute("2").map(
    (note) =>
      ({
        content: note,
      } as NoteType)
  );

  return notes;
};
