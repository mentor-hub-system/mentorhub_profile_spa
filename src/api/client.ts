import type { 
  Profile,
  ProfileInput,
  ProfileUpdate,

  Organization,
  OrganizationInput,
  OrganizationUpdate,

  Event,
  EventInput,

  Identity,

  ConfigResponse,
  Error,
  InfiniteScrollParams,
  InfiniteScrollResponse
} from './types'

const API_BASE = '/api'

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Error
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('access_token')
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorData: Error | null = null
    try {
      errorData = await response.json()
    } catch {
      // Ignore JSON parse errors
    }
    
    // Handle 401 Unauthorized - clear invalid token and redirect to login
    if (response.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_expires_at')
      // Redirect to login page, preserving current path for post-login redirect
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
    }
    
    throw new ApiError(
      errorData?.error || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorData || undefined
    )
  }

  // Handle empty responses
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T
  }

  return response.json()
}

export const api = {
  // Config
  async getConfig(): Promise<ConfigResponse> {
    return request<ConfigResponse>('/config')
  },

  // Control endpoints
  // 🎯 API methods use InfiniteScrollParams and InfiniteScrollResponse types
  // These types are compatible with spa_utils useInfiniteScroll composable

  async getProfiles(params?: InfiniteScrollParams): Promise<InfiniteScrollResponse<Profile>> {
    const queryParams = new URLSearchParams()
    if (params?.name) queryParams.append('name', params.name)
    if (params?.after_id) queryParams.append('after_id', params.after_id)
    if (params?.limit) queryParams.append('limit', String(params.limit))
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by)
    if (params?.order) queryParams.append('order', params.order)
    
    const query = queryParams.toString()
    return request<InfiniteScrollResponse<Profile>>(`/profile${query ? `?${query}` : ''}`)
  },

  async getProfile(profileId: string): Promise<Profile> {
    return request<Profile>(`/profile/${profileId}`)
  },

  async createProfile(data: ProfileInput): Promise<{ _id: string }> {
    return request<{ _id: string }>('/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async updateProfile(profileId: string, data: ProfileUpdate): Promise<Profile> {
    return request<Profile>(`/profile/${profileId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },


  async getOrganizations(params?: InfiniteScrollParams): Promise<InfiniteScrollResponse<Organization>> {
    const queryParams = new URLSearchParams()
    if (params?.name) queryParams.append('name', params.name)
    if (params?.after_id) queryParams.append('after_id', params.after_id)
    if (params?.limit) queryParams.append('limit', String(params.limit))
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by)
    if (params?.order) queryParams.append('order', params.order)
    
    const query = queryParams.toString()
    return request<InfiniteScrollResponse<Organization>>(`/organization${query ? `?${query}` : ''}`)
  },

  async getOrganization(organizationId: string): Promise<Organization> {
    return request<Organization>(`/organization/${organizationId}`)
  },

  async createOrganization(data: OrganizationInput): Promise<{ _id: string }> {
    return request<{ _id: string }>('/organization', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async updateOrganization(organizationId: string, data: OrganizationUpdate): Promise<Organization> {
    return request<Organization>(`/organization/${organizationId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },



  // Create endpoints

  async getEvents(params?: InfiniteScrollParams): Promise<InfiniteScrollResponse<Event>> {
    const queryParams = new URLSearchParams()
    if (params?.name) queryParams.append('name', params.name)
    if (params?.after_id) queryParams.append('after_id', params.after_id)
    if (params?.limit) queryParams.append('limit', String(params.limit))
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by)
    if (params?.order) queryParams.append('order', params.order)
    
    const query = queryParams.toString()
    return request<InfiniteScrollResponse<Event>>(`/event${query ? `?${query}` : ''}`)
  },

  async getEvent(eventId: string): Promise<Event> {
    return request<Event>(`/event/${eventId}`)
  },

  async createEvent(data: EventInput): Promise<{ _id: string }> {
    return request<{ _id: string }>('/event', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },



  // Consume endpoints

  async getIdentitys(params?: InfiniteScrollParams): Promise<InfiniteScrollResponse<Identity>> {
    const queryParams = new URLSearchParams()
    if (params?.name) queryParams.append('name', params.name)
    if (params?.after_id) queryParams.append('after_id', params.after_id)
    if (params?.limit) queryParams.append('limit', String(params.limit))
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by)
    if (params?.order) queryParams.append('order', params.order)
    
    const query = queryParams.toString()
    return request<InfiniteScrollResponse<Identity>>(`/identity${query ? `?${query}` : ''}`)
  },

  async getIdentity(identityId: string): Promise<Identity> {
    return request<Identity>(`/identity/${identityId}`)
  },


}

export { ApiError }
