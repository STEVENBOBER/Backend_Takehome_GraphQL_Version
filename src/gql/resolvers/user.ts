import { determineInsuranceEchelon } from "../../utils/determineInsuranceEchelon";
import { userService } from "../../services";
import { quoteService } from '../../services';
import { IInsertUserResult } from '../../db/sql/insertUser.queries';
import { GraphQLError } from 'graphql';

interface RelevantQuote {
  provider: string;
  price: number;
}

const resolvers = {
  Mutation: {
    insertUser: async (parent: any, args: any, context: any) => {
      const { input } = args

      let savedUser: IInsertUserResult | null

      if (!input) {
        throw new GraphQLError('Missing user input')
      }

      savedUser = await userService.insertUser(input)

      const insuranceEchelon = determineInsuranceEchelon(
        input.age,
        input.drivingExperienceYears
      );


      const quoteResponse = await fetch(`http://localhost:3000/quotes`);
      const quotes: any = await quoteResponse.json();
      const relevantQuotes = quotes[insuranceEchelon];
      await Promise.all(
        relevantQuotes.map(async ({ provider, price }: RelevantQuote) => {
          const insertedQuote = await quoteService.insertQuote({
            provider,
            price: price,
            customerId: savedUser?.id,
          });
          return insertedQuote;
        })
      ).then((values) => {
        // console.log(values, `values`)
        return values
      })

      return savedUser

    }
  },
}

export default resolvers;