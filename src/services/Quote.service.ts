import { client } from "../db/Connection"
import { head } from "lodash"
import { GraphQLError } from "graphql";
import { IInsertQuoteParams, insertQuote } from "../db/sql/insertQuote.queries"
import {
  getBestThreeQuotesByUserId,
} from "../db/sql/getBestThreeQuotesByUserId.queries"


export const quoteService = {
  insertQuote: async (params: IInsertQuoteParams) => {
    const insertedQuote = head(await insertQuote.run(params, client));
    if (!insertedQuote) {
      console.log("Unable to insert Quote");
      throw new GraphQLError("Quote unable to insert", {
        extensions: {
          code: "Quote Failed to Insert",
          http: { status: 401 },
        },
      });
    }
    return insertedQuote;
  },
  getBestThreeQuotesByUserId: async (
    userId: string
  ) => {
    const bestThreeQuotes = await getBestThreeQuotesByUserId.run(
      { userId },
      client
    );
    // console.log(bestThreeQuotes, `bestThree`)
    return bestThreeQuotes
  }
}