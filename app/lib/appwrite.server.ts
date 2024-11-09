import { Client, Storage, Avatars } from "appwrite";

const appwriteConfig = {
  url: process.env.APPWRITE_URL,
  projectId: process.env.APPWRITE_PROJECT_ID,
  storageId: process.env.APPWRITE_STORAGE_ID,
};

const client = new Client();

if (appwriteConfig.url && appwriteConfig.projectId) {
  client.setEndpoint(appwriteConfig.url);
  client.setProject(appwriteConfig.projectId);
} else {
  throw new Error("Appwrite URL & Project ID is not defined");
}

export const storage = new Storage(client);
export const avatars = new Avatars(client);
