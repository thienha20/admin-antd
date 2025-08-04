export type ChatType = {
  id?: string,
  chat_session_id?: string,
  socket_id?: string,
  ip_address?: string,
  role?: string,
  message?: string,
  meta_data?: Record<string, any>,
  created_by?: bigint,
  updated_by?: bigint,
  created_at?: Date,
  updated_at?: Date
}