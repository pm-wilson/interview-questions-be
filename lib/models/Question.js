const pool = require('../utils/pool');

class Question {
  id;
  name;
  address;
  length;
  elevation;
  note;

  constructor(row) {
    this.id = row.id;
    this.question = row.question;
    this.answer = row.answer;
    this.tags = row.tags;
    this.links = row.links;
  }

  static async insert(question) {
    const { rows } = await pool.query(
      'INSERT INTO questions (question, answer, tags, links) VALUES ($1, $2, $3, $4) RETURNING *',
      [question.question, question.answer, question.tags, question.links]
    );

    return new Question(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * from questions'
    );
    const formattedRows = rows.map(row => new Question(row));

    return formattedRows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM questions WHERE id=$1',
      [id]
    );
    
    if(!rows[0]) return null;
    return new Question(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM questions WHERE id = $1 RETURNING *',
      [id]
    );

    return new Question(rows[0]);
  }

  static async updateById(id, question) {
    const { rows } = await pool.query(
      `UPDATE questions
        SET question=$1,
        answer=$2,
        tags=$3,
        links=$4
        WHERE id=$5
        RETURNING *`,
      [question.question, question.answer, question.tags, question.links, id]
    );

    return new Question(rows[0]);
  }
}

module.exports = Question;
