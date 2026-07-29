# Code Structure

Layered architecture. Place new code in the correct layer. Respect dependency direction.

```
src/
  bootstrap/       # App wiring, Nest modules, process entry modes
  domain/          # Pure business logic (no Nest, no DB, no HTTP)
  application/     # Use-case orchestration (ports + services)
  infra/           # External adapters (DB, queues, APIs)
  presentation/    # Controllers, listeners, processors, CLI commands
  shared/          # Cross-cutting helpers (Nest DI utils, etc.)
  main.ts          # Process entry → picks bootstrap mode
```

## Dependency rules

```
presentation → application → domain
infra        → domain
bootstrap    → all (wiring only)
```

- `domain` imports **nothing** from other layers and **no** external libs (Nest, ORM, HTTP, etc.)
- `application` depends on `domain` only; talks to infra via **ports** (interfaces + DI tokens)
- `infra` implements domain/application ports (repositories, adapters)
- `presentation` calls application via ports; maps DTO ↔ domain; contains **no** business logic
- If logic is reused across use-cases → move it to `domain`

## Layer details

### `domain/`

Pure models and rules.

| Folder | Purpose |
|--------|---------|
| `entities/` | Domain entities (folder per entity: `*.types.ts`, `*.mapper.ts`, `*.entity.ts`) |
| `values/` | Value objects (folder per value: `*.types.ts`, `*.mapper.ts`, `*.value.ts`) |
| `aggregations/` | Sets of related domain items, or composite day/view groupings (folder: `*.types.ts`, `*.mapper.ts`, `*.aggregation.ts`) |
| `repositories/` | Repository **interfaces** (contracts only) |
| `seeds/` | Canonical catalog data (`*.seed.ts`) for one-time DB seeding |
| `utils/` | Pure helpers |
| `configs/`, `consts/`, `interfaces/`, `abstracts/` | Shared domain primitives |

### `application/`

One folder per use-case / feature:

```
application/<feature>/
  ports/           # I*Service interfaces + Symbol tokens
  v1/services/     # Use-case implementations
  v1/mappers/      # Application-level mappers (optional)
  facades/         # Optional facades for multi-step flows
  <feature>.module.ts
```

- Define ports as `interface` + `Symbol` token
- Inject ports in presentation; bind implementations in modules
- Diary features: `diary-activities`, `diary-symptoms`, `diary-rating`, `diary-day`, `diary-statistics`, `diary-symptom-stats`, `diary-export`
- Bot channel contracts: `domain/interfaces/bot-ui.interface.ts` + `domain/consts/bot-tokens.const.ts` — implemented by `presentation/telegram-api`, consumed by `infra/telegraf`

### `infra/`

One folder per external system. Adapters named by engine so parallel
implementations can replace each other without touching domain:

```
infra/db-light/          # SQLite (better-sqlite3 + knex)
infra/telegraf/          # Telegram Bot API (Telegraf, long polling)
  providers/             # bot instance, BOT_TOKEN config
  mappers/               # ctx → IBotIncoming*; IBotView → Markup
  services/              # lifecycle (launch/stop), update dispatcher
  telegraf.module.ts     # for_root({ imports: [TelegramApiModule] })
```

`infra/telegraf` injects `BOT_UPDATE_HANDLER` (implemented in presentation).
Presentation **must not** import `telegraf`.

- `db-light`: repository tokens + `CatalogSeedService` (CLI only)
- Path: `SQLITE_PATH` (default `./data/skin-diary.sqlite`)
- Bot: `BOT_TOKEN` required

### `bootstrap/`

App factory and mode wiring. No business logic.

| Mode (`MOD`) | Entry | Purpose |
|--------------|-------|---------|
| `cli` | `bootstrap/cli` | nest-commander CLI (`presentation/commands-api`) |
| `bot` | `bootstrap/bot` | long-running bot process |

`main.ts` reads `MOD` and calls the matching bootstrap.

Catalog seed runs **only** via CLI command `seed` (not on bot startup).

### `presentation/`

One folder per entry channel:

| Channel | Role |
|---------|------|
| `telegram-api/` | Bot inbound handlers; builds `IBotView` (no Telegraf) |
| `commands-api/` | CLI commands (nest-commander) |
| `service-api/` | RPC/HTTP controllers + DTO mappers |
| `events-api/` | Kafka/event listeners |
| `queues-api/` | Queue processors |

`telegram-api` implements `BOT_UPDATE_HANDLER`. Callback protocol:

- `nav:menu|activities|symptoms|rating|today|stats|export`
- `nav:act:cat:<category_key>` / `nav:sym:cat:<category_key>`
- `act:toggle:<activity_key>` / `sym:toggle:<symptom_key>`
- `rat:set:<1-10>`
- `done:activities|symptoms|rating`

## File naming

- File names: **kebab-case** (hyphens), e.g. `activity-record.entity.ts`
- Cross-layer imports use path aliases (`baseUrl: src`):
  - `@domain/*`, `@application/*`, `@infra/*`, `@presentation/*`, `@shared/*`, `@bootstrap/*`
- Within the same feature folder, relative imports (`./`, `../`) are fine
- Symbols: `snake_case`; classes/interfaces: `PascalCase`; interfaces start with `I`
- Specs next to source: `foo.service.ts` → `foo.service.spec.ts`
- Prefer `interface` over `type`
- No `any` / `unknown` outside tests

## Entities / values / aggregations (3 files)

Each entity, value, or aggregation lives in its own folder and is split into:

1. `*.types.ts` — `I*` interface (raw / data shape)
2. `*.mapper.ts` — mapper class (`to_entity` / `to_value` / `to_aggregation` + `to_raw`)
3. Class file — `*.entity.ts` | `*.value.ts` | `*.aggregation.ts`

Example:

```
entities/rating/
  rating.types.ts
  rating.mapper.ts
  rating.entity.ts
```

## Aggregations

- Default meaning: a **set / list** of related domain items (e.g. `ActivityRecordsList`)
- Allowed exception: composite groupings like `DayRecord` (rating + activity_keys + symptom_keys for one day)

## Catalogs (activities / symptoms)

- Each catalog item has a stable `key` (snake_case) and a UI `label`
- User records store **keys only** (`activity_key`, `symptom_key`)
- Seed arrays live in `domain/seeds/`; infra upserts them into SQLite by `key`
- Runtime reads catalogs from DB via repository ports (`IActivitiesRepository`, `ISymptomsRepository`)
- Catalogs are not editable via the bot UI
- Seed is applied only through CLI (`pnpm seed`), never on bot module init
- Bot catalog UI is a drill-down with one nesting level: category → toggle items

## Function parameters

If a function / method takes **more than one** parameter, pass a **single object** (typed as `I*Params` or the domain `I*` type). Do not use a positional argument list.

```typescript
// bad
upsert(chat_id, date, rating)

// good
upsert({ chat_id, date, rating })
```

## Where to put new code (checklist)

1. New business rule / entity / value → `domain/`
2. New use-case flow → `application/<feature>/`
3. New DB/queue/API adapter → `infra/<system>/`
4. New HTTP/RPC/event/queue/CLI entry → `presentation/<channel>/`
5. Wiring / module import → `bootstrap/` + feature module
