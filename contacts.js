import { clear } from 'node:console';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const contactsPath = path.resolve("db", "contacts.json");


async function readContacts() {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
}

function writeContacts(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const contacts = await readContacts();
    
    return contacts;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id.
    //   Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await readContacts();

    const contact = contacts.find((contact) => contact.id === contactId);
    if (typeof contact === "undefined") {
        return null;
    }

    return contact;    
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await readContacts();
    const index = contacts.findIndex((contacts) => contacts.id === contactId);
    if (index === -1) {
        return null;
    }

    const removedContact = contacts[index];
    const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];
    await writeContacts(newContacts);

    return removedContact;

} 

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    const contacts = await readContacts();

    const newContact = { id: crypto.randomUUID(), ...name, ...email, ...phone };
    contacts.push(newContact);

    await writeContacts(contacts);
    return newContact; 
} 

export default { listContacts, getContactById, removeContact, addContact }



