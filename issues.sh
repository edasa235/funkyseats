#!/bin/bash

set -e

REPO="edasa235/funkyseats"

echo "🔗 Linking sub-issues to parent day issues..."
echo ""

# Get parent issue numbers
PARENT_1=$(gh issue list --repo $REPO --search "Dag 1" --json number --jq '.[0].number')
PARENT_2=$(gh issue list --repo $REPO --search "Dag 2" --json number --jq '.[0].number')
PARENT_3=$(gh issue list --repo $REPO --search "Dag 3" --json number --jq '.[0].number')
PARENT_4=$(gh issue list --repo $REPO --search "Dag 4" --json number --jq '.[0].number')
PARENT_5=$(gh issue list --repo $REPO --search "Dag 5" --json number --jq '.[0].number')
PARENT_6=$(gh issue list --repo $REPO --search "Dag 6" --json number --jq '.[0].number')
PARENT_7=$(gh issue list --repo $REPO --search "Dag 7" --json number --jq '.[0].number')

echo "Found parent issues:"
echo "  Dag 1: #$PARENT_1"
echo "  Dag 2: #$PARENT_2"
echo "  Dag 3: #$PARENT_3"
echo "  Dag 4: #$PARENT_4"
echo "  Dag 5: #$PARENT_5"
echo "  Dag 6: #$PARENT_6"
echo "  Dag 7: #$PARENT_7"
echo ""

# Function to add reference to parent issue
add_to_parent() {
    local parent_num=$1
    local child_num=$2
    local child_title=$3

    echo "Linking #$child_num to #$parent_num..."

    # Get current body and append reference
    current_body=$(gh issue view $parent_num --repo $REPO --json body --jq '.body')

    gh issue edit $parent_num --repo $REPO --body "$current_body

---
**Underoppgaver:**
- #$child_num $child_title"
}

# ===== DAY 1 SUB-ISSUES =====
echo ""
echo "📅 Linking Day 1 issues..."

ISSUE_4=$(gh issue list --repo $REPO --search "Opprette prosjektstruktur" --json number --jq '.[0].number')
ISSUE_5=$(gh issue list --repo $REPO --search "Designe databaseskjema" --json number --jq '.[0].number')
ISSUE_6=$(gh issue list --repo $REPO --search "Planlegge API-endepunkter" --json number --jq '.[0].number')

gh issue edit $PARENT_1 --repo $REPO --body "## Hovedmål

- [ ] ER-diagram er tegnet
- [ ] API-struktur er dokumentert
- [ ] Prosjektmappe er opprettet

---
**Underoppgaver:**
- [ ] #$ISSUE_4 Opprette prosjektstruktur
- [ ] #$ISSUE_5 Designe databaseskjema
- [ ] #$ISSUE_6 Planlegge API-endepunkter"

# ===== DAY 2 SUB-ISSUES =====
echo "📅 Linking Day 2 issues..."

ISSUE_7=$(gh issue list --repo $REPO --search "Sette opp Docker Compose" --json number --jq '.[0].number')
ISSUE_8=$(gh issue list --repo $REPO --search "Opprette Next.js prosjekt" --json number --jq '.[0].number')
ISSUE_9=$(gh issue list --repo $REPO --search "Sette opp Fastify" --json number --jq '.[0].number')
ISSUE_10=$(gh issue list --repo $REPO --search "Konfigurere database connection" --json number --jq '.[0].number')
ISSUE_11=$(gh issue list --repo $REPO --search "Teste tilkobling" --json number --jq '.[0].number')

gh issue edit $PARENT_2 --repo $REPO --body "## Hovedmål

- [ ] Docker container kjører
- [ ] Database connection fungerer
- [ ] Hello world API endpoint svarer

---
**Underoppgaver:**
- [ ] #$ISSUE_7 Sette opp Docker Compose
- [ ] #$ISSUE_8 Opprette Next.js prosjekt
- [ ] #$ISSUE_9 Sette opp Fastify
- [ ] #$ISSUE_10 Konfigurere database connection
- [ ] #$ISSUE_11 Teste tilkobling"

# ===== DAY 3 SUB-ISSUES =====
echo "📅 Linking Day 3 issues..."

ISSUE_12=$(gh issue list --repo $REPO --search "Implementere Seats CRUD" --json number --jq '.[0].number')
ISSUE_13=$(gh issue list --repo $REPO --search "Implementere Reservations CRUD" --json number --jq '.[0].number')
ISSUE_14=$(gh issue list --repo $REPO --search "Legge til validering" --json number --jq '.[0].number')
ISSUE_15=$(gh issue list --repo $REPO --search "Skrive SQL-spørringer" --json number --jq '.[0].number')
ISSUE_16=$(gh issue list --repo $REPO --search "Teste API endepunkter" --json number --jq '.[0].number')

gh issue edit $PARENT_3 --repo $REPO --body "## Hovedmål

- [ ] Alle CRUD-operasjoner fungerer
- [ ] Validering er på plass
- [ ] Swagger dokumentasjon er oppdatert

---
**Underoppgaver:**
- [ ] #$ISSUE_12 Implementere Seats CRUD
- [ ] #$ISSUE_13 Implementere Reservations CRUD
- [ ] #$ISSUE_14 Legge til validering
- [ ] #$ISSUE_15 Skrive SQL-spørringer
- [ ] #$ISSUE_16 Teste API endepunkter"

# ===== DAY 4 SUB-ISSUES =====
echo "📅 Linking Day 4 issues..."

ISSUE_17=$(gh issue list --repo $REPO --search "Sette opp Swagger" --json number --jq '.[0].number')
ISSUE_18=$(gh issue list --repo $REPO --search "Dokumentere alle endepunkter" --json number --jq '.[0].number')
ISSUE_19=$(gh issue list --repo $REPO --search "Legge til request/response" --json number --jq '.[0].number')
ISSUE_20=$(gh issue list --repo $REPO --search "Teste API gjennom Swagger" --json number --jq '.[0].number')

gh issue edit $PARENT_4 --repo $REPO --body "## Hovedmål

- [ ] Alle endepunkter er dokumentert
- [ ] Swagger UI viser alle operasjoner
- [ ] API kan testes direkte fra Swagger

---
**Underoppgaver:**
- [ ] #$ISSUE_17 Sette opp Swagger
- [ ] #$ISSUE_18 Dokumentere alle endepunkter
- [ ] #$ISSUE_19 Legge til request/response eksempler
- [ ] #$ISSUE_20 Teste API gjennom Swagger"

# ===== DAY 5 SUB-ISSUES =====
echo "📅 Linking Day 5 issues..."

ISSUE_21=$(gh issue list --repo $REPO --search "Lage grunnstruktur i Next.js" --json number --jq '.[0].number')
ISSUE_22=$(gh issue list --repo $REPO --search "Implementere visning av plasser" --json number --jq '.[0].number')
ISSUE_23=$(gh issue list --repo $REPO --search "Lage reservasjonsskjema" --json number --jq '.[0].number')
ISSUE_24=$(gh issue list --repo $REPO --search "Koble frontend mot API" --json number --jq '.[0].number')
ISSUE_25=$(gh issue list --repo $REPO --search "Implementere visning av egne reservasjoner" --json number --jq '.[0].number')

gh issue edit $PARENT_5 --repo $REPO --body "## Hovedmål

- [ ] Bruker kan se tilgjengelige plasser
- [ ] Bruker kan opprette reservasjon
- [ ] Bruker kan se egne reservasjoner

---
**Underoppgaver:**
- [ ] #$ISSUE_21 Lage grunnstruktur i Next.js
- [ ] #$ISSUE_22 Implementere visning av plasser
- [ ] #$ISSUE_23 Lage reservasjonsskjema
- [ ] #$ISSUE_24 Koble frontend mot API
- [ ] #$ISSUE_25 Implementere visning av egne reservasjoner"

# ===== DAY 6 SUB-ISSUES =====
echo "📅 Linking Day 6 issues..."

ISSUE_26=$(gh issue list --repo $REPO --search "Teste hele reservasjonsflyten" --json number --jq '.[0].number')
ISSUE_27=$(gh issue list --repo $REPO --search "Implementere sikkerhetsvurdering" --json number --jq '.[0].number')
ISSUE_28=$(gh issue list --repo $REPO --search "Skrive README" --json number --jq '.[0].number')
ISSUE_29=$(gh issue list --repo $REPO --search "Feilretting" --json number --jq '.[0].number')

gh issue edit $PARENT_6 --repo $REPO --body "## Hovedmål

- [ ] Alle tester går grønne
- [ ] Sikkerhetsvurdering er implementert
- [ ] README har installasjonsinstruksjoner

---
**Underoppgaver:**
- [ ] #$ISSUE_26 Teste hele reservasjonsflyten
- [ ] #$ISSUE_27 Implementere sikkerhetsvurdering
- [ ] #$ISSUE_28 Skrive README
- [ ] #$ISSUE_29 Feilretting"

# ===== DAY 7 SUB-ISSUES =====
echo "📅 Linking Day 7 issues..."

ISSUE_30=$(gh issue list --repo $REPO --search "Teste demo" --json number --jq '.[0].number')

gh issue edit $PARENT_7 --repo $REPO --body "## Hovedmål

- [ ] Alle features fungerer
- [ ] Demo er klar
- [ ] Prosjekt er komplett

---
**Underoppgaver:**
- [ ] #$ISSUE_30 Teste demo"

echo ""
echo "✅ All issues linked to their parent day issues!"
echo ""
echo "📊 View your day-by-day plan:"
echo "  gh issue view $PARENT_1  # Day 1"
echo "  gh issue view $PARENT_2  # Day 2"
echo "  gh issue view $PARENT_3  # Day 3"
echo "  gh issue view $PARENT_4  # Day 4"
echo "  gh issue view $PARENT_5  # Day 5"
echo "  gh issue view $PARENT_6  # Day 6"
echo "  gh issue view $PARENT_7  # Day 7"