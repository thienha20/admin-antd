export type User = {
  id?: bigint,
  first_name?: string,
  last_name?: string,
  email?: string,
  phone?: string,
  avatar_url?: string,
  is_verified?: boolean,
  status?: string,
  role?: string,
  root?: string,
  last_login_at?: Date,
  last_login_ip?: string,
  registered_ip?: string,
  created_by?: bigint,
  updated_by?: bigint,
  created_at?: Date,
  updated_at?: Date,
  permission?: Record<string, any>,
  user_link?: UserLink[],
  token?: Token[]
}

export type Login = {
  email: string,
  password: string,
}

export type UserGroup = {
  id?: number,
  name?: string,
  description?: string,
  status?: string,
  group_type?: string,
  created_by?: bigint,
  updated_by?: bigint,
  created_at?: Date,
  updated_at?: Date,
  user_link?: UserLink[]
}

export type UserLink = {
  user_id: bigint,
  group_id: number,
  settings?: Record<string, any>,
  link_type?: string,
  position?: number,
  user?: User,
  user_group?: UserGroup,
}

export type Token = {
  id?: string,
  user_id?: bigint,
  token?: string,
  user_agent?: string,
  ip_address?: string,
  created_at?: Date,
  expired_at?: Date,
  user?: User
}