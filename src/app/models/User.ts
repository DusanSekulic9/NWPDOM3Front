export interface User{
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  can_read_users: boolean,
  can_create_users: boolean,
  can_update_users: boolean,
  can_delete_users: boolean,
}
