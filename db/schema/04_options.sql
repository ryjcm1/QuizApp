DROP TABLE IF EXISTS options CASCADE;

CREATE TABLE options (
  id INTEGER PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  value VARCHAR(255) NOT NULL,
  is_correct BOOLEAN NOT NULL

);