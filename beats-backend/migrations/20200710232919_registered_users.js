const createRegUsers = `
  create table reg_users (
    id SERIAL primary key,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200)NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (email)
  );`

const dropRegUsersInquiry = `drop table reg_users;`

exports.up = function(knex) {
  return knex.raw(createRegUsers)
};

exports.down = function(knex) {
  return knex.raw(dropRegUsersInquiry)
};
