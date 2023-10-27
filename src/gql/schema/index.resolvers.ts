import userResolver from '../resolvers/user'
import userQuote from '../resolvers/quote'


const resolvers = {
  Query: {
    ...userQuote.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...userQuote.Mutation
  }
}

export default resolvers