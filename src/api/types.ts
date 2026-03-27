// Type definitions based on OpenAPI spec

export interface Error {
  error: string
}

export interface Breadcrumb {
  from_ip: string
  by_user: string
  at_time: string
  correlation_id: string
}


// Profile Domain
export interface Profile {
  _id: string
  name: string
  description?: string
  status?: 'active' | 'archived'
  created: Breadcrumb
  saved: Breadcrumb
}

export interface ProfileInput {
  name: string
  description?: string
  status?: 'active' | 'archived'
}

export interface ProfileUpdate {
  name?: string
  description?: string
  status?: 'active' | 'archived'
}

// Organization Domain
export interface Organization {
  _id: string
  name: string
  description?: string
  status?: 'active' | 'archived'
  created: Breadcrumb
  saved: Breadcrumb
}

export interface OrganizationInput {
  name: string
  description?: string
  status?: 'active' | 'archived'
}

export interface OrganizationUpdate {
  name?: string
  description?: string
  status?: 'active' | 'archived'
}


// Event Domain
export interface Event {
  _id: string
  name: string
  description?: string
  status?: string
  created: Breadcrumb
}

export interface EventInput {
  name: string
  description?: string
  status?: string
}


// Identity Domain
export interface Identity {
  _id: string
  name: string
  description?: string
  status?: string
}


// Configuration
export interface ConfigResponse {
  config_items: unknown[]
  versions: unknown[]
  enumerators: unknown[]
  token?: {
    claims?: Record<string, unknown>
  }
}

// Infinite Scroll
export interface InfiniteScrollParams {
  name?: string
  after_id?: string
  limit?: number
  sort_by?: string
  order?: 'asc' | 'desc'
}

export interface InfiniteScrollResponse<T> {
  items: T[]
  limit: number
  has_more: boolean
  next_cursor: string | null
}
