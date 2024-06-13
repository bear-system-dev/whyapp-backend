export interface IOnlineUsers {
  name: string;
  userId: string;
  lastLoginDate: Date;
}

export class OnlineUsers {
  private onlineUsers = new Map<string, IOnlineUsers>();

  public getOnlineUser = (socketId: string) => {
    return this.onlineUsers[socketId] ?? null;
  };

  public setOnlineUser = async (
    userId: string,
    userName: string,
    socketId: string,
  ) => {
    this.onlineUsers[socketId] = {
      name: userName,
      userId,
      lastLoginDate: new Date(),
    };
    return this.getOnlineUser(socketId); //Por algum motivo, não funciona
  };

  public setOfflineUser = async (userId: string) => {
    this.onlineUsers.delete(userId);
  };

  public getAll() {
    return this.onlineUsers;
  }
}
