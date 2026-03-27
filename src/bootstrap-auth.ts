import { bootstrapDevAuthFromUrl } from '@mentor-hub-system/mentorhub_spa_utils'
import { rehydrateAuthFromStorage } from '@/composables/useAuth'

bootstrapDevAuthFromUrl()
rehydrateAuthFromStorage()