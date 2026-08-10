# Hero Section — 선수 선정 및 스탯 표시 규칙

## Hero 선수 선정 로직

Hero 섹션은 **예측 승리팀(픽팀)** 기준으로만 선수를 선정한다.
지는 팀의 선수는 절대 Hero로 표시하지 않는다.

### 선정 우선순위

| 조건 | Hero 선수 |
|------|-----------|
| 픽팀 SP의 trend가 `"hot"` | SP(선발투수)를 Hero로 선정 |
| 픽팀 SP가 `"hot"`이 아님 (stable / cold / neutral) | 픽팀 `lineup_players` 중 **OPS 최고 타자**를 Hero로 선정 |

> `lineup_players`는 `bat_detail.lineup_players` 배열 (`[{id, name, ops, avg}]`)  
> OPS는 blended_ops (시즌 50% + 최근 10경기 50%)

---

## 스탯 카드 표시 규칙

Hero 선수의 역할에 따라 하단 빨간 스탯 카드와 우측 팩트 그리드가 달라진다.

### 투수(SP)가 Hero일 때

| 카드 위치 | 레이블 | 값 |
|-----------|--------|----|
| 왼쪽 | ERA · Season | 선발투수 시즌 ERA |
| 가운데 (big) | K/9 · Season | 선발투수 K/9 |
| 오른쪽 | WHIP | 선발투수 WHIP |

**역할 배지**: `🔥 HOT` / `📊 OK` / `❄️ COLD` (trend 기반)

**우측 팩트 그리드**:
- ERA (Season)
- K/9
- Opponent
- Season Record (W-L)

---

### 타자(Batter)가 Hero일 때

| 카드 위치 | 레이블 | 값 |
|-----------|--------|----|
| 왼쪽 | OPS · Blended | 타자 blended OPS |
| 가운데 (big) | AVG · Recent | 타자 최근 10경기 AVG |
| 오른쪽 | R/G · Team | 픽팀 최근 10경기 평균 득점/경기 |

**역할 배지**: `🔥 Hot Batter` + `OPS X.XXX` (초록 배지)

**우측 팩트 그리드**:
- OPS (Blended)
- AVG (Recent)
- Opponent
- Season Record (W-L)

---

## 관련 데이터 소스

| 데이터 | 출처 |
|--------|------|
| SP trend | `scorecard.{away\|home}.sp_detail.trend` |
| SP ERA/K9/WHIP | `scorecard.{away\|home}.sp_detail` |
| lineup_players | `scorecard.{away\|home}.bat_detail.lineup_players` |
| 팀 R/G | `scorecard.{away\|home}.bat_detail.runs_per_g` |

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026-08-10 | Hero 선수를 항상 픽팀에서만 선정하도록 변경 |
| 2026-08-10 | SP hot이 아닐 때 최고 OPS 타자를 Hero로 선정 |
| 2026-08-10 | 타자 Hero일 때 스탯 카드를 OPS/AVG/R/G로 교체 (기존 ERA/K9/WHIP → 타자 전용 스탯) |
