import { Router } from "express";
import { Request, Response } from "express";
import UserService from "./../../services/UserService";

const UserRouter = Router();

const userService = new UserService();

UserRouter.get("/", (req, res) => {
  res.status(200).send("Hello User!");
});

UserRouter.post("/getUserByUserID", async (req: Request, res: Response) => {
  try {
    const { userID } = req.body as { userID: string };
    console.log("req: getUserByUserID", userID);
    res.status(200).json(await userService.getUserByUserID(userID));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getUserById" });
  }
});

UserRouter.get("/getUsersByGroupID", async (req: Request, res: Response) => {
  try {
    const { groupID } = req.body as { groupID: string };
    const users = await userService.getUsersByGroupID(groupID);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getUsersByGroupID" });
  }
});

UserRouter.post("/createUser", async (req: Request, res: Response) => {
  try {
    const { name } = req.body as { name: string };
    const user = await userService.createUser(name);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error createUser" });
  }
});

UserRouter.post("/updateUser", async (req: Request, res: Response) => {
  try {
    const { userID, userName, profileImageUrl, email } = req.body as {
      userID: string;
      userName: string;
      profileImageUrl: string;
      email: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await userService.updateUser(
      userID,
      userName,
      profileImageUrl,
      email
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updateUser" });
  }
});

UserRouter.delete("/deleteUser", async (req: Request, res: Response) => {
  try {
    const { userID } = req.body as { userID: string };
    const user = await userService.deleteUser(userID);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleteUser" });
  }
});

export default UserRouter;
