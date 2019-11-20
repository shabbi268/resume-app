CREATE TABLE users(
  firstname character varying(50),
  lastname character varying(50),
  email character varying(50),
  position character varying(50),
);

CREATE TABLE managers (username character varying(50),password character varying(50));

INSERT INTO users values ('Shabbi','Kesa','kesash@mail.uc.edu','A');

INSERT INTO managers values ('test1','test123');
INSERT INTO managers values ('test2','test234');
INSERT INTO managers values ('test3','test345');
INSERT INTO managers values ('test4','test456');
