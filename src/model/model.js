var AWS = require('aws-sdk');
AWS.config.update({'region': 'ap-southeast-1'});

dynamoDB = new AWS.DynamoDB.DocumentClient();

const crypto = require('crypto');

class Member {
  constructor(id, {name, email, password}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static findById(id) {
    const params = {
        TableName: 'loginterview.ee',
        Key: {
          "id": id
        },
        // name은 예약어라서 사용할 수 없다.(거지같네...)
        ProjectionExpression: "id, #member",
        // ProjectionExpression: "id, #name, email, password ",
        ExpressionAttributeNames: {
          "#member": "member"
        }

    };
    return dynamoDB.get(params).promise();
  }

  static saveMember(memberInput) {
    const m = memberInput;
    const hashedPassword = crypto.createHmac('sha256', m.id)
                        .update(m.password)
                        .digest('hex');
    const params = {
      TableName: 'loginterview.ee',
      Item: {
        id: m.id,
        member: {           
          name: m.name,
          email: m.email,
          password: hashedPassword,
        },
        // questions: []
      }
    }
    return dynamoDB.put(params).promise()
  }

  static deleteMember(id) {
    const params = {
      TableName: 'loginterview.ee',
      Key: {
        id: id,
      }
    }
    return dynamoDB.delete(params).promise()
  }
}

exports.Member = Member;

class Question {
  constructor(id, jobName, questionDetails) {
    this.id = id;
    this.jobName = jobName;
    this.questionDetails = questionDetails;
  }
  static createQuestion(questionInput) {
    const q = questionInput;
    const params = {
      TableName: 'loginterview.ee',
      Key: {
        id: q.id
      },
      UpdateExpression: 'SET questions = list_append(if_not_exists(questions, :empty_list), :q)',
      ExpressionAttributeValues: {
        ':q': [{jobName: q.jobName, questionDetails: q.questionDetails} ],
        ':empty_list': []
      },
      ReturnValues: "UPDATED_NEW"
    }
    return dynamoDB.update(params).promise();
  }
}

exports.Question = Question;

/* below is sample */
exports.Message = class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

exports.RandomDie = class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}