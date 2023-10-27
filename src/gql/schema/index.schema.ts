// import { typeDefs as ScalarName } from "graphql-scalars";
import { Quote } from "./Quote.graphql";
import { User } from "./User.graphql";

const schema = [
  // ...ScalarName,
  Quote,
  User
]

export default schema;