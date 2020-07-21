const createListTableQuery = `
  create table list (
    id serial primary key,
    uuid text unique,
    "name" text unique,
    ctime timestamptz,
    mtime timestamptz default current_timestamp
  );`

const dropListTableQuery = `drop table list;`

exports.up = function(knex) {
  return knex.raw(createListTableQuery)
};

exports.down = function(knex) {
  return knex.raw(dropListTableQuery)
};



// const createUsersTable = `
//   create table users_table (
//     id BIGSERIAL primary key,
//     uuid text unique,
//     beats text,
//     dateAdded timestamptz,
//     mtime timestamptz default current_timestamp
//   );`

// const dropUsersTableQuery = `drop table users_table;`

// exports.up = function(knex) {
//   return knex.raw(createUsersTable)
// };

// exports.down = function(knex) {
//   return knex.raw(dropUsersTableQuery)
// };
