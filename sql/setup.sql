DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question TEXT,
  answer TEXT,
  hint TEXT,
  category TEXT,
  tags TEXT[],
  links TEXT[]
);
