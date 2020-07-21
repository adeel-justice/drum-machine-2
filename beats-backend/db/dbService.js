const knexLib = require('knex')
const dbCfg = require('../knexfile')
const { uuid } = require('./utils')


// this will hold our database connection
let conn = null

// this should return a promise
function connect () {
  return new Promise(function (resolve, reject) {
    conn = knexLib(dbCfg.development)
    conn.raw(`SELECT 1 + 1 AS test`)
      .then((result) => {
        if (result.rows.length === 1 && result.rows[0].test === 2) {
          console.log('Database connection established 👍')
          resolve()
        } else {
          reject('Database was unable to connect 🤷')
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}


//this creates a function to get data from the database
const getListsQuery = `SELECT * FROM list`

function getLists () {
  return conn.raw(getListsQuery)
    .then((result) => {
      return result.rows
    })
}

const getListQuery = `SELECT * FROM list WHERE uuid = ?`

const getListItemsQuery = `
  SELECT *
  FROM list_items
  WHERE list_id = ?
  ORDER BY display_order
  `

function getList (uuid) {
  return new Promise(function (resolve, reject) {
    conn.raw(getListQuery, [uuid])
      .then((result) => {
        if (result && result.rows && result.rows.length === 1) {
          return result.rows[0]
        } else {
          reject('list not found')
        }
      })
      .then((theList) => {
        conn.raw(getListItemsQuery, [theList.id])
          .then((result) => {
            theList.items = result.rows
            resolve(theList)
          })
          .catch(() => {
            reject('unable to get listItems')
          })
      })
      .catch(() => {
        reject("getList query failed")
      })
  })
}

const createItemQuery = `
  INSERT INTO list_items (uuid, description, display_order, ctime, mtime, list_id)
  VALUES (?, ?, ?, current_timestamp, current_timestamp, ?)
  RETURNING *
  `

function createItem (listId, description) {
  return conn.raw(createItemQuery , [uuid(), description, 999, listId])
    .then((result) => {
      return result.rows[0]
    })
}

// ==== Data Entry for a new List creation ======= 

const createListQuery = `
  INSERT INTO list (uuid, name, display_order, ctime, mtime)
  VALUES (?, ?, ?, current_timestamp, current_timestamp)
  RETURNING *
  `

function createList (name) {
  return conn.raw(createListQuery, [uuid(), name])
    .then((result) => {
      return result.rows[0]
    })
}

// const checkRegUsers = `
// SELECT * FROM reg_users WHERE email = $1`

// function checkUsers (email) {
//   return conn.raw(checkRegUsers, [email])
//     .then((result)) => {
//       return result.rows
//     })
// }

// -----------------------------------------------------------------------------
// Public API

module.exports = {
  connect: connect,
  getLists: getLists,
  getConn: () => {return conn},
  getList: getList,
  createItem: createItem,
  createList: createList
}