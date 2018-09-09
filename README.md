# GraphQL

## Query Language

Directives (@skip and @include)

Example 
-------

query TestQuery(
    $currentUserName: String!  // ! Means required
    $includeRepos: Boolean!
) {
    github {
        user(username: $currentUserName) {
            githubid: id  // Aliases the response field id to githubid
            company
            avatar_url
            repos @include(if: $includeRepos) {  // Only shows if includeRepos is true
                name
            }
        }
    }
}

Query Variables
{
    "currentUserName": "Ulminator",
    "includeRepos": false
}

Fragment Example
----------------

query TwoUsers($userName1: String!, $userName2: String!) {
    github {
        user1: user(username: $userName1) {
            ...UserInfo  // Use spread operator to find fragment of same name and then spread it
        }
        user2: user(username: $userName2) {
            ...UserInfo
        }
    }
}

fragment UserInfo on GithubUser {  // On GithubUser Type
    id
    company
    avatar_url
}

Inline Fragments to differentiate between subtypes of a type

Mutations also possible (client changes the data)

## Runtime

#### Loading Data

PostgreSQL
----------

1) Create and Insert
createdb contests
psql contests < database/test-pg-data.sql

2) Connect
psql contests

MongoDB
-------
node database/loadTestMongoData.js

Resolve(parent, args, ctx)
--------------------------
Parent
- Null for root field
Args
- Values of field args passed in from the user
Context Object
- Can be passed down from the executor
- Can be anything you want
Info
- Has a bunch of stuff
- { fieldName }

camelCase everything
- Whenever we read an object from the database, we can process it and camelize all of its keys before handing it to the GraphQL executor.
