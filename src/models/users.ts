import DB from "../connection";
import { User } from "../contracts/types";

type withoutPassword = Pick<User, "id" | "username" | "firstname" | "lastname">;
class UserModelDB {
  async createUser(user: User): Promise<void> {
    const newUser: string[] = [];
    Object.entries(user).forEach(([_, value]) => {
      newUser.push(value);
    });
    const query = "INSERT INTO users VALUES($1, $2, $3, $4, $5) ";
    try {
      await DB.query(query, newUser);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAllUsers(): Promise<Pick<User, "id">[]> {
    const data = await DB.query("SELECT id FROM users");
    return Promise.resolve(data.rows);
  }

  async getUserById(user_id: string): Promise<withoutPassword> {
    const query =
      "SELECT id, username, firstname, lastname FROM users WHERE id = $1";
    try {
      const data = await DB.query(query, [user_id]);
      return Promise.resolve(data.rows[0]);
    } catch (error) {
      Promise.reject(error);
    }
  }

  async getUserByUserName(username: string): Promise<withoutPassword> {
    const quary =
      "SELECT id, username, firstname, lastname FROM users WHERE username = $1";
    try {
      const data = await DB.query(quary, [username]);
      return Promise.resolve(data.rows[0]);
    } catch (error) {
      Promise.reject(error);
    }
  }

  async deleteUser(user_id: string): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1";
    try {
      await DB.query(query, [user_id]);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const UserModel = new UserModelDB();
