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
  can_create_machines: boolean,
  can_destroy_machines: boolean,
  can_search_machines: boolean,
  can_start_machines: boolean,
  can_restart_machines: boolean,
  can_stop_machines: boolean,
}
