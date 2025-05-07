export interface User {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
}

export interface Owner {
    id: number;
    type: string;
    login: string;
    name: string;
    surname: string;
  }
export interface Group {
    id: number;
    type: string;
    name: string;
  }
  export enum FriendshipStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    BLOCKED,
}


export interface Friend {
    id: number;
    login: string;
    name: string;
    surname: string;
    email: string;
  }
  
  export interface FriendsResponse {
    friends: Friend;
    totalCount: number;
  }
