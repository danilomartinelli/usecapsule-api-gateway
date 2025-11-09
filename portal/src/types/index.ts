export interface Route {
  id: string
  name: string
  path: string
  methods: string[]
  service_id: string
  plugins: string[]
  enabled: boolean
  metadata: Record<string, string>
  created_at: string
  updated_at: string
  workspace_id: string
}

export interface Service {
  id: string
  name: string
  protocol: 'http' | 'https' | 'grpc'
  host: string
  port: number
  path: string
  retries: number
  connect_timeout: number
  write_timeout: number
  read_timeout: number
  enabled: boolean
  metadata: Record<string, string>
  created_at: string
  updated_at: string
  workspace_id: string
}

export interface Plugin {
  id: string
  name: string
  type: string
  config: Record<string, any>
  enabled: boolean
  priority: number
  route_id?: string
  service_id?: string
  global: boolean
  created_at: string
  updated_at: string
  workspace_id: string
}

export interface Workspace {
  id: string
  name: string
  created_at: string
  updated_at: string
}
