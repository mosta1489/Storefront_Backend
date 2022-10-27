import "jasmine";
import { UserModel } from "../../models";
import { User } from "../../contracts/types";

type withoutPassword = Pick<User, "id" | "username" | "firstname" | "lastname">;

describe("User model tests \n", () => {
  //
  it("should be create user ", async () => {
    const user = {
      id: "id_1",
      username: "mosta1489",
      firstname: "mostafa",
      lastname: "ahmed",
      password: "aklsgjlkasdjglkjaesli",
    };
    await UserModel.createUser(user).catch((error) => {
      console.log(error);
    });
  });

  it("should be return not empty list", async () => {
    const data = await UserModel.getAllUsers();
    expect(data.length).toBeGreaterThan(0);
  });

  it("should be return user data", async () => {
    const data = await UserModel.getUserById("id_1");
    expect(data).toEqual({
      id: "id_1",
      username: "mosta1489",
      firstname: "mostafa",
      lastname: "ahmed",
    });
  });

  it("should be delete user ", async () => {
    await UserModel.deleteUser("id_1").catch((error) => {
      console.log(error);
    });
  });
});
