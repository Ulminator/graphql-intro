const {
  GraphQLEnumType,
} = require('graphql');

// Using enum to make sure graphQL is aware of the constraint on the contest_status field

// Leftmost key is how it is displayed to the user
// The value in quotes is how the data is stored in the database

module.exports = new GraphQLEnumType({
  name: 'ContestStatusType',

  values: {
    DRAFT: { value: 'draft' },
    PUBLISHED: { value: 'published' },
    ARCHIVED: { value: 'archived' },
  },
});
