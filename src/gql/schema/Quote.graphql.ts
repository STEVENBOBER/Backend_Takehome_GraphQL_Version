import gql from 'graphql-tag';


export const Quote = gql`

type Quote {
  id: String!
  provider: String!
  price: Int!
  customerId: String!
}

input QuoteInput {
  provider: String!
  price: Int!
  customerId: String!
}

type Mutation {
    insertQuote(input: QuoteInput!): Quote!
}

type Query {
    getBestThreeQuotesByUserId(userId: String!): [Quote!]
}
`

