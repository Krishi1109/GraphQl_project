const { projects, clients } = require("../sampleData");

const Project = require("../models/Project")
const Client = require("../models/Client")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
  
});


// Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client:{
      type : ClientType,
      resolve(parent, args) {
        return clients.find((client) => client.id == parent.clientId)
      }
    }
  }),
}); 


const RootQuery = new GraphQLObjectType({
  name: "RootQeryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find()
      }, 
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(aegs.id)
      
      },
    },
    projects:{
      type: new GraphQLList(ProjectType),
      resolve(parent, args){
        return Project.find()
      }
    },
    project : {
      type:ProjectType,
      args:{id : {type : GraphQLID}},
      resolve(parent, args) {
        return Project.findById(aegs.id)
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
