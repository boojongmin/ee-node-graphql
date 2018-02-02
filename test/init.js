// var express = require('express');
// var graphqlHTTP = require('express-graphql');

var AWS = require('aws-sdk');
AWS.config.update({'region': 'ap-southeast-1'});

ddb = new AWS.DynamoDB.DocumentClient();

var { graphql } = require('graphql');
const schema = require('../src/schema/schema.js');
const root = require('../src/service/service.js');

module.exports.graphql = function (data) {
  return graphql(schema, data.query, root);
};

module.exports.dynamoDB = ddb;
