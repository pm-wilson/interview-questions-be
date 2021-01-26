const fs = require('fs');
const pool = require('../utils/pool');
const Question = require('./Question');

describe('Question model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Creates a new question and adds to the database and finds it by id', async() => {
    const createdQuestion = await Question.insert({
      question: 'In JavaScript what is the difference between null and undefined?',
      answer: 'null is an explicit nothing and has a typeof object, undefined has been declared and not yet assigned and has a typeof undefined. null == undefined //true. null === undefined //false',
      hint: 'One is automatically applied when something is forgotten, the other is intentional.',
      category: 'tech',
      tags: ['JavaScript', 'FrontEndBackEnd'],
      links: ['https://www.youtube.com/watch?v=QVt0XfnU2Hw', 'https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript']
    });

    const foundQuestion = await Question.findById(createdQuestion.id);

    expect (foundQuestion).toEqual(createdQuestion);
  });

  it('Creates a question, updates it and finds the updated question', async() => {
    const createdQuestion = await Question.insert({
      question: 'In JavaScript what is the difference between null and undefined?',
      answer: 'null is an explicit nothing and has a typeof object, undefined has been declared and not yet assigned and has a typeof undefined. null == undefined //true. null === undefined //false',
      hint: 'One is automatically applied when something is forgotten, the other is intentional.',
      category: 'tech',
      tags: ['JavaScript', 'FrontEndBackEnd'],
      links: []
    });

    const updatedQuestion = await Question.updateById(createdQuestion.id, {
      question: 'In JavaScript what is the difference between null and undefined?',
      answer: 'null is an explicit nothing and has a typeof object, undefined has been declared and not yet assigned and has a typeof undefined. null == undefined //true. null === undefined //false',
      hint: 'One is automatically applied when something is forgotten, the other is intentional.',
      category: 'tech',
      tags: ['JavaScript', 'FrontEndBackEnd'],
      links: ['https://www.youtube.com/watch?v=QVt0XfnU2Hw', 'https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript']
    });

    const foundQuestions = await Question.find();

    expect(foundQuestions[0]).toEqual(updatedQuestion);
  });

  it('Creates two questions and deletes one and finds only the remaining when searching all', async() => {
    const createdQuestion = await Question.insert({
      question: 'Why did the chicken cross the road?',
      answer: 'To learn how to code',
      hint: 'One is automatically applied when something is forgotten, the other is intentional.',
      category: 'tech',
      tags: ['JavaScript', 'FrontEndBackEnd'],
      links: []
    });

    const createdQuestion2 = await Question.insert({
      question: 'In JavaScript what is the difference between null and undefined?',
      answer: 'null is an explicit nothing and has a typeof object, undefined has been declared and not yet assigned and has a typeof undefined. null == undefined //true. null === undefined //false',
      hint: 'One is automatically applied when something is forgotten, the other is intentional.',
      category: 'tech',
      tags: ['JavaScript', 'FrontEndBackEnd'],
      links: ['https://www.youtube.com/watch?v=QVt0XfnU2Hw', 'https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript']
    });

    Question.deleteById(createdQuestion.id);

    const foundQuestions = await Question.find();

    expect(foundQuestions[0]).toEqual(createdQuestion2);
  });
});
