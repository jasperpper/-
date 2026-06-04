import type { App } from 'vue'
import './tokens/tokens.css'

import { Button } from './components/Button'
import { Icon } from './components/Icon'
import type { IconName } from './components/Icon'
import { Input } from './components/Input'
import { SearchInput } from './components/SearchInput'
import { Tag } from './components/Tag'

const components = { Button, Icon, Input, SearchInput, Tag }

export function install(app: App) {
  for (const [name, comp] of Object.entries(components)) {
    app.component(`Dp${name}`, comp)
  }
}

export { Button, Icon, Input, SearchInput, Tag }
export type { IconName }

export default { install }
