import { quoteService } from "../../services";
import { GraphQLError } from "graphql/error";



export const userQuote = {
  Mutation: {
    insertQuote: async (parent: any, args: any, context: any) => {
      const { input } = args
      const savedQuote = await quoteService.insertQuote(input);
      return savedQuote
    }
  },
  Query: {
    getBestThreeQuotesByUserId: async (parent: any, args: any, context: any) => {
      const { userId } = args

      if (!userId) {
        throw new GraphQLError('Missing userId parameter');
      }

      const bestThree = await quoteService.getBestThreeQuotesByUserId(userId);
      return bestThree
    }
  }

}
