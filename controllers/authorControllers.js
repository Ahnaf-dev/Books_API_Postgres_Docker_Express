import { client } from "../config/db.js";
import fs from "fs";

// GET ALL authors
async function getAuthors(req, res) {
  const getAuthorQuery = fs
    .readFileSync("./sql/author/getAuthors.sql")
    .toString();

  try {
    const authors = await client.query(getAuthorQuery);
    if (authors.rows.length > 0) {
      res.status(200).send(authors.rows);
    } else {
      res.status(400).send({ message: "Unable To Find Authors", isError: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server Error" , isError: true});
  }
}
// GET single author
async function getSingleAuthor(req, res) {
  const {id} = req.params;

  const getAuthorQuery = fs
    .readFileSync("./sql/author/getSingleAuthor.sql")
    .toString();
  try { 
    const author = await client.query(getAuthorQuery, [id]);
    if (author.rows.length > 0) {
      res.status(200).send(author.rows[0]);
    } else {
      res.status(400).send({ message: "Unable To Find Author", isError: true });
    }
  } catch(err) {
  console.log(err)
  }

}

// Create author
async function createAuthors(req, res) {
  const { firstname, lastname, email } = req.body;
  if (email) {
    const authorAttributes = [firstname, lastname, email];
    const createAuthorQuery = fs
      .readFileSync("./sql/author/createAuthor.sql")
      .toString();

    try {
      const createdAuthor = await client.query(
        createAuthorQuery,
        authorAttributes
      );
      res.status(200).send(createdAuthor.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Please provide no email duplicates", isError: true });
    }
  } else {
    res.status(400).send({ message: "Please provide an email", isError: true });
  }
}

// Update Author

async function updateAuthor(req, res) {
  const {id} = req.params;
  const { firstname, lastname, email } = req.body;
  
  const updateAuthorQuery = fs.readFileSync('./sql/author/updateAuthor.sql').toString();
  try { 
    console.log(firstname, lastname, email, id)
    const updatedAuthor = await client.query(updateAuthorQuery, [id, firstname, lastname, email]);

    if (updatedAuthor.rows.length > 0) {
      res.status(200).send(updatedAuthor.rows[0]);

    } else {
      res.status(400).send({message: "Author not found", isError: true})
    }

  } catch(err) {
  console.log(err)
  }

}

export const authorController = {
  getAuthors,
  createAuthors,
  getSingleAuthor,
  updateAuthor,
};
