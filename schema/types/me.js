const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');

const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
  name: 'MeType',

  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`,
    },
    contests: {
      type: new GraphQLList(ContestType),
      resolve: (obj, args, { pgPool }) => pgdb(pgPool).getContests(obj),
    },
    contestsCount: {
      type: GraphQLInt,
      resolve: (obj, args, { mPool }) => mdb(mPool).getCounts(obj, 'contestsCount'),
    },
    namesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { mPool }) => mdb(mPool).getCounts(obj, 'namesCount'),
    },
    votesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { mPool }) => mdb(mPool).getCounts(obj, 'votesCount'),
    },
  },
});
