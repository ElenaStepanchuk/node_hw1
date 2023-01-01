const contactsOperations = require("./contacts");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

// const argv = require("yargs").argv;
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      await contactsOperations.addContact(name, email, phone, id);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js --action="list"

// # Отримуємо контакт по id
// node index.js --action="get" --id=5

// # Додаємо контакт
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

// # Видаляємо контакт
// node index.js --action="remove" --id=3

invokeAction(argv);
