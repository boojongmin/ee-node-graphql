// var express = require('express');
// var graphqlHTTP = require('express-graphql');

var { graphql } = require('graphql');
const schema = require('./src/schema/schema.js');
const root = require('./src/service/service.js');

module.exports.handler = (event, context, callback) => {
   graphql(schema, event.query, root, undefined).then((response) => {
    callback(undefined, response);
  });
}
