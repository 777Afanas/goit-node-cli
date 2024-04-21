import { clear } from 'node:console';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const contactsPath = path.resolve("db", "contacts.json");
// console.log(contactsPath);

async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
}

listContacts().then((constants) => console.log(constants[2].name));


