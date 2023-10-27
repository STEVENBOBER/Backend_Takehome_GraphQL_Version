import gql from 'graphql-tag';

export const Quote = gql`

type Quote {
  id: String!
  provider: String!
  price: Int!
  customer: User
  customerId: String!
}

input QuoteInput {

  provider: String!
  price: Int!
  customer: UserInput
  customerId: String!

}

type Mutation {
    insertQuote(input: QuoteInput!): Quote!
}

type Query {
    getBestThreeQuotesByUserId(userId: String!): [Quote!]
}

`