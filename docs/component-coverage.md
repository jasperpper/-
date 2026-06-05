# DP UI Component Coverage

This package converts the selected Pencil canvases `基础组件`, `组件1`, and `组件2` into a Vue 3 component library. The selected design contains 269 reusable nodes. Design states such as `hover`, `pressed`, `focused`, `selected`, `disabled`, `loading`, and `error` are implemented as props or CSS states instead of separate Vue components.

## Generated Vue Components

- `AgreementRow`
- `AnswerBlock`
- `AppShell`
- `AskBox`
- `BarChartCard`
- `Breadcrumb`
- `Button`
- `Card`
- `CenterDialog`
- `ChartBar`
- `CoverThumbnail`
- `DataTable`
- `DescriptionCard`
- `DialogInput`
- `DropdownMenu`
- `EmptyState`
- `FeatureCard`
- `FeatureGrid`
- `FeaturedTopicsPage`
- `FieldLabel`
- `GuideCard`
- `HeroCover`
- `HomeAppShell`
- `Icon`
- `Input`
- `ListRow`
- `LockedContent`
- `MenuItem`
- `MetricCard`
- `NavItem`
- `OptionCard`
- `PageHeader`
- `RecentAccessCard`
- `RecordItem`
- `RecordList`
- `ReferencePanel`
- `SearchInput`
- `SectionHeader`
- `SegmentedTabs`
- `Select`
- `SideNav`
- `SourceHeaderBar`
- `SourcePanel`
- `SuggestionList`
- `SummaryBlock`
- `Tab`
- `Tag`
- `Textarea`
- `Tile`
- `TopNav`
- `TopicCard`
- `TreeList`

## Design Group Mapping

| Design group | Vue components |
| --- | --- |
| Button / IconOnly | `Button`, `Icon` |
| Input / Form | `Input`, `SearchInput`, `Select`, `Textarea`, `FieldLabel`, `OptionCard`, `AgreementRow` |
| Navigation | `NavItem`, `Tab`, `SegmentedTabs`, `Breadcrumb`, `SideNav`, `TopNav` |
| Overlay | `MenuItem`, `DropdownMenu` |
| Data Display | `Tag`, `MetricCard`, `ChartBar`, `BarChartCard` |
| Content / Cards | `Card`, `TopicCard`, `RecentAccessCard`, `ListRow`, `Tile`, `CoverThumbnail` |
| Feedback | `EmptyState`, `LockedContent` |
| Table | `DataTable`, exported alias `Table` |
| Layout | `SectionHeader`, `PageHeader`, `AppShell`, `HomeAppShell` |
| AI | `AskBox`, `AnswerBlock`, `DialogInput` |
| Detail Source / Center | `SourceHeaderBar`, `GuideCard`, `DescriptionCard`, `ReferencePanel`, `TreeList`, `HeroCover`, `SummaryBlock`, `SuggestionList`, `SourcePanel`, `CenterDialog` |
| Studio | `FeatureCard`, `FeatureGrid`, `RecordItem`, `RecordList` |
| Scenario Pages | `FeaturedTopicsPage` |

## Notes

- The package keeps one stable Vue component per product pattern instead of generating one component for each visual state.
- All styling is based on `src/tokens/tokens.css` and can be themed by replacing `--dp-*` variables.
- Large page-level design nodes are exported as template components so products can compose them with slots.
