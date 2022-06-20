const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const users = [
  { id: "14", firstName: "Danny", age: 21, companyid: "1" },
  { id: "47", firstName: "Aman", age: 20, companyid: "2" },
  { id: "48", firstName: "Aman", age: 20, companyid: "2" },
];

const companies = [
  { id: "1", name: "apple", description: "iphone" },
  {
    id: "2",
    name: "google",
    description: "pixel",
  },
];

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new graphql.GraphQLList(UserType),
      resolve(parentValue, args) {
        console.log(parentValue);
        return users.filter((usr) => usr.companyid == parentValue.id);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: {
      type: GraphQLInt,
    },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        console.log(parentValue);
        return _.find(companies, { id: parentValue.companyid });
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return _.find(companies, { id: args.id });
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
