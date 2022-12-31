import { APIGatewayProxyHandler } from "aws-lambda";
import GetNotes from "../../core/usecase/getNotes";
import InMemoryDayRepository from "../repository/InMemoryDayRepository";

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const getNotesUseCase = new GetNotes(new InMemoryDayRepository());

  const notes = getNotesUseCase.execute("2");

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: notes,
    }),
  };
};
