import conf from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
  }

  async createAccount({email, password, name}) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // call another method
        return this.login({email, password})
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  async login({email, password}) {
    try {
      return (200, await this.account.createEmailSession(email, password));
    } catch (error) {
      console.log("Error: ", error)
      return (400, error)
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      console.log("Error: ", error)
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log("Error logout: ", error)
    }
  }
}

const authService = new AuthService();

export default authService;
