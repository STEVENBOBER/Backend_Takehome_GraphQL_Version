import NodeCache from "node-cache";
import { quoteService } from "../../services";
import { GraphQLError } from "graphql";

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 60 });

const resolvers = {
  Mutation: {
    insertQuote: async (parent: any, args: any, context: any) => {
      const { input } = args
      // console.log(input, `inputQuote`)
      const savedQuote = quoteService.insertQuote(input);
      return savedQuote
    }
  },
  Query: {
    getBestThreeQuotesByUserId: async (parent: any, args: any, context: any) => {
      const { userId } = args

      const bestThree = await quoteService.getBestThreeQuotesByUserId(userId);

      const cachedBestThree = myCache.get(JSON.stringify(userId));

      if (!userId) {
        throw new GraphQLError("Missing userId parameter")
      }

      if (cachedBestThree) {
        myCache.set(JSON.stringify(userId), bestThree);
        return;
      }

      return bestThree
    }
  }

}

export default resolvers;