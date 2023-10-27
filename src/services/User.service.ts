import { head } from "lodash";
import { client } from '../db/Connection'
import { GraphQLError } from "graphql";
import { IInsertUserParams, insertUser } from "../db/sql/insertUser.queries";

export const userService = {
  insertUser: async (params: IInsertUserParams) => {
    const insertedUser = head(await insertUser.run(params, client));
    // console.log(insertedUser, `II`)
    if (!insertedUser) {
      console.log("Unable to insert user");
      throw new GraphQLError("Assignment unable to user", {
        extensions: {
          code: "User Failed to Insert",
          http: { status: 401 },
        },
      });
    }
    return insertedUser;
  },
};