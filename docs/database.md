# The database, as it runs today

Exported from the live Supabase project on 2026-11-22 with a read-only query (`pg_policies`, `pg_get_functiondef`, `pg_get_constraintdef`, `pg_get_triggerdef`, `information_schema.columns`, `storage.buckets`). It contains definitions only: no data, no keys, no user ids.

This is a description of what is in the database, not a script to run. The SQL that built it was run by hand in the Supabase SQL Editor, lab by lab, and is recorded in the changelogs:
- `docs/sprint 2/CHANGES5_SQL.md`: the table and the first policies (Lab 5).
- `docs/sprint 2/CHANGES6_Validation.md` and `CHANGES6_AttackFeedback.md`: the length limits; the Khmer fields made optional.
- `docs/sprint 2/CHANGES7_ContributorField.md`: the `contributor` column.
- `docs/sprint 3/CHANGES9_TheGate.md`: `status`, `reviewers`, `is_reviewer`, `review_entry` and the rewritten policies (Lab 10).
- `docs/sprint 3/CHANGES10_ReviewNote.md`: `review_note` and the three-argument `review_entry` (Lab 11).
- `docs/sprint 3/CHANGES11_ReviewFixes.md`: `updated_at` and its trigger (Lab 12).

## Tables

### `entries` (row-level security: on)

| Column | Type | Required | Default |
|---|---|---|---|
| id | uuid | yes | `gen_random_uuid()` |
| created_at | timestamptz | yes | `now()` |
| owner | uuid, references `auth.users(id)` | yes | |
| title | text | yes | |
| title_khmer | text | no | |
| description | text | yes | |
| description_khmer | text | no | |
| source | text | yes | |
| contributor | text | no | |
| filling | text | yes | |
| shape | text | yes | |
| color | text | yes | |
| texture | text | no | |
| sweetness | integer | no | |
| saltiness | integer | no | |
| photo_url | text | no | |
| status | text | yes | `'pending'` |
| review_note | text | no | |
| updated_at | timestamptz | no | (set by the trigger) |

Check constraints (lengths count characters after trimming, so Khmer is never rejected for its letters):

| Constraint | Rule |
|---|---|
| entries_status_check | status is `pending`, `published` or `returned` |
| entries_title_length | 1 to 120 |
| entries_title_khmer_length | null, or 1 to 500 |
| entries_description_length | 1 to 10000 |
| entries_description_khmer_length | null, or 1 to 6000 |
| entries_source_length | 1 to 300 |
| entries_contributor_length | null, or 1 to 120 |
| entries_filling_length, entries_shape_length, entries_color_length | 1 to 120 |
| entries_texture_length | null, or 1 to 120 |
| entries_sweetness_check, entries_saltiness_check | 1 to 5 |

Not limited in the database: `photo_url` (any URL is accepted) and `review_note` (500 characters is checked in the browser only).

### `reviewers` (row-level security: on, no policies)

| Column | Type | Required |
|---|---|---|
| user_id | uuid, primary key, references `auth.users(id)` | yes |

With row-level security on and no policies, nobody can read or change this table through the API. Reviewers are added only in the SQL Editor. It has one row.

## Policies on `entries`

| Name | Command | Roles | USING (which rows) | WITH CHECK (what may be saved) |
|---|---|---|---|---|
| anyone can read published entries | SELECT | public | `status = 'published' OR auth.uid() = owner OR is_reviewer()` | |
| owners add their own entries | INSERT | authenticated | | `auth.uid() = owner AND status = 'pending'` |
| owners edit their own entries | UPDATE | authenticated | `auth.uid() = owner` | `auth.uid() = owner AND (status = 'pending' OR is_reviewer())` |
| owners delete their own entries | DELETE | public | `auth.uid() = owner` | |

(In the database, `auth.uid()` and `is_reviewer()` are wrapped in `(select ...)` in every policy except the delete one, which runs them once per query instead of once per row. The rule is the same either way.)

## Storage

Bucket `photos`: public, 5 MB limit (5242880 bytes), types `image/jpeg`, `image/png`, `image/webp`.

| Policy on `storage.objects` | Command | Roles | Rule |
|---|---|---|---|
| contributors upload into their own folder | INSERT | authenticated | bucket is `photos` AND the first folder of the path is your user id |
| contributors delete their own photos | DELETE | authenticated | the same |

There is no SELECT policy: files cannot be listed through the API. A photo opens only by its exact public URL.

## Functions

### `is_reviewer()`

```sql
CREATE OR REPLACE FUNCTION public.is_reviewer()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select exists (select 1 from public.reviewers where user_id = (select auth.uid()));
$function$
```

### `review_entry(entry_id, decision, note)`

```sql
CREATE OR REPLACE FUNCTION public.review_entry(entry_id uuid, decision text, note text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not public.is_reviewer() then
    return false;
  end if;
  if decision not in ('published', 'returned') then
    return false;
  end if;
  update public.entries
    set status = decision,
        review_note = case when decision = 'returned' then note else null end
    where id = entry_id and status = 'pending';
  return found;
end;
$function$
```

### `set_entry_updated_at()` and its trigger

```sql
CREATE TRIGGER entries_set_updated_at BEFORE INSERT OR UPDATE ON public.entries
  FOR EACH ROW EXECUTE FUNCTION set_entry_updated_at()
```

```sql
CREATE OR REPLACE FUNCTION public.set_entry_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin
  if tg_op = 'INSERT' then
    -- a new entry has not been updated yet, whatever the browser sent
    new.updated_at := null;
  elsif (new.title, new.title_khmer, new.description, new.description_khmer,
         new.source, new.contributor, new.filling, new.shape, new.color,
         new.texture, new.sweetness, new.saltiness, new.photo_url)
        is distinct from
        (old.title, old.title_khmer, old.description, old.description_khmer,
         old.source, old.contributor, old.filling, old.shape, old.color,
         old.texture, old.sweetness, old.saltiness, old.photo_url) then
    -- the owner changed the entry's content
    new.updated_at := now();
  else
    -- only status / review_note moved (a reviewer's decision): keep the old value
    new.updated_at := old.updated_at;
  end if;
  return new;
end;
$function$
```
