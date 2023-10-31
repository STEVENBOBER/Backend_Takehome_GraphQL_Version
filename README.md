# Backend_Takehome_GraphQL_Version:

This is a GraphQL version of a takehome that I initally did with a REST API.

I did this simply to see how I might've tackled it if it were to be done with GraphQL.
The original challenge is also public on my Github: `https://github.com/STEVENBOBER/Backend_Takehome_Rest_Postgres`

# Set Up Guide (Local Dev)
- git clone 'https://github.com/STEVENBOBER/local-dev-docker-postgres' in order to have a seperate docker container running Postgres
- From within root, run `docker compose up` -- don't worry about seeding anything

# Set Up Guide (Challenge App)
- git clone this repo
- run `npm i` from root dir
- run `npx prisma migrate dev` to apply the migration stack to the up and runnning postgres db
- run `json-server --watch ./json-server/generateInsuranceQuotes.js` in order to turn on the mock server
- run `npm start:dev` to turn the app on


# Usage 
Just click the link in the terminal when the server is started: `http://localhost:4000/graphql`,
to head to the GraphQL Playground. You can then hit `insertUser` with a payload like this.

{
    "name": "Sam",
    "age": 35,
    "carModel": "Nissan",
    "yearsOfDrivingExperience": 15
}

This will return a userId -- hit the Query:`getBestThreeQuotesByUserId` with the recently created `id` to query the quotes.
