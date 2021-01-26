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
    this.hint = row.hint;
    this.category = row.category;
    this.tags = row.tags;
    this.links = row.links;
  }

  static async insert(question) {
    const { rows } = await pool.query(
      'INSERT INTO questions (question, answer, hint, category, tags, links) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [question.question, question.answer, question.hint, question.category, question.tags, question.links]
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
        hint=$3,
        category=$4,
        tags=$5,
        links=$6
        WHERE id=$7
        RETURNING *`,
      [question.question, question.answer, question.hint, question.category, question.tags, question.links, id]
    );

    return new Question(rows[0]);
  }
}

module.exports = Question;
