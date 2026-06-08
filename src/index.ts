import type { App } from 'vue'
import './tokens/tokens.css'

import { AgreementRow } from './components/AgreementRow'
import { AnswerBlock } from './components/AnswerBlock'
import { AppShell } from './components/AppShell'
import { AskBox } from './components/AskBox'
import { BarChartCard } from './components/BarChartCard'
import { Breadcrumb } from './components/Breadcrumb'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { CenterDialog } from './components/CenterDialog'
import { ChartBar } from './components/ChartBar'
import { CoverThumbnail } from './components/CoverThumbnail'
import { DataTable } from './components/DataTable'
import { DescriptionCard } from './components/DescriptionCard'
import { DialogInput } from './components/DialogInput'
import { DropdownMenu } from './components/DropdownMenu'
import { EmptyState } from './components/EmptyState'
import { FeatureCard } from './components/FeatureCard'
import { FeatureGrid } from './components/FeatureGrid'
import { FeaturedTopicsPage } from './components/FeaturedTopicsPage'
import { FieldLabel } from './components/FieldLabel'
import { GuideCard } from './components/GuideCard'
import { HeroCover } from './components/HeroCover'
import { HomeAppShell } from './components/HomeAppShell'
import { Icon } from './components/Icon'
import { Input } from './components/Input'
import { ListRow } from './components/ListRow'
import { LockedContent } from './components/LockedContent'
import { MenuItem } from './components/MenuItem'
import { MetricCard } from './components/MetricCard'
import { NavItem } from './components/NavItem'
import { OptionCard } from './components/OptionCard'
import { PageHeader } from './components/PageHeader'
import { RecentAccessCard } from './components/RecentAccessCard'
import { RecordItem } from './components/RecordItem'
import { RecordList } from './components/RecordList'
import { ReferencePanel } from './components/ReferencePanel'
import { SearchInput } from './components/SearchInput'
import { SectionHeader } from './components/SectionHeader'
import { SegmentedTabs } from './components/SegmentedTabs'
import { Select } from './components/Select'
import { SideNav } from './components/SideNav'
import { SourceHeaderBar } from './components/SourceHeaderBar'
import { SourcePanel } from './components/SourcePanel'
import { SuggestionList } from './components/SuggestionList'
import { SummaryBlock } from './components/SummaryBlock'
import { Tab } from './components/Tab'
import { Tag } from './components/Tag'
import { Textarea } from './components/Textarea'
import { Tile } from './components/Tile'
import { TopNav } from './components/TopNav'
import { TopicCard } from './components/TopicCard'
import { TreeList } from './components/TreeList'
import type { IconName } from './components/Icon'
const components = { AgreementRow, AnswerBlock, AppShell, AskBox, BarChartCard, Breadcrumb, Button, Card, CenterDialog, ChartBar, CoverThumbnail, DataTable, DescriptionCard, DialogInput, DropdownMenu, EmptyState, FeatureCard, FeatureGrid, FeaturedTopicsPage, FieldLabel, GuideCard, HeroCover, HomeAppShell, Icon, Input, ListRow, LockedContent, MenuItem, MetricCard, NavItem, OptionCard, PageHeader, RecentAccessCard, RecordItem, RecordList, ReferencePanel, SearchInput, SectionHeader, SegmentedTabs, Select, SideNav, SourceHeaderBar, SourcePanel, SuggestionList, SummaryBlock, Tab, Tag, Textarea, Tile, TopNav, TopicCard, TreeList, Table: DataTable }

export function install(app: App) {
  for (const [name, comp] of Object.entries(components)) {
    app.component(`Dp${name}`, comp)
  }
}

export { AgreementRow, AnswerBlock, AppShell, AskBox, BarChartCard, Breadcrumb, Button, Card, CenterDialog, ChartBar, CoverThumbnail, DataTable, DescriptionCard, DialogInput, DropdownMenu, EmptyState, FeatureCard, FeatureGrid, FeaturedTopicsPage, FieldLabel, GuideCard, HeroCover, HomeAppShell, Icon, Input, ListRow, LockedContent, MenuItem, MetricCard, NavItem, OptionCard, PageHeader, RecentAccessCard, RecordItem, RecordList, ReferencePanel, SearchInput, SectionHeader, SegmentedTabs, Select, SideNav, SourceHeaderBar, SourcePanel, SuggestionList, SummaryBlock, Tab, Tag, Textarea, Tile, TopNav, TopicCard, TreeList, DataTable as Table }
export type { IconName }
export * from './raw-components'

export default { install }
