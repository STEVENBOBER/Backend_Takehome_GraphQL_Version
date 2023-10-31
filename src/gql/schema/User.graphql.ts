import gql from 'graphql-tag';

export const User = gql`

type User {
  id: String!
  name: String!
  age: Int!
  carModel: String!
  drivingExperienceYears: Int!
},

input UserInput {
  name: String!
  age: Int!
  carModel: String!
  drivingExperienceYears: Int!
},

type Mutation {
  insertUser(input: UserInput!): User!
},

`