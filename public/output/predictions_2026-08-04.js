// Auto-generated (scorecard) — 2026-08-04
window.PREDICTIONS_DATA = [
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Los Angeles Angels",
    "home": "Baltimore Orioles",
    "away_standing": {
      "div_rank": 5,
      "div_name": "AL West",
      "wins": 43,
      "losses": 70,
      "games_back": "15.0"
    },
    "home_standing": {
      "div_rank": 4,
      "div_name": "AL East",
      "wins": 55,
      "losses": 58,
      "games_back": "12.0"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-28",
          "result": "L",
          "score": "2-3",
          "home": true
        },
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "4-7",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "2-6",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "1-3",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "3-0",
          "home": true
        }
      ],
      "wins": 1,
      "losses": 4,
      "streak": 1
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-28",
          "result": "L",
          "score": "0-14",
          "home": false
        },
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "10-9",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "6-4",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "0-5",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "0-8",
          "home": true
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": -2
    },
    "away_pitcher": "Grayson Rodriguez",
    "away_pitcher_stats": {
      "wins": 3,
      "losses": 4,
      "era": "7.24"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-10",
        "ip": "5.1",
        "er": 3,
        "h": 6,
        "bb": 1,
        "so": 0,
        "era": 5.06
      },
      {
        "date": "2026-07-18",
        "ip": "4.0",
        "er": 6,
        "h": 7,
        "bb": 1,
        "so": 3,
        "era": 13.5
      },
      {
        "date": "2026-07-24",
        "ip": "4.0",
        "er": 5,
        "h": 6,
        "bb": 2,
        "so": 3,
        "era": 11.25
      },
      {
        "date": "2026-07-29",
        "ip": "5.0",
        "er": 2,
        "h": 5,
        "bb": 2,
        "so": 6,
        "era": 3.6
      },
      {
        "date": "2026-08-04",
        "ip": "7.0",
        "er": 2,
        "h": 3,
        "bb": 1,
        "so": 6,
        "era": 2.57
      }
    ],
    "home_pitcher": "Cade Povich",
    "home_pitcher_stats": {
      "wins": 2,
      "losses": 1,
      "era": "3.91"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-04-05",
        "ip": "5.2",
        "er": 2,
        "h": 4,
        "bb": 3,
        "so": 2,
        "era": 3.18
      },
      {
        "date": "2026-04-12",
        "ip": "6.2",
        "er": 1,
        "h": 5,
        "bb": 0,
        "so": 5,
        "era": 1.35
      },
      {
        "date": "2026-05-01",
        "ip": "4.0",
        "er": 5,
        "h": 7,
        "bb": 2,
        "so": 4,
        "era": 11.25
      },
      {
        "date": "2026-05-07",
        "ip": "3.0",
        "er": 3,
        "h": 3,
        "bb": 2,
        "so": 1,
        "era": 9.0
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 0,
        "h": 7,
        "bb": 1,
        "so": 7,
        "era": 0.0
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 48.0,
      "home": 52.0
    },
    "expected_score": {
      "away": 1.9,
      "home": 1.0
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "L",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 30.0,
        "sp_detail": {
          "era": 6.46,
          "whip": 1.48,
          "k9": 7.2,
          "avg_ip": 4.7,
          "qs_rate": 10.0,
          "last3_era": 6.39,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 66.0,
        "bp_detail": {
          "bullpen_era": 3.2,
          "team_era": 3.34,
          "sample_games": 10
        },
        "bat_score": 27.1,
        "bat_detail": {
          "recent_avg": 0.234,
          "runs_per_g": 4.1,
          "hr_per_g": 1.1,
          "bb_per_g": 3.0,
          "season_ops": 0.677,
          "season_avg": 0.234,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Zach Neto(0.584)",
            "Mike Trout(0.823)",
            "Nolan Schanuel(0.675)",
            "Vaughn Grissom(0.814)",
            "Denzer Guzman(0.586)",
            "Moisés Ballesteros(0.591)",
            "Travis d'Arnaud(0.594)",
            "Jose Siri(0.624)",
            "Wade Meckler(0.799)"
          ]
        },
        "sit_score": 42.2,
        "total": 40.0
      },
      "home": {
        "sp_score": 50.0,
        "sp_detail": {
          "era": 3.91,
          "whip": 1.34,
          "k9": 6.7,
          "avg_ip": 5.1,
          "qs_rate": 40.0,
          "last3_era": 3.91,
          "trend": "neutral",
          "n_games": 5,
          "sample_confidence": 1.0,
          "rest_days": 89,
          "rest_note": "long_rest"
        },
        "bp_score": 44.8,
        "bp_detail": {
          "bullpen_era": 4.26,
          "team_era": 4.33,
          "sample_games": 10
        },
        "bat_score": 14.3,
        "bat_detail": {
          "recent_avg": 0.202,
          "runs_per_g": 3.6,
          "hr_per_g": 0.7,
          "bb_per_g": 3.0,
          "season_ops": 0.656,
          "season_avg": 0.202,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Dylan Beavers(0.623)",
            "Pete Alonso(0.806)",
            "Gunnar Henderson(0.590)",
            "Christian Encarnacion-Strand(0.818)",
            "Jackson Holliday(0.806)",
            "Coby Mayo(0.740)",
            "Christian Franklin(0.333)",
            "Colton Cowser(0.643)",
            "Carlos Narváez(0.544)"
          ]
        },
        "sit_score": 52.8,
        "total": 38.4
      }
    },
    "scores": {
      "away_offense": 27.1,
      "away_defense": 48.0,
      "home_offense": 14.3,
      "home_defense": 47.4
    },
    "actual_score": {
      "away": 1,
      "home": 3
    },
    "actual_winner": "Baltimore Orioles",
    "model_winner": "Baltimore Orioles",
    "model_correct": true,
    "notes": "Los Angeles Angels IL: Anthony Rendon, Jack Kochanowicz, Robert Stephenson, Sebastián Rivero, Yoán Moncada 외 다수 / Baltimore Orioles IL: Blaze Alexander, Chris Bassitt, Colin Selby, Félix Bautista, Jordan Westburg 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "New York Mets",
    "home": "Cleveland Guardians",
    "away_standing": {
      "div_rank": 5,
      "div_name": "NL East",
      "wins": 48,
      "losses": 66,
      "games_back": "20.5"
    },
    "home_standing": {
      "div_rank": 2,
      "div_name": "AL Central",
      "wins": 57,
      "losses": 57,
      "games_back": "3.0"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "0-1",
          "home": true
        },
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "4-2",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "2-5",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "2-6",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "0-2",
          "home": true
        }
      ],
      "wins": 1,
      "losses": 4,
      "streak": -3
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-28",
          "result": "L",
          "score": "0-2",
          "home": false
        },
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "6-1",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "1-4",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "8-12",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "5-0",
          "home": true
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": 1
    },
    "away_pitcher": "Sean Manaea",
    "away_pitcher_stats": {
      "wins": 3,
      "losses": 5,
      "era": "4.33"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-09",
        "ip": "7.0",
        "er": 2,
        "h": 6,
        "bb": 1,
        "so": 6,
        "era": 2.57
      },
      {
        "date": "2026-07-18",
        "ip": "4.2",
        "er": 4,
        "h": 7,
        "bb": 2,
        "so": 7,
        "era": 7.71
      },
      {
        "date": "2026-07-24",
        "ip": "6.0",
        "er": 1,
        "h": 6,
        "bb": 2,
        "so": 3,
        "era": 1.5
      },
      {
        "date": "2026-07-29",
        "ip": "6.0",
        "er": 2,
        "h": 5,
        "bb": 2,
        "so": 4,
        "era": 3.0
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 2,
        "h": 7,
        "bb": 5,
        "so": 7,
        "era": 3.0
      }
    ],
    "home_pitcher": "Joey Cantillo",
    "home_pitcher_stats": {
      "wins": 8,
      "losses": 7,
      "era": "3.87"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-12",
        "ip": "5.0",
        "er": 1,
        "h": 6,
        "bb": 2,
        "so": 9,
        "era": 1.8
      },
      {
        "date": "2026-07-19",
        "ip": "5.0",
        "er": 4,
        "h": 7,
        "bb": 3,
        "so": 7,
        "era": 7.2
      },
      {
        "date": "2026-07-24",
        "ip": "3.2",
        "er": 5,
        "h": 8,
        "bb": 1,
        "so": 4,
        "era": 12.27
      },
      {
        "date": "2026-07-29",
        "ip": "4.0",
        "er": 0,
        "h": 4,
        "bb": 1,
        "so": 8,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "5.0",
        "er": 2,
        "h": 7,
        "bb": 2,
        "so": 5,
        "era": 3.6
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 59.2,
      "home": 40.8
    },
    "expected_score": {
      "away": 2.2,
      "home": 1.2
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "L",
      "home_handedness": "L",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 52.8,
        "sp_detail": {
          "era": 3.79,
          "whip": 1.34,
          "k9": 8.2,
          "avg_ip": 5.5,
          "qs_rate": 50.0,
          "last3_era": 3.34,
          "trend": "stable",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 80.0,
        "bp_detail": {
          "bullpen_era": 2.32,
          "team_era": 2.53,
          "sample_games": 10
        },
        "bat_score": 32.8,
        "bat_detail": {
          "recent_avg": 0.24,
          "runs_per_g": 4.9,
          "hr_per_g": 0.9,
          "bb_per_g": 3.0,
          "season_ops": 0.696,
          "season_avg": 0.24,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "A.J. Ewing(0.637)",
            "Francisco Lindor(0.829)",
            "Bo Bichette(0.669)",
            "Francisco Alvarez(0.805)",
            "Carson Benge(0.738)",
            "Luis Robert Jr.(0.505)",
            "Marcus Semien(0.688)",
            "Jared Young(0.677)",
            "Luis Torrens(0.716)"
          ]
        },
        "sit_score": 46.8,
        "total": 52.7
      },
      "home": {
        "sp_score": 43.3,
        "sp_detail": {
          "era": 2.96,
          "whip": 1.41,
          "k9": 11.5,
          "avg_ip": 5.2,
          "qs_rate": 20.0,
          "last3_era": 4.76,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 62.8,
        "bp_detail": {
          "bullpen_era": 3.36,
          "team_era": 3.48,
          "sample_games": 10
        },
        "bat_score": 19.0,
        "bat_detail": {
          "recent_avg": 0.223,
          "runs_per_g": 3.2,
          "hr_per_g": 0.9,
          "bb_per_g": 3.0,
          "season_ops": 0.673,
          "season_avg": 0.223,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Steven Kwan(0.797)",
            "Jo Adell(0.704)",
            "Chase DeLauter(0.760)",
            "Rhys Hoskins(0.729)",
            "Angel Martínez(0.504)",
            "Travis Bazzana(0.688)",
            "Gabriel Arias(0.663)",
            "Austin Hedges(0.657)",
            "Brayan Rocchio(0.553)"
          ]
        },
        "sit_score": 57.0,
        "total": 42.9
      }
    },
    "scores": {
      "away_offense": 32.8,
      "away_defense": 66.4,
      "home_offense": 19.0,
      "home_defense": 53.0
    },
    "actual_score": {
      "away": 6,
      "home": 2
    },
    "actual_winner": "New York Mets",
    "model_winner": "New York Mets",
    "model_correct": true,
    "notes": "New York Mets IL: Austin Warren, Cionel Pérez, Juan Soto, Justin Hagenman, Mark Vientos 외 다수 / Cleveland Guardians IL: Shawn Armstrong",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Athletics",
    "home": "Cincinnati Reds",
    "away_standing": {
      "div_rank": 4,
      "div_name": "AL West",
      "wins": 45,
      "losses": 68,
      "games_back": "13.0"
    },
    "home_standing": {
      "div_rank": 5,
      "div_name": "NL Central",
      "wins": 54,
      "losses": 58,
      "games_back": "15.5"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "2-4",
          "home": true
        },
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "4-5",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "1-13",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "6-8",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "0-11",
          "home": true
        }
      ],
      "wins": 0,
      "losses": 5,
      "streak": -5
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "1-6",
          "home": true
        },
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "3-2",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "8-7",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "1-4",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "10-2",
          "home": true
        }
      ],
      "wins": 3,
      "losses": 2,
      "streak": 1
    },
    "away_pitcher": "J.T. Ginn",
    "away_pitcher_stats": {
      "wins": 8,
      "losses": 6,
      "era": "3.51"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-01",
        "ip": "6.0",
        "er": 1,
        "h": 3,
        "bb": 5,
        "so": 4,
        "era": 1.5
      },
      {
        "date": "2026-07-07",
        "ip": "4.0",
        "er": 2,
        "h": 2,
        "bb": 2,
        "so": 4,
        "era": 4.5
      },
      {
        "date": "2026-07-12",
        "ip": "4.1",
        "er": 8,
        "h": 6,
        "bb": 3,
        "so": 7,
        "era": 16.62
      },
      {
        "date": "2026-07-18",
        "ip": "6.1",
        "er": 0,
        "h": 1,
        "bb": 3,
        "so": 7,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 3,
        "h": 5,
        "bb": 2,
        "so": 5,
        "era": 4.5
      }
    ],
    "home_pitcher": "Brady Singer",
    "home_pitcher_stats": {
      "wins": 5,
      "losses": 10,
      "era": "4.67"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-09",
        "ip": "7.1",
        "er": 1,
        "h": 4,
        "bb": 1,
        "so": 5,
        "era": 1.23
      },
      {
        "date": "2026-07-17",
        "ip": "7.0",
        "er": 2,
        "h": 4,
        "bb": 0,
        "so": 6,
        "era": 2.57
      },
      {
        "date": "2026-07-22",
        "ip": "6.2",
        "er": 3,
        "h": 6,
        "bb": 1,
        "so": 6,
        "era": 4.05
      },
      {
        "date": "2026-07-29",
        "ip": "4.1",
        "er": 4,
        "h": 7,
        "bb": 4,
        "so": 3,
        "era": 8.31
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 3,
        "h": 5,
        "bb": 3,
        "so": 6,
        "era": 4.5
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 33.0,
      "home": 67.0
    },
    "expected_score": {
      "away": 1.4,
      "home": 1.0
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "R",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 43.2,
        "sp_detail": {
          "era": 4.2,
          "whip": 1.29,
          "k9": 8.6,
          "avg_ip": 5.6,
          "qs_rate": 60.0,
          "last3_era": 4.73,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 17,
          "rest_note": "extra_rest"
        },
        "bp_score": 18.2,
        "bp_detail": {
          "bullpen_era": 5.59,
          "team_era": 5.52,
          "sample_games": 10
        },
        "bat_score": 22.6,
        "bat_detail": {
          "recent_avg": 0.219,
          "runs_per_g": 4.3,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.652,
          "season_avg": 0.219,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Lawrence Butler(0.778)",
            "Jacob Wilson(0.569)",
            "Tyler Soderstrom(0.706)",
            "Jonah Heim(0.692)",
            "Jeff McNeil(0.743)",
            "Tommy White(0.512)",
            "Donovan Walton(0.648)",
            "Carlos Cortes(0.421)",
            "Henry Bolte(0.799)"
          ]
        },
        "sit_score": 36.5,
        "total": 29.8
      },
      "home": {
        "sp_score": 61.0,
        "sp_detail": {
          "era": 3.53,
          "whip": 1.18,
          "k9": 8.4,
          "avg_ip": 5.9,
          "qs_rate": 60.0,
          "last3_era": 3.73,
          "trend": "stable",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 70.4,
        "bp_detail": {
          "bullpen_era": 2.98,
          "team_era": 2.93,
          "sample_games": 10
        },
        "bat_score": 12.5,
        "bat_detail": {
          "recent_avg": 0.196,
          "runs_per_g": 2.8,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.674,
          "season_avg": 0.196,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Elly De La Cruz(0.867)",
            "Sal Stewart(0.900)",
            "JJ Bleday(0.764)",
            "Tyler Stephenson(0.873)",
            "Eugenio Suárez(0.639)",
            "Dane Myers(0.706)",
            "Héctor Rodríguez(0.333)",
            "Ke'Bryan Hayes(0.513)",
            "Matt McLain(0.467)"
          ]
        },
        "sit_score": 52.7,
        "total": 47.6
      }
    },
    "scores": {
      "away_offense": 22.6,
      "away_defense": 30.7,
      "home_offense": 12.5,
      "home_defense": 65.7
    },
    "actual_score": {
      "away": 4,
      "home": 5
    },
    "actual_winner": "Cincinnati Reds",
    "model_winner": "Cincinnati Reds",
    "model_correct": true,
    "notes": "Athletics IL: Brent Rooker, Brooks Kriske, Denzel Clarke, Gunnar Hoglund, Jeffrey Springs 외 다수 / Cincinnati Reds IL: Blake Dunn, Brandon Williamson, Graham Ashcraft, Nick Lodolo, Spencer Steer 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Washington Nationals",
    "home": "Philadelphia Phillies",
    "away_standing": {
      "div_rank": 4,
      "div_name": "NL East",
      "wins": 55,
      "losses": 60,
      "games_back": "14.0"
    },
    "home_standing": {
      "div_rank": 2,
      "div_name": "NL East",
      "wins": 61,
      "losses": 53,
      "games_back": "7.5"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "4-5",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "2-6",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "3-8",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "2-4",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "3-6",
          "home": false
        }
      ],
      "wins": 0,
      "losses": 5,
      "streak": -5
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "6-8",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "4-6",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "5-0",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "8-0",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "6-3",
          "home": true
        }
      ],
      "wins": 3,
      "losses": 2,
      "streak": 3
    },
    "away_pitcher": "Carson Palmquist",
    "away_pitcher_stats": {
      "wins": 0,
      "losses": 2,
      "era": "7.71"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-21",
        "ip": "1.2",
        "er": 4,
        "h": 4,
        "bb": 1,
        "so": 2,
        "era": 21.6
      },
      {
        "date": "2026-07-24",
        "ip": "1.1",
        "er": 2,
        "h": 2,
        "bb": 3,
        "so": 1,
        "era": 13.5
      },
      {
        "date": "2026-07-27",
        "ip": "1.1",
        "er": 0,
        "h": 0,
        "bb": 0,
        "so": 0,
        "era": 0.0
      },
      {
        "date": "2026-07-30",
        "ip": "2.0",
        "er": 0,
        "h": 1,
        "bb": 1,
        "so": 0,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "0.1",
        "er": 1,
        "h": 2,
        "bb": 1,
        "so": 0,
        "era": 27.0
      }
    ],
    "home_pitcher": "Jesús Luzardo",
    "home_pitcher_stats": {
      "wins": 10,
      "losses": 5,
      "era": "3.36"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-09",
        "ip": "7.0",
        "er": 0,
        "h": 2,
        "bb": 2,
        "so": 11,
        "era": 0.0
      },
      {
        "date": "2026-07-18",
        "ip": "5.0",
        "er": 1,
        "h": 2,
        "bb": 2,
        "so": 7,
        "era": 1.8
      },
      {
        "date": "2026-07-24",
        "ip": "7.0",
        "er": 1,
        "h": 4,
        "bb": 1,
        "so": 9,
        "era": 1.29
      },
      {
        "date": "2026-07-29",
        "ip": "6.1",
        "er": 6,
        "h": 6,
        "bb": 3,
        "so": 5,
        "era": 8.53
      },
      {
        "date": "2026-08-04",
        "ip": "8.0",
        "er": 0,
        "h": 4,
        "bb": 2,
        "so": 7,
        "era": 0.0
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 37.0,
      "home": 63.0
    },
    "expected_score": {
      "away": 2.5,
      "home": 3.8
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "L",
      "home_handedness": "L",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 30.0,
        "sp_detail": {
          "era": 9.0,
          "whip": 2.0,
          "k9": 8.3,
          "avg_ip": 1.3,
          "qs_rate": 0.0,
          "last3_era": 9.45,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 5,
          "rest_note": null
        },
        "bp_score": 5.2,
        "bp_detail": {
          "bullpen_era": 6.24,
          "team_era": 6.24,
          "sample_games": 10
        },
        "bat_score": 39.2,
        "bat_detail": {
          "recent_avg": 0.22,
          "runs_per_g": 6.4,
          "hr_per_g": 1.4,
          "bb_per_g": 3.0,
          "season_ops": 0.709,
          "season_avg": 0.22,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Dylan Crews(0.712)",
            "Andrés Chaparro(0.800)",
            "Brady House(0.667)",
            "CJ Abrams(0.862)",
            "Harry Ford(0.693)",
            "Jacob Young(0.734)",
            "Daylen Lile(0.787)",
            "Nasim Nuñez(0.484)",
            "Jorbit Vivas(0.645)"
          ]
        },
        "sit_score": 33.7,
        "total": 27.1
      },
      "home": {
        "sp_score": 72.0,
        "sp_detail": {
          "era": 1.98,
          "whip": 0.97,
          "k9": 11.9,
          "avg_ip": 6.4,
          "qs_rate": 60.0,
          "last3_era": 2.16,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 43.4,
        "bp_detail": {
          "bullpen_era": 4.33,
          "team_era": 4.35,
          "sample_games": 10
        },
        "bat_score": 44.4,
        "bat_detail": {
          "recent_avg": 0.284,
          "runs_per_g": 4.2,
          "hr_per_g": 1.1,
          "bb_per_g": 3.0,
          "season_ops": 0.759,
          "season_avg": 0.284,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Kyle Schwarber(0.752)",
            "Trea Turner(0.824)",
            "Bryce Harper(0.935)",
            "Luis Arraez(0.798)",
            "Alec Bohm(0.617)",
            "J.T. Realmuto(0.718)",
            "Brandon Marsh(0.598)",
            "Bryson Stott(0.886)",
            "Justin Crawford(0.701)"
          ]
        },
        "sit_score": 64.5,
        "total": 55.4
      }
    },
    "scores": {
      "away_offense": 39.2,
      "away_defense": 17.6,
      "home_offense": 44.4,
      "home_defense": 57.7
    },
    "actual_score": {
      "away": 0,
      "home": 5
    },
    "actual_winner": "Philadelphia Phillies",
    "model_winner": "Philadelphia Phillies",
    "model_correct": true,
    "notes": "Washington Nationals IL: Brad Lord, Connelly Early, DJ Herz, Drew Millas, James Wood 외 다수 / Philadelphia Phillies IL: Adolis García, Brad Keller, Johan Rojas, Rafael Marchán, Tanner Banks",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "St. Louis Cardinals",
    "home": "New York Yankees",
    "away_standing": {
      "div_rank": 4,
      "div_name": "NL Central",
      "wins": 56,
      "losses": 58,
      "games_back": "14.5"
    },
    "home_standing": {
      "div_rank": 2,
      "div_name": "AL East",
      "wins": 64,
      "losses": 50,
      "games_back": "3.5"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "2-4",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "1-3",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "1-5",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "5-1",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "13-7",
          "home": false
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": 2
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "1-2",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "2-0",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "2-5",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "2-1",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "7-13",
          "home": true
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": -1
    },
    "away_pitcher": "Hunter Dobbins",
    "away_pitcher_stats": {
      "wins": 2,
      "losses": 2,
      "era": "3.60"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-06-11",
        "ip": "4.1",
        "er": 3,
        "h": 7,
        "bb": 0,
        "so": 5,
        "era": 6.23
      },
      {
        "date": "2026-07-07",
        "ip": "5.0",
        "er": 3,
        "h": 4,
        "bb": 3,
        "so": 4,
        "era": 5.4
      },
      {
        "date": "2026-07-22",
        "ip": "6.0",
        "er": 0,
        "h": 6,
        "bb": 0,
        "so": 5,
        "era": 0.0
      },
      {
        "date": "2026-07-27",
        "ip": "5.1",
        "er": 4,
        "h": 7,
        "bb": 1,
        "so": 4,
        "era": 6.75
      },
      {
        "date": "2026-08-04",
        "ip": "6.1",
        "er": 2,
        "h": 4,
        "bb": 3,
        "so": 4,
        "era": 2.84
      }
    ],
    "home_pitcher": "Ryan Weathers",
    "home_pitcher_stats": {
      "wins": 5,
      "losses": 7,
      "era": "3.79"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-10",
        "ip": "5.1",
        "er": 1,
        "h": 6,
        "bb": 0,
        "so": 6,
        "era": 1.69
      },
      {
        "date": "2026-07-20",
        "ip": "4.2",
        "er": 5,
        "h": 7,
        "bb": 2,
        "so": 5,
        "era": 9.64
      },
      {
        "date": "2026-07-25",
        "ip": "5.2",
        "er": 1,
        "h": 6,
        "bb": 1,
        "so": 7,
        "era": 1.59
      },
      {
        "date": "2026-07-30",
        "ip": "7.0",
        "er": 0,
        "h": 3,
        "bb": 3,
        "so": 4,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 0,
        "h": 4,
        "bb": 1,
        "so": 6,
        "era": 0.0
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 37.0,
      "home": 63.0
    },
    "expected_score": {
      "away": 1.1,
      "home": 4.2
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "L",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 40.9,
        "sp_detail": {
          "era": 3.6,
          "whip": 1.3,
          "k9": 8.1,
          "avg_ip": 5.0,
          "qs_rate": 25.0,
          "last3_era": 4.0,
          "trend": "cold",
          "n_games": 8,
          "sample_confidence": 1.0,
          "rest_days": 8,
          "rest_note": "extra_rest"
        },
        "bp_score": 28.0,
        "bp_detail": {
          "bullpen_era": 5.1,
          "team_era": 5.4,
          "sample_games": 10
        },
        "bat_score": 19.1,
        "bat_detail": {
          "recent_avg": 0.206,
          "runs_per_g": 4.6,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.622,
          "season_avg": 0.206,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "JJ Wetherholt(0.626)",
            "Iván Herrera(0.676)",
            "José Fermín(0.576)",
            "Nelson Velázquez(0.532)",
            "Masyn Winn(0.675)",
            "Blaze Jordan(0.639)",
            "Nathan Church(0.684)",
            "Pedro Pagés(0.479)",
            "Bryan Torres(0.714)"
          ]
        },
        "sit_score": 43.9,
        "total": 31.6
      },
      "home": {
        "sp_score": 55.1,
        "sp_detail": {
          "era": 3.71,
          "whip": 1.31,
          "k9": 9.4,
          "avg_ip": 5.1,
          "qs_rate": 40.0,
          "last3_era": 2.2,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 5,
          "rest_note": null
        },
        "bp_score": 80.0,
        "bp_detail": {
          "bullpen_era": 2.42,
          "team_era": 2.42,
          "sample_games": 10
        },
        "bat_score": 54.1,
        "bat_detail": {
          "recent_avg": 0.251,
          "runs_per_g": 5.2,
          "hr_per_g": 1.1,
          "bb_per_g": 3.0,
          "season_ops": 0.926,
          "season_avg": 0.251,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Trent Grisham(0.618)",
            "Ben Rice(0.748)",
            "Luis García Jr.(0.976)",
            "Heliot Ramos(0.637)",
            "Spencer Jones(0.754)",
            "Jazz Chisholm Jr.(0.595)",
            "Ryan McMahon(0.595)",
            "George Lombard Jr.(2.667)",
            "Austin Wells(0.743)"
          ]
        },
        "sit_score": 61.9,
        "total": 62.0
      }
    },
    "scores": {
      "away_offense": 19.1,
      "away_defense": 34.5,
      "home_offense": 54.1,
      "home_defense": 67.5
    },
    "actual_score": {
      "away": 0,
      "home": 2
    },
    "actual_winner": "New York Yankees",
    "model_winner": "New York Yankees",
    "model_correct": true,
    "notes": "St. Louis Cardinals IL: Max Rajcic, Ramón Urías / New York Yankees IL: Aaron Judge, Carlos Rodón, Clarke Schmidt, Cody Bellinger, Giancarlo Stanton",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Chicago White Sox",
    "home": "Boston Red Sox",
    "away_standing": {
      "div_rank": 1,
      "div_name": "AL Central",
      "wins": 59,
      "losses": 53,
      "games_back": "-"
    },
    "home_standing": {
      "div_rank": 3,
      "div_name": "AL East",
      "wins": 61,
      "losses": 51,
      "games_back": "5.5"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "6-5",
          "home": true
        },
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "2-1",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "6-1",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "0-1",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "9-1",
          "home": false
        }
      ],
      "wins": 4,
      "losses": 1,
      "streak": 1
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "4-2",
          "home": false
        },
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "5-4",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "9-4",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "3-2",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "8-4",
          "home": false
        }
      ],
      "wins": 5,
      "losses": 0,
      "streak": 5
    },
    "away_pitcher": "Davis Martin",
    "away_pitcher_stats": {
      "wins": 9,
      "losses": 6,
      "era": "4.13"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-08",
        "ip": "4.0",
        "er": 5,
        "h": 6,
        "bb": 2,
        "so": 2,
        "era": 11.25
      },
      {
        "date": "2026-07-18",
        "ip": "5.2",
        "er": 1,
        "h": 4,
        "bb": 2,
        "so": 5,
        "era": 1.59
      },
      {
        "date": "2026-07-24",
        "ip": "5.0",
        "er": 4,
        "h": 6,
        "bb": 0,
        "so": 3,
        "era": 7.2
      },
      {
        "date": "2026-07-29",
        "ip": "6.0",
        "er": 4,
        "h": 5,
        "bb": 2,
        "so": 6,
        "era": 6.0
      },
      {
        "date": "2026-08-04",
        "ip": "5.0",
        "er": 9,
        "h": 10,
        "bb": 2,
        "so": 1,
        "era": 16.2
      }
    ],
    "home_pitcher": "Patrick Sandoval",
    "home_pitcher_stats": {
      "wins": 1,
      "losses": 0,
      "era": "3.38"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-09",
        "ip": "4.1",
        "er": 1,
        "h": 5,
        "bb": 1,
        "so": 5,
        "era": 2.08
      },
      {
        "date": "2026-07-18",
        "ip": "5.0",
        "er": 4,
        "h": 9,
        "bb": 1,
        "so": 5,
        "era": 7.2
      },
      {
        "date": "2026-07-24",
        "ip": "4.2",
        "er": 0,
        "h": 5,
        "bb": 2,
        "so": 3,
        "era": 0.0
      },
      {
        "date": "2026-07-29",
        "ip": "5.0",
        "er": 2,
        "h": 5,
        "bb": 2,
        "so": 7,
        "era": 3.6
      },
      {
        "date": "2026-08-04",
        "ip": "5.0",
        "er": 2,
        "h": 6,
        "bb": 4,
        "so": 5,
        "era": 3.6
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 33.0,
      "home": 67.0
    },
    "expected_score": {
      "away": 2.1,
      "home": 3.1
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "L",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 32.0,
        "sp_detail": {
          "era": 6.34,
          "whip": 1.61,
          "k9": 6.2,
          "avg_ip": 5.0,
          "qs_rate": 20.0,
          "last3_era": 8.06,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 21.8,
        "bp_detail": {
          "bullpen_era": 5.41,
          "team_era": 5.76,
          "sample_games": 10
        },
        "bat_score": 28.6,
        "bat_detail": {
          "recent_avg": 0.243,
          "runs_per_g": 3.6,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.712,
          "season_avg": 0.243,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Chase Meidroth(0.776)",
            "Munetaka Murakami(0.977)",
            "Miguel Vargas(0.738)",
            "Randal Grichuk(0.840)",
            "Colson Montgomery(0.627)",
            "Joey Bart(0.629)",
            "Brenton Doyle(0.634)",
            "Braden Montgomery(0.650)",
            "Luisangel Acuña(0.540)"
          ]
        },
        "sit_score": 56.4,
        "total": 32.1
      },
      "home": {
        "sp_score": 42.0,
        "sp_detail": {
          "era": 3.38,
          "whip": 1.67,
          "k9": 9.4,
          "avg_ip": 4.8,
          "qs_rate": 0.0,
          "last3_era": 3.38,
          "trend": "stable",
          "n_games": 5,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 35.6,
        "bp_detail": {
          "bullpen_era": 4.72,
          "team_era": 4.84,
          "sample_games": 10
        },
        "bat_score": 37.8,
        "bat_detail": {
          "recent_avg": 0.267,
          "runs_per_g": 3.6,
          "hr_per_g": 0.9,
          "bb_per_g": 3.0,
          "season_ops": 0.774,
          "season_avg": 0.267,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Nick Sogard(0.675)",
            "Ceddanne Rafaela(0.976)",
            "Wilyer Abreu(0.787)",
            "Willson Contreras(0.819)",
            "Masataka Yoshida(0.746)",
            "Caleb Durbin(0.843)",
            "Jarren Duran(0.694)",
            "Andruw Monasterio(0.844)",
            "Connor Wong(0.580)"
          ]
        },
        "sit_score": 63.7,
        "total": 42.4
      }
    },
    "scores": {
      "away_offense": 28.6,
      "away_defense": 26.9,
      "home_offense": 37.8,
      "home_defense": 38.8
    },
    "actual_score": {
      "away": 2,
      "home": 14
    },
    "actual_winner": "Boston Red Sox",
    "model_winner": "Boston Red Sox",
    "model_correct": true,
    "notes": "Chicago White Sox IL: Austin Hays, Brooks Baldwin, Drew Thorpe, Jordan Leasure, Ky Bush 외 다수 / Boston Red Sox IL: Curtis Mead, Garrett Crochet, Isiah Kiner-Falefa, Johan Oviedo, Kutter Crawford 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Miami Marlins",
    "home": "Atlanta Braves",
    "away_standing": {
      "div_rank": 3,
      "div_name": "NL East",
      "wins": 58,
      "losses": 56,
      "games_back": "10.5"
    },
    "home_standing": {
      "div_rank": 1,
      "div_name": "NL East",
      "wins": 68,
      "losses": 45,
      "games_back": "-"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "8-6",
          "home": true
        },
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "2-4",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "5-2",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "6-2",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "2-0",
          "home": false
        }
      ],
      "wins": 4,
      "losses": 1,
      "streak": 3
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "1-0",
          "home": false
        },
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "5-4",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "6-2",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "8-3",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "4-2",
          "home": true
        }
      ],
      "wins": 5,
      "losses": 0,
      "streak": 5
    },
    "away_pitcher": "Ryan Gusto",
    "away_pitcher_stats": {
      "wins": 0,
      "losses": 3,
      "era": "4.80"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-18",
        "ip": "2.1",
        "er": 1,
        "h": 3,
        "bb": 0,
        "so": 2,
        "era": 3.86
      },
      {
        "date": "2026-07-21",
        "ip": "2.0",
        "er": 0,
        "h": 0,
        "bb": 0,
        "so": 2,
        "era": 0.0
      },
      {
        "date": "2026-07-24",
        "ip": "3.1",
        "er": 1,
        "h": 2,
        "bb": 1,
        "so": 4,
        "era": 2.7
      },
      {
        "date": "2026-07-29",
        "ip": "5.0",
        "er": 6,
        "h": 9,
        "bb": 2,
        "so": 3,
        "era": 10.8
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 1,
        "h": 5,
        "bb": 0,
        "so": 5,
        "era": 1.5
      }
    ],
    "home_pitcher": "Grant Holmes",
    "home_pitcher_stats": {
      "wins": 7,
      "losses": 4,
      "era": "3.67"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-08",
        "ip": "5.0",
        "er": 0,
        "h": 3,
        "bb": 1,
        "so": 5,
        "era": 0.0
      },
      {
        "date": "2026-07-19",
        "ip": "5.0",
        "er": 3,
        "h": 7,
        "bb": 2,
        "so": 2,
        "era": 5.4
      },
      {
        "date": "2026-07-24",
        "ip": "5.0",
        "er": 3,
        "h": 6,
        "bb": 2,
        "so": 5,
        "era": 5.4
      },
      {
        "date": "2026-07-30",
        "ip": "4.2",
        "er": 3,
        "h": 5,
        "bb": 2,
        "so": 4,
        "era": 5.79
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 0,
        "h": 5,
        "bb": 1,
        "so": 5,
        "era": 0.0
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 37.0,
      "home": 63.0
    },
    "expected_score": {
      "away": 2.0,
      "home": 2.6
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "R",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 32.0,
        "sp_detail": {
          "era": 4.5,
          "whip": 1.33,
          "k9": 7.5,
          "avg_ip": 3.6,
          "qs_rate": 10.0,
          "last3_era": 4.34,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 53.4,
        "bp_detail": {
          "bullpen_era": 3.83,
          "team_era": 3.89,
          "sample_games": 10
        },
        "bat_score": 33.3,
        "bat_detail": {
          "recent_avg": 0.227,
          "runs_per_g": 4.9,
          "hr_per_g": 0.8,
          "bb_per_g": 3.0,
          "season_ops": 0.748,
          "season_avg": 0.227,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Kyle Stowers(0.942)",
            "Griffin Conine(0.897)",
            "Otto Lopez(0.728)",
            "Owen Caissie(0.784)",
            "Heriberto Hernández(0.745)",
            "Jakob Marsee(0.715)",
            "Leo Jiménez(0.500)",
            "Joe Mack(0.744)",
            "Javier Sanoja(0.681)"
          ]
        },
        "sit_score": 48.1,
        "total": 40.2
      },
      "home": {
        "sp_score": 46.9,
        "sp_detail": {
          "era": 3.4,
          "whip": 1.38,
          "k9": 7.0,
          "avg_ip": 4.5,
          "qs_rate": 10.0,
          "last3_era": 3.16,
          "trend": "stable",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 5,
          "rest_note": null
        },
        "bp_score": 80.0,
        "bp_detail": {
          "bullpen_era": 1.84,
          "team_era": 1.82,
          "sample_games": 10
        },
        "bat_score": 35.3,
        "bat_detail": {
          "recent_avg": 0.23,
          "runs_per_g": 4.9,
          "hr_per_g": 1.3,
          "bb_per_g": 3.0,
          "season_ops": 0.735,
          "season_avg": 0.23,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Drake Baldwin(0.714)",
            "Ronald Acuña Jr.(0.641)",
            "Matt Olson(0.953)",
            "Michael Harris II(0.654)",
            "Ozzie Albies(0.756)",
            "Mike Yastrzemski(0.841)",
            "Dominic Smith(0.788)",
            "Austin Riley(0.691)",
            "Jim Jarvis(0.574)"
          ]
        },
        "sit_score": 72.5,
        "total": 55.5
      }
    },
    "scores": {
      "away_offense": 33.3,
      "away_defense": 42.7,
      "home_offense": 35.3,
      "home_defense": 63.5
    },
    "actual_score": {
      "away": 2,
      "home": 4
    },
    "actual_winner": "Atlanta Braves",
    "model_winner": "Atlanta Braves",
    "model_correct": true,
    "notes": "Miami Marlins IL: Adam Mazur, Andrew Nardi, Anthony Bender, Max Meyer, Robby Snelling 외 다수 / Atlanta Braves IL: Joe Jiménez, Joey Wentz, Reynaldo López, Robert Suarez, Spencer Schwellenbach 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Minnesota Twins",
    "home": "Kansas City Royals",
    "away_standing": {
      "div_rank": 3,
      "div_name": "AL Central",
      "wins": 56,
      "losses": 58,
      "games_back": "4.0"
    },
    "home_standing": {
      "div_rank": 5,
      "div_name": "AL Central",
      "wins": 47,
      "losses": 67,
      "games_back": "13.0"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "0-4",
          "home": true
        },
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "4-3",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "5-3",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "3-4",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "6-7",
          "home": false
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": -2
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "4-0",
          "home": false
        },
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "3-4",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "1-3",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "6-12",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "1-8",
          "home": false
        }
      ],
      "wins": 1,
      "losses": 4,
      "streak": -4
    },
    "away_pitcher": "Joe Ryan",
    "away_pitcher_stats": {
      "wins": 6,
      "losses": 8,
      "era": "3.65"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-05",
        "ip": "7.0",
        "er": 0,
        "h": 3,
        "bb": 1,
        "so": 9,
        "era": 0.0
      },
      {
        "date": "2026-07-11",
        "ip": "6.0",
        "er": 2,
        "h": 6,
        "bb": 2,
        "so": 6,
        "era": 3.0
      },
      {
        "date": "2026-07-20",
        "ip": "4.0",
        "er": 8,
        "h": 10,
        "bb": 0,
        "so": 3,
        "era": 18.0
      },
      {
        "date": "2026-07-29",
        "ip": "6.0",
        "er": 4,
        "h": 8,
        "bb": 0,
        "so": 4,
        "era": 6.0
      },
      {
        "date": "2026-08-04",
        "ip": "5.1",
        "er": 4,
        "h": 7,
        "bb": 2,
        "so": 3,
        "era": 6.75
      }
    ],
    "home_pitcher": "Randy Dobnak",
    "home_pitcher_stats": {
      "wins": 2,
      "losses": 0,
      "era": "1.16"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-08",
        "ip": "5.2",
        "er": 0,
        "h": 3,
        "bb": 3,
        "so": 2,
        "era": 0.0
      },
      {
        "date": "2026-07-18",
        "ip": "4.1",
        "er": 1,
        "h": 4,
        "bb": 4,
        "so": 3,
        "era": 2.08
      },
      {
        "date": "2026-07-23",
        "ip": "5.0",
        "er": 0,
        "h": 4,
        "bb": 1,
        "so": 3,
        "era": 0.0
      },
      {
        "date": "2026-07-29",
        "ip": "7.0",
        "er": 0,
        "h": 4,
        "bb": 1,
        "so": 4,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "5.0",
        "er": 1,
        "h": 3,
        "bb": 3,
        "so": 1,
        "era": 1.8
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 36.0,
      "home": 64.0
    },
    "expected_score": {
      "away": 2.2,
      "home": 2.1
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "R",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 40.3,
        "sp_detail": {
          "era": 4.23,
          "whip": 1.36,
          "k9": 9.6,
          "avg_ip": 5.5,
          "qs_rate": 40.0,
          "last3_era": 5.72,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 51.0,
        "bp_detail": {
          "bullpen_era": 3.95,
          "team_era": 4.14,
          "sample_games": 10
        },
        "bat_score": 33.9,
        "bat_detail": {
          "recent_avg": 0.241,
          "runs_per_g": 4.5,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.729,
          "season_avg": 0.241,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Trevor Larnach(0.827)",
            "Ryan Jeffers(0.806)",
            "Josh Bell(0.654)",
            "Kody Clemens(0.702)",
            "Royce Lewis(0.901)",
            "Brooks Lee(0.625)",
            "Alan Roden(0.542)",
            "Luke Keaschall(0.788)",
            "Ryan Kreidler(0.716)"
          ]
        },
        "sit_score": 44.9,
        "total": 41.7
      },
      "home": {
        "sp_score": 71.2,
        "sp_detail": {
          "era": 1.16,
          "whip": 1.19,
          "k9": 4.4,
          "avg_ip": 5.2,
          "qs_rate": 16.7,
          "last3_era": 0.67,
          "trend": "hot",
          "n_games": 6,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 45.6,
        "bp_detail": {
          "bullpen_era": 4.22,
          "team_era": 4.28,
          "sample_games": 10
        },
        "bat_score": 28.9,
        "bat_detail": {
          "recent_avg": 0.228,
          "runs_per_g": 4.2,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.721,
          "season_avg": 0.228,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Carter Jensen(0.646)",
            "Bobby Witt Jr.(0.716)",
            "Jac Caglianone(0.706)",
            "Salvador Perez(0.752)",
            "Michael Massey(0.648)",
            "Nick Loftin(0.774)",
            "Isaac Collins(0.730)",
            "John Rave(0.869)",
            "Kyle Isbel(0.646)"
          ]
        },
        "sit_score": 51.7,
        "total": 49.2
      }
    },
    "scores": {
      "away_offense": 33.9,
      "away_defense": 45.6,
      "home_offense": 28.9,
      "home_defense": 58.4
    },
    "actual_score": {
      "away": 2,
      "home": 8
    },
    "actual_winner": "Kansas City Royals",
    "model_winner": "Kansas City Royals",
    "model_correct": true,
    "notes": "Minnesota Twins IL: Anthony Banda, Byron Buxton, Cole Sands, David Festa, Mick Abel 외 다수 / Kansas City Royals IL: Alec Marsh, Beck Way, Carlos Estévez, Cole Ragans, Connor Seabold 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Pittsburgh Pirates",
    "home": "Milwaukee Brewers",
    "away_standing": {
      "div_rank": 3,
      "div_name": "NL Central",
      "wins": 57,
      "losses": 58,
      "games_back": "14.0"
    },
    "home_standing": {
      "div_rank": 1,
      "div_name": "NL Central",
      "wins": 70,
      "losses": 43,
      "games_back": "-"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "2-3",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "7-8",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "4-1",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "2-10",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "4-3",
          "home": false
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": 1
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "3-16",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "6-2",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "3-1",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "0-3",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "3-4",
          "home": true
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": -2
    },
    "away_pitcher": "Jared Jones",
    "away_pitcher_stats": {
      "wins": 2,
      "losses": 3,
      "era": "4.02"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-08",
        "ip": "6.0",
        "er": 0,
        "h": 0,
        "bb": 0,
        "so": 8,
        "era": 0.0
      },
      {
        "date": "2026-07-18",
        "ip": "5.0",
        "er": 1,
        "h": 3,
        "bb": 1,
        "so": 9,
        "era": 1.8
      },
      {
        "date": "2026-07-24",
        "ip": "6.0",
        "er": 1,
        "h": 2,
        "bb": 1,
        "so": 5,
        "era": 1.5
      },
      {
        "date": "2026-07-29",
        "ip": "6.0",
        "er": 3,
        "h": 4,
        "bb": 2,
        "so": 5,
        "era": 4.5
      },
      {
        "date": "2026-08-04",
        "ip": "4.0",
        "er": 3,
        "h": 8,
        "bb": 1,
        "so": 4,
        "era": 6.75
      }
    ],
    "home_pitcher": "Logan Henderson",
    "home_pitcher_stats": {
      "wins": 6,
      "losses": 1,
      "era": "2.70"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-09",
        "ip": "5.1",
        "er": 3,
        "h": 3,
        "bb": 1,
        "so": 4,
        "era": 5.06
      },
      {
        "date": "2026-07-17",
        "ip": "5.0",
        "er": 1,
        "h": 3,
        "bb": 0,
        "so": 4,
        "era": 1.8
      },
      {
        "date": "2026-07-22",
        "ip": "5.0",
        "er": 2,
        "h": 5,
        "bb": 0,
        "so": 9,
        "era": 3.6
      },
      {
        "date": "2026-07-28",
        "ip": "5.2",
        "er": 0,
        "h": 2,
        "bb": 2,
        "so": 7,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 2,
        "h": 4,
        "bb": 1,
        "so": 8,
        "era": 3.0
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 37.0,
      "home": 63.0
    },
    "expected_score": {
      "away": 2.2,
      "home": 3.2
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "R",
      "bullpen_game": false,
      "any_cold_sp": false,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.2,
        "bat": 0.35,
        "sit": 0.15
      },
      "away": {
        "sp_score": 60.9,
        "sp_detail": {
          "era": 3.86,
          "whip": 1.01,
          "k9": 10.0,
          "avg_ip": 4.7,
          "qs_rate": 30.0,
          "last3_era": 2.67,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 62.6,
        "bp_detail": {
          "bullpen_era": 3.37,
          "team_era": 3.5,
          "sample_games": 10
        },
        "bat_score": 36.3,
        "bat_detail": {
          "recent_avg": 0.245,
          "runs_per_g": 4.5,
          "hr_per_g": 1.2,
          "bb_per_g": 3.0,
          "season_ops": 0.738,
          "season_avg": 0.245,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Jake Mangum(0.722)",
            "Brandon Lowe(0.929)",
            "Bryan Reynolds(0.766)",
            "Esmerlyn Valdez(0.803)",
            "Spencer Horwitz(0.752)",
            "Nick Gonzales(0.653)",
            "Endy Rodríguez(0.795)",
            "Jacob Gonzalez(0.585)",
            "Jared Triolo(0.635)"
          ]
        },
        "sit_score": 47.9,
        "total": 50.7
      },
      "home": {
        "sp_score": 68.4,
        "sp_detail": {
          "era": 2.7,
          "whip": 0.9,
          "k9": 11.2,
          "avg_ip": 5.0,
          "qs_rate": 20.0,
          "last3_era": 2.67,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 7,
          "rest_note": "extra_rest"
        },
        "bp_score": 58.0,
        "bp_detail": {
          "bullpen_era": 3.6,
          "team_era": 3.64,
          "sample_games": 10
        },
        "bat_score": 48.4,
        "bat_detail": {
          "recent_avg": 0.252,
          "runs_per_g": 6.8,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.738,
          "season_avg": 0.252,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Brice Turang(0.791)",
            "Jackson Chourio(0.798)",
            "Garrett Mitchell(0.564)",
            "William Contreras(0.693)",
            "Christian Yelich(0.616)",
            "Andrew Vaughn(0.875)",
            "Luis Lara(0.767)",
            "Cooper Pratt(0.901)",
            "David Hamilton(0.633)"
          ]
        },
        "sit_score": 66.8,
        "total": 59.1
      }
    },
    "scores": {
      "away_offense": 36.3,
      "away_defense": 61.8,
      "home_offense": 48.4,
      "home_defense": 63.2
    },
    "actual_score": {
      "away": 2,
      "home": 4
    },
    "actual_winner": "Milwaukee Brewers",
    "model_winner": "Milwaukee Brewers",
    "model_correct": true,
    "notes": "Pittsburgh Pirates IL: Chris Devenski, Evan Sisk, Konnor Griffin, Mitch Keller, Oneil Cruz 외 다수 / Milwaukee Brewers IL: Angel Zerpa, Brandon Woodruff, Brian Fitzpatrick, JoJo Romero, Joel Kuhnel 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Los Angeles Dodgers",
    "home": "Chicago Cubs",
    "away_standing": {
      "div_rank": 1,
      "div_name": "NL West",
      "wins": 69,
      "losses": 45,
      "games_back": "-"
    },
    "home_standing": {
      "div_rank": 2,
      "div_name": "NL Central",
      "wins": 65,
      "losses": 49,
      "games_back": "5.5"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "6-2",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "4-9",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "2-3",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "4-8",
          "home": true
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "5-10",
          "home": false
        }
      ],
      "wins": 1,
      "losses": 4,
      "streak": -4
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "4-2",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "0-2",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "5-2",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "1-2",
          "home": true
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "10-5",
          "home": true
        }
      ],
      "wins": 3,
      "losses": 2,
      "streak": 1
    },
    "away_pitcher": "Tarik Skubal",
    "away_pitcher_stats": {
      "wins": 7,
      "losses": 6,
      "era": "2.81"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-12",
        "ip": "5.0",
        "er": 2,
        "h": 4,
        "bb": 1,
        "so": 5,
        "era": 3.6
      },
      {
        "date": "2026-07-18",
        "ip": "7.0",
        "er": 0,
        "h": 5,
        "bb": 0,
        "so": 9,
        "era": 0.0
      },
      {
        "date": "2026-07-24",
        "ip": "7.1",
        "er": 1,
        "h": 4,
        "bb": 2,
        "so": 12,
        "era": 1.23
      },
      {
        "date": "2026-07-29",
        "ip": "6.2",
        "er": 3,
        "h": 4,
        "bb": 1,
        "so": 6,
        "era": 4.05
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 2,
        "h": 4,
        "bb": 2,
        "so": 6,
        "era": 3.0
      }
    ],
    "home_pitcher": "Javier Assad",
    "home_pitcher_stats": {
      "wins": 6,
      "losses": 1,
      "era": "3.58"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-11",
        "ip": "5.0",
        "er": 2,
        "h": 7,
        "bb": 0,
        "so": 4,
        "era": 3.6
      },
      {
        "date": "2026-07-20",
        "ip": "1.0",
        "er": 0,
        "h": 2,
        "bb": 1,
        "so": 2,
        "era": 0.0
      },
      {
        "date": "2026-07-25",
        "ip": "3.0",
        "er": 0,
        "h": 1,
        "bb": 0,
        "so": 3,
        "era": 0.0
      },
      {
        "date": "2026-07-30",
        "ip": "4.1",
        "er": 1,
        "h": 6,
        "bb": 2,
        "so": 6,
        "era": 2.08
      },
      {
        "date": "2026-08-04",
        "ip": "5.2",
        "er": 1,
        "h": 4,
        "bb": 2,
        "so": 3,
        "era": 1.59
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 49.7,
      "home": 50.3
    },
    "expected_score": {
      "away": 3.1,
      "home": 3.1
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "L",
      "home_handedness": "R",
      "bullpen_game": false,
      "any_cold_sp": false,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.2,
        "bat": 0.35,
        "sit": 0.15
      },
      "away": {
        "sp_score": 72.0,
        "sp_detail": {
          "era": 2.88,
          "whip": 0.89,
          "k9": 11.7,
          "avg_ip": 5.9,
          "qs_rate": 50.0,
          "last3_era": 2.25,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 58.0,
        "bp_detail": {
          "bullpen_era": 3.6,
          "team_era": 3.6,
          "sample_games": 10
        },
        "bat_score": 48.4,
        "bat_detail": {
          "recent_avg": 0.245,
          "runs_per_g": 6.8,
          "hr_per_g": 2.1,
          "bb_per_g": 3.0,
          "season_ops": 0.689,
          "season_avg": 0.245,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Shohei Ohtani(1.028)",
            "Andy Pages(0.742)",
            "Freddie Freeman(0.916)",
            "Max Muncy(0.710)",
            "Mookie Betts(0.510)",
            "Kyle Tucker(0.817)",
            "Teoscar Hernández(0.860)",
            "Tommy Edman(0.620)",
            "Ben Rortvedt(0.000)"
          ]
        },
        "sit_score": 51.6,
        "total": 57.9
      },
      "home": {
        "sp_score": 58.6,
        "sp_detail": {
          "era": 2.72,
          "whip": 1.21,
          "k9": 6.7,
          "avg_ip": 4.3,
          "qs_rate": 10.0,
          "last3_era": 1.89,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 5,
          "rest_note": null
        },
        "bp_score": 56.8,
        "bp_detail": {
          "bullpen_era": 3.66,
          "team_era": 3.72,
          "sample_games": 10
        },
        "bat_score": 48.2,
        "bat_detail": {
          "recent_avg": 0.291,
          "runs_per_g": 4.1,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.804,
          "season_avg": 0.291,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Pete Crow-Armstrong(0.850)",
            "Seiya Suzuki(0.930)",
            "Alex Bregman(0.852)",
            "Michael Busch(0.646)",
            "Nico Hoerner(0.883)",
            "Tyrone Taylor(0.932)",
            "Dansby Swanson(0.728)",
            "Pedro Ramírez(0.788)",
            "Miguel Amaya(0.625)"
          ]
        },
        "sit_score": 62.1,
        "total": 55.1
      }
    },
    "scores": {
      "away_offense": 48.4,
      "away_defense": 65.0,
      "home_offense": 48.2,
      "home_defense": 57.7
    },
    "actual_score": {
      "away": 1,
      "home": 5
    },
    "actual_winner": "Chicago Cubs",
    "model_winner": "Chicago Cubs",
    "model_correct": true,
    "notes": "Los Angeles Dodgers IL: Ben Casparius, Blake Snell, Blake Treinen, Bobby Miller, Brock Stewart 외 다수 / Chicago Cubs IL: Ben Brown, Cade Horton, Clay Holmes, Daniel Palencia, Edward Cabrera 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "San Francisco Giants",
    "home": "Texas Rangers",
    "away_standing": {
      "div_rank": 4,
      "div_name": "NL West",
      "wins": 48,
      "losses": 66,
      "games_back": "21.0"
    },
    "home_standing": {
      "div_rank": 2,
      "div_name": "AL West",
      "wins": 56,
      "losses": 58,
      "games_back": "2.5"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "4-1",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "0-7",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "5-6",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "4-5",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "5-1",
          "home": false
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": 1
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "2-3",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "2-11",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "L",
          "score": "4-5",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "3-7",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "1-5",
          "home": true
        }
      ],
      "wins": 0,
      "losses": 5,
      "streak": -5
    },
    "away_pitcher": "Blade Tidwell",
    "away_pitcher_stats": {
      "wins": 0,
      "losses": 0,
      "era": "3.18"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-04-15",
        "ip": "1.0",
        "er": 0,
        "h": 0,
        "bb": 0,
        "so": 1,
        "era": 0.0
      },
      {
        "date": "2026-04-17",
        "ip": "1.0",
        "er": 0,
        "h": 0,
        "bb": 0,
        "so": 0,
        "era": 0.0
      },
      {
        "date": "2026-04-23",
        "ip": "2.0",
        "er": 0,
        "h": 1,
        "bb": 1,
        "so": 2,
        "era": 0.0
      },
      {
        "date": "2026-04-28",
        "ip": "2.0",
        "er": 2,
        "h": 4,
        "bb": 1,
        "so": 2,
        "era": 9.0
      },
      {
        "date": "2026-08-04",
        "ip": "5.0",
        "er": 2,
        "h": 6,
        "bb": 1,
        "so": 3,
        "era": 3.6
      }
    ],
    "home_pitcher": "MacKenzie Gore",
    "home_pitcher_stats": {
      "wins": 6,
      "losses": 9,
      "era": "4.55"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-12",
        "ip": "4.0",
        "er": 1,
        "h": 2,
        "bb": 1,
        "so": 4,
        "era": 2.25
      },
      {
        "date": "2026-07-18",
        "ip": "5.2",
        "er": 5,
        "h": 6,
        "bb": 1,
        "so": 7,
        "era": 7.94
      },
      {
        "date": "2026-07-24",
        "ip": "5.0",
        "er": 3,
        "h": 7,
        "bb": 2,
        "so": 5,
        "era": 5.4
      },
      {
        "date": "2026-07-29",
        "ip": "7.0",
        "er": 3,
        "h": 3,
        "bb": 0,
        "so": 9,
        "era": 3.86
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 0,
        "h": 3,
        "bb": 3,
        "so": 4,
        "era": 0.0
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 33.0,
      "home": 67.0
    },
    "expected_score": {
      "away": 0.3,
      "home": 1.8
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "L",
      "bullpen_game": false,
      "any_cold_sp": false,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.2,
        "bat": 0.35,
        "sit": 0.15
      },
      "away": {
        "sp_score": 49.8,
        "sp_detail": {
          "era": 3.18,
          "whip": 1.18,
          "k9": 6.9,
          "avg_ip": 1.9,
          "qs_rate": 0.0,
          "last3_era": 3.27,
          "trend": "neutral",
          "n_games": 9,
          "sample_confidence": 1.0,
          "rest_days": 98,
          "rest_note": "long_rest"
        },
        "bp_score": 37.0,
        "bp_detail": {
          "bullpen_era": 4.65,
          "team_era": 4.65,
          "sample_games": 10
        },
        "bat_score": 4.3,
        "bat_detail": {
          "recent_avg": 0.182,
          "runs_per_g": 2.6,
          "hr_per_g": 0.4,
          "bb_per_g": 3.0,
          "season_ops": 0.612,
          "season_avg": 0.182,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Osleivis Basabe(1.187)",
            "Jung Hoo Lee(0.912)",
            "Willy Adames(0.603)",
            "Rafael Devers(0.715)",
            "Daniel Susac(0.839)",
            "Buddy Kennedy(0.305)",
            "Eddys Leonard(0.000)",
            "Grant McCray(0.549)",
            "Christian Koss(0.402)"
          ]
        },
        "sit_score": 42.8,
        "total": 30.3
      },
      "home": {
        "sp_score": 51.6,
        "sp_detail": {
          "era": 4.99,
          "whip": 1.11,
          "k9": 10.0,
          "avg_ip": 5.8,
          "qs_rate": 40.0,
          "last3_era": 3.9,
          "trend": "stable",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 68.0,
        "bp_detail": {
          "bullpen_era": 3.1,
          "team_era": 3.34,
          "sample_games": 10
        },
        "bat_score": 23.9,
        "bat_detail": {
          "recent_avg": 0.22,
          "runs_per_g": 3.8,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.703,
          "season_avg": 0.22,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Joc Pederson(0.869)",
            "Wyatt Langford(0.628)",
            "Corey Seager(0.851)",
            "Brandon Nimmo(0.813)",
            "Ezequiel Duran(0.918)",
            "Evan Carter(0.663)",
            "Elias Díaz(0.617)",
            "Nicky Lopez(0.469)",
            "Justin Foscue(0.495)"
          ]
        },
        "sit_score": 60.9,
        "total": 46.6
      }
    },
    "scores": {
      "away_offense": 4.3,
      "away_defense": 43.4,
      "home_offense": 23.9,
      "home_defense": 59.8
    },
    "actual_score": {
      "away": 4,
      "home": 5
    },
    "actual_winner": "Texas Rangers",
    "model_winner": "Texas Rangers",
    "model_correct": true,
    "notes": "San Francisco Giants IL: Casey Schmitt, Harrison Bader, Hayden Birdsong, Jesus Rodriguez, Joel Peguero 외 다수 / Texas Rangers IL: Carter Baumler, Cody Bradford, Danny Jansen, Jack Leiter, Jakob Junis 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Toronto Blue Jays",
    "home": "Houston Astros",
    "away_standing": {
      "div_rank": 5,
      "div_name": "AL East",
      "wins": 53,
      "losses": 61,
      "games_back": "14.5"
    },
    "home_standing": {
      "div_rank": 1,
      "div_name": "AL West",
      "wins": 59,
      "losses": 56,
      "games_back": "-"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "5-2",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "3-1",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "5-1",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "1-5",
          "home": true
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "3-1",
          "home": false
        }
      ],
      "wins": 4,
      "losses": 1,
      "streak": 1
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "7-4",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "11-2",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "5-4",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "7-3",
          "home": true
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "1-3",
          "home": true
        }
      ],
      "wins": 4,
      "losses": 1,
      "streak": -1
    },
    "away_pitcher": "Trey Yesavage",
    "away_pitcher_stats": {
      "wins": 5,
      "losses": 5,
      "era": "3.65"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-11",
        "ip": "1.2",
        "er": 4,
        "h": 1,
        "bb": 7,
        "so": 1,
        "era": 21.6
      },
      {
        "date": "2026-07-19",
        "ip": "6.0",
        "er": 3,
        "h": 5,
        "bb": 2,
        "so": 9,
        "era": 4.5
      },
      {
        "date": "2026-07-24",
        "ip": "4.0",
        "er": 3,
        "h": 5,
        "bb": 1,
        "so": 9,
        "era": 6.75
      },
      {
        "date": "2026-07-29",
        "ip": "6.2",
        "er": 1,
        "h": 3,
        "bb": 3,
        "so": 4,
        "era": 1.35
      },
      {
        "date": "2026-08-04",
        "ip": "2.0",
        "er": 0,
        "h": 0,
        "bb": 1,
        "so": 0,
        "era": 0.0
      }
    ],
    "home_pitcher": "Hayden Wesneski",
    "home_pitcher_stats": {
      "wins": 2,
      "losses": 0,
      "era": "3.86"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-29",
        "ip": "5.2",
        "er": 3,
        "h": 7,
        "bb": 2,
        "so": 4,
        "era": 4.76
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 2,
        "h": 4,
        "bb": 2,
        "so": 4,
        "era": 3.0
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 33.0,
      "home": 67.0
    },
    "expected_score": {
      "away": 2.1,
      "home": 4.7
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "R",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 48.8,
        "sp_detail": {
          "era": 4.06,
          "whip": 1.12,
          "k9": 8.3,
          "avg_ip": 5.1,
          "qs_rate": 50.0,
          "last3_era": 4.87,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 36.8,
        "bp_detail": {
          "bullpen_era": 4.66,
          "team_era": 4.71,
          "sample_games": 10
        },
        "bat_score": 28.6,
        "bat_detail": {
          "recent_avg": 0.254,
          "runs_per_g": 3.6,
          "hr_per_g": 1.0,
          "bb_per_g": 3.0,
          "season_ops": 0.679,
          "season_avg": 0.254,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Nathan Lukes(0.553)",
            "Vladimir Guerrero Jr.(0.660)",
            "Kazuma Okamoto(0.685)",
            "George Springer(0.857)",
            "Alejandro Kirk(0.774)",
            "Jesús Sánchez(0.543)",
            "Ernie Clement(0.633)",
            "Andrés Giménez(0.639)",
            "Myles Straw(0.770)"
          ]
        },
        "sit_score": 43.5,
        "total": 38.9
      },
      "home": {
        "sp_score": 48.8,
        "sp_detail": {
          "era": 3.86,
          "whip": 1.29,
          "k9": 6.2,
          "avg_ip": 5.8,
          "qs_rate": 50.0,
          "last3_era": 3.86,
          "trend": "stable",
          "n_games": 2,
          "sample_confidence": 0.4,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 23.6,
        "bp_detail": {
          "bullpen_era": 5.32,
          "team_era": 5.46,
          "sample_games": 10
        },
        "bat_score": 62.7,
        "bat_detail": {
          "recent_avg": 0.284,
          "runs_per_g": 7.0,
          "hr_per_g": 1.4,
          "bb_per_g": 3.0,
          "season_ops": 0.8,
          "season_avg": 0.284,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Jeremy Peña(1.024)",
            "Yordan Alvarez(1.089)",
            "Isaac Paredes(0.614)",
            "Daulton Varsho(0.655)",
            "Christian Walker(0.816)",
            "Jose Altuve(0.632)",
            "Taylor Trammell(0.871)",
            "Yainer Diaz(0.824)",
            "Cam Smith(0.673)"
          ]
        },
        "sit_score": 65.2,
        "total": 49.1
      }
    },
    "scores": {
      "away_offense": 28.6,
      "away_defense": 42.8,
      "home_offense": 62.7,
      "home_defense": 36.2
    },
    "actual_score": {
      "away": 2,
      "home": 7
    },
    "actual_winner": "Houston Astros",
    "model_winner": "Houston Astros",
    "model_correct": true,
    "notes": "Toronto Blue Jays IL: Addison Barger, Anthony Santander, Bowden Francis, Cody Ponce, Joe Mantiply 외 다수 / Houston Astros IL: Brandon Walter, Brice Matthews, Carlos Correa, Mike Burrows",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Tampa Bay Rays",
    "home": "Colorado Rockies",
    "away_standing": {
      "div_rank": 1,
      "div_name": "AL East",
      "wins": 67,
      "losses": 46,
      "games_back": "-"
    },
    "home_standing": {
      "div_rank": 5,
      "div_name": "NL West",
      "wins": 45,
      "losses": 69,
      "games_back": "24.0"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "W",
          "score": "3-2",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "1-6",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "1-0",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "1-9",
          "home": true
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "13-9",
          "home": false
        }
      ],
      "wins": 3,
      "losses": 2,
      "streak": 1
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "1-3",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "3-1",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "12-6",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "8-1",
          "home": true
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "9-13",
          "home": true
        }
      ],
      "wins": 3,
      "losses": 2,
      "streak": -1
    },
    "away_pitcher": "Freddy Peralta",
    "away_pitcher_stats": {
      "wins": 5,
      "losses": 9,
      "era": "5.37"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-06",
        "ip": "4.2",
        "er": 1,
        "h": 6,
        "bb": 1,
        "so": 6,
        "era": 1.93
      },
      {
        "date": "2026-07-11",
        "ip": "4.1",
        "er": 2,
        "h": 3,
        "bb": 5,
        "so": 6,
        "era": 4.15
      },
      {
        "date": "2026-07-20",
        "ip": "5.1",
        "er": 7,
        "h": 8,
        "bb": 2,
        "so": 6,
        "era": 11.81
      },
      {
        "date": "2026-07-26",
        "ip": "4.0",
        "er": 2,
        "h": 6,
        "bb": 2,
        "so": 3,
        "era": 4.5
      },
      {
        "date": "2026-08-04",
        "ip": "3.2",
        "er": 7,
        "h": 9,
        "bb": 1,
        "so": 3,
        "era": 17.18
      }
    ],
    "home_pitcher": "Gabriel Hughes",
    "home_pitcher_stats": {
      "wins": 0,
      "losses": 3,
      "era": "4.25"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-08",
        "ip": "6.0",
        "er": 3,
        "h": 4,
        "bb": 2,
        "so": 7,
        "era": 4.5
      },
      {
        "date": "2026-07-17",
        "ip": "5.1",
        "er": 2,
        "h": 5,
        "bb": 2,
        "so": 6,
        "era": 3.38
      },
      {
        "date": "2026-07-22",
        "ip": "5.0",
        "er": 1,
        "h": 5,
        "bb": 1,
        "so": 5,
        "era": 1.8
      },
      {
        "date": "2026-07-29",
        "ip": "5.0",
        "er": 3,
        "h": 6,
        "bb": 1,
        "so": 2,
        "era": 5.4
      },
      {
        "date": "2026-08-04",
        "ip": "5.1",
        "er": 5,
        "h": 4,
        "bb": 2,
        "so": 7,
        "era": 8.44
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 40.0,
      "home": 60.0
    },
    "expected_score": {
      "away": 3.0,
      "home": 3.8
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "R",
      "bullpen_game": true,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.3,
        "bat": 0.25,
        "sit": 0.15
      },
      "away": {
        "sp_score": 25.0,
        "sp_detail": {
          "era": 8.14,
          "whip": 1.83,
          "k9": 8.3,
          "avg_ip": 4.5,
          "qs_rate": 0.0,
          "last3_era": 7.77,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 9,
          "rest_note": "extra_rest"
        },
        "bp_score": 40.8,
        "bp_detail": {
          "bullpen_era": 4.46,
          "team_era": 4.64,
          "sample_games": 10
        },
        "bat_score": 42.4,
        "bat_detail": {
          "recent_avg": 0.251,
          "runs_per_g": 5.1,
          "hr_per_g": 1.1,
          "bb_per_g": 3.0,
          "season_ops": 0.713,
          "season_avg": 0.251,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Yandy Díaz(0.775)",
            "Jonathan Aranda(0.723)",
            "Junior Caminero(0.923)",
            "Liam Hicks(0.804)",
            "Victor Mesa Jr.(0.506)",
            "Chandler Simpson(0.762)",
            "Cedric Mullins(0.720)",
            "Richie Palacios(0.673)",
            "Taylor Walls(0.535)"
          ]
        },
        "sit_score": 61.4,
        "total": 39.5
      },
      "home": {
        "sp_score": 36.3,
        "sp_detail": {
          "era": 4.25,
          "whip": 1.18,
          "k9": 8.5,
          "avg_ip": 4.9,
          "qs_rate": 16.7,
          "last3_era": 4.73,
          "trend": "cold",
          "n_games": 6,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 46.6,
        "bp_detail": {
          "bullpen_era": 4.17,
          "team_era": 4.21,
          "sample_games": 10
        },
        "bat_score": 47.9,
        "bat_detail": {
          "recent_avg": 0.28,
          "runs_per_g": 3.9,
          "hr_per_g": 0.9,
          "bb_per_g": 3.0,
          "season_ops": 0.798,
          "season_avg": 0.28,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Jake McCarthy(0.706)",
            "Cole Carrigg(0.974)",
            "Mickey Moniak(0.899)",
            "Hunter Goodman(0.787)",
            "TJ Rumfield(0.740)",
            "Kyle Karros(0.816)",
            "Willi Castro(0.875)",
            "Jordan Beck(0.698)",
            "Ezequiel Tovar(0.684)"
          ]
        },
        "sit_score": 47.4,
        "total": 44.0
      }
    },
    "scores": {
      "away_offense": 42.4,
      "away_defense": 32.9,
      "home_offense": 47.9,
      "home_defense": 41.5
    },
    "actual_score": {
      "away": 9,
      "home": 7
    },
    "actual_winner": "Tampa Bay Rays",
    "model_winner": "Colorado Rockies",
    "model_correct": false,
    "notes": "Tampa Bay Rays IL: Cole Sulser, Edwin Uceta, Gavin Lux, Jake Fraley, Jonathan Heasley 외 다수 / Colorado Rockies IL: Blas Castaño, Chase Dollander, Jaden Hill, Jeff Criswell, Jose Quintana 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "San Diego Padres",
    "home": "Arizona Diamondbacks",
    "away_standing": {
      "div_rank": 3,
      "div_name": "NL West",
      "wins": 59,
      "losses": 55,
      "games_back": "10.0"
    },
    "home_standing": {
      "div_rank": 2,
      "div_name": "NL West",
      "wins": 60,
      "losses": 54,
      "games_back": "9.0"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "1-4",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "7-0",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "6-5",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "5-4",
          "home": true
        },
        {
          "date": "2026-08-03",
          "result": "L",
          "score": "1-5",
          "home": false
        }
      ],
      "wins": 3,
      "losses": 2,
      "streak": -1
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "W",
          "score": "3-0",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "4-1",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "12-8",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "L",
          "score": "0-5",
          "home": false
        },
        {
          "date": "2026-08-03",
          "result": "W",
          "score": "5-1",
          "home": true
        }
      ],
      "wins": 4,
      "losses": 1,
      "streak": 1
    },
    "away_pitcher": "Randy Vásquez",
    "away_pitcher_stats": {
      "wins": 7,
      "losses": 6,
      "era": "4.19"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-19",
        "ip": "3.0",
        "er": 0,
        "h": 3,
        "bb": 0,
        "so": 2,
        "era": 0.0
      },
      {
        "date": "2026-07-22",
        "ip": "0.2",
        "er": 2,
        "h": 4,
        "bb": 0,
        "so": 1,
        "era": 27.0
      },
      {
        "date": "2026-07-25",
        "ip": "2.2",
        "er": 1,
        "h": 1,
        "bb": 2,
        "so": 0,
        "era": 3.38
      },
      {
        "date": "2026-07-30",
        "ip": "4.2",
        "er": 0,
        "h": 3,
        "bb": 1,
        "so": 1,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 0,
        "h": 2,
        "bb": 1,
        "so": 1,
        "era": 0.0
      }
    ],
    "home_pitcher": "Eduardo Rodriguez",
    "home_pitcher_stats": {
      "wins": 10,
      "losses": 4,
      "era": "2.71"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-10",
        "ip": "6.0",
        "er": 2,
        "h": 7,
        "bb": 1,
        "so": 5,
        "era": 3.0
      },
      {
        "date": "2026-07-19",
        "ip": "2.2",
        "er": 5,
        "h": 7,
        "bb": 2,
        "so": 3,
        "era": 16.88
      },
      {
        "date": "2026-07-24",
        "ip": "6.0",
        "er": 2,
        "h": 7,
        "bb": 3,
        "so": 4,
        "era": 3.0
      },
      {
        "date": "2026-07-29",
        "ip": "8.0",
        "er": 0,
        "h": 5,
        "bb": 1,
        "so": 2,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "5.2",
        "er": 5,
        "h": 11,
        "bb": 0,
        "so": 4,
        "era": 7.94
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 40.7,
      "home": 59.3
    },
    "expected_score": {
      "away": 2.5,
      "home": 2.5
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "L",
      "bullpen_game": false,
      "any_cold_sp": true,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.25,
        "bat": 0.3,
        "sit": 0.15
      },
      "away": {
        "sp_score": 32.0,
        "sp_detail": {
          "era": 5.8,
          "whip": 1.77,
          "k9": 3.8,
          "avg_ip": 3.6,
          "qs_rate": 10.0,
          "last3_era": 1.59,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 5,
          "rest_note": null
        },
        "bp_score": 55.4,
        "bp_detail": {
          "bullpen_era": 3.73,
          "team_era": 3.74,
          "sample_games": 10
        },
        "bat_score": 37.1,
        "bat_detail": {
          "recent_avg": 0.294,
          "runs_per_g": 3.7,
          "hr_per_g": 0.5,
          "bb_per_g": 3.0,
          "season_ops": 0.7,
          "season_avg": 0.294,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "L",
          "splits_used": false,
          "lineup_ops": [
            "Fernando Tatis Jr.(0.678)",
            "Luis Rengifo(0.680)",
            "Manny Machado(0.724)",
            "Ty France(0.801)",
            "Jackson Merrill(0.890)",
            "Xander Bogaerts(0.692)",
            "Freddy Fermin(0.714)",
            "Jake Cronenworth(0.613)",
            "Jase Bowen(0.511)"
          ]
        },
        "sit_score": 52.3,
        "total": 42.4
      },
      "home": {
        "sp_score": 53.4,
        "sp_detail": {
          "era": 2.97,
          "whip": 1.32,
          "k9": 5.5,
          "avg_ip": 5.8,
          "qs_rate": 70.0,
          "last3_era": 4.45,
          "trend": "cold",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 46.2,
        "bp_detail": {
          "bullpen_era": 4.19,
          "team_era": 4.3,
          "sample_games": 10
        },
        "bat_score": 33.7,
        "bat_detail": {
          "recent_avg": 0.262,
          "runs_per_g": 3.5,
          "hr_per_g": 0.8,
          "bb_per_g": 3.0,
          "season_ops": 0.745,
          "season_avg": 0.262,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Corbin Carroll(0.657)",
            "Geraldo Perdomo(0.841)",
            "Max Kepler(0.630)",
            "Ketel Marte(0.609)",
            "Nolan Arenado(0.736)",
            "Lars Nootbaar(0.613)",
            "Tim Tawa(0.571)",
            "James McCann(1.149)",
            "Ryan Waldschmidt(0.898)"
          ]
        },
        "sit_score": 57.4,
        "total": 46.3
      }
    },
    "scores": {
      "away_offense": 37.1,
      "away_defense": 43.7,
      "home_offense": 33.7,
      "home_defense": 49.8
    },
    "actual_score": {
      "away": 9,
      "home": 4
    },
    "actual_winner": "San Diego Padres",
    "model_winner": "Arizona Diamondbacks",
    "model_correct": false,
    "notes": "San Diego Padres IL: Bryan Hoeing, David Morgan, Jason Adam, Joe Musgrove, Lucas Giolito 외 다수 / Arizona Diamondbacks IL: A.J. Puk, Andrew Saalfrank, Blake Walston, Corbin Burnes, Cristian Mena 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  },
  {
    "date": "2026-08-04",
    "status": "Final",
    "away": "Detroit Tigers",
    "home": "Seattle Mariners",
    "away_standing": {
      "div_rank": 4,
      "div_name": "AL Central",
      "wins": 55,
      "losses": 58,
      "games_back": "4.5"
    },
    "home_standing": {
      "div_rank": 3,
      "div_name": "AL West",
      "wins": 55,
      "losses": 59,
      "games_back": "3.5"
    },
    "away_recent_form": {
      "games": [
        {
          "date": "2026-07-28",
          "result": "W",
          "score": "14-0",
          "home": true
        },
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "9-10",
          "home": true
        },
        {
          "date": "2026-07-31",
          "result": "W",
          "score": "13-1",
          "home": false
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "8-6",
          "home": false
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "11-0",
          "home": false
        }
      ],
      "wins": 4,
      "losses": 1,
      "streak": 3
    },
    "home_recent_form": {
      "games": [
        {
          "date": "2026-07-29",
          "result": "L",
          "score": "2-4",
          "home": false
        },
        {
          "date": "2026-07-30",
          "result": "L",
          "score": "2-6",
          "home": false
        },
        {
          "date": "2026-07-31",
          "result": "L",
          "score": "3-5",
          "home": true
        },
        {
          "date": "2026-08-01",
          "result": "W",
          "score": "4-3",
          "home": true
        },
        {
          "date": "2026-08-02",
          "result": "W",
          "score": "7-6",
          "home": true
        }
      ],
      "wins": 2,
      "losses": 3,
      "streak": 2
    },
    "away_pitcher": "Troy Melton",
    "away_pitcher_stats": {
      "wins": 7,
      "losses": 1,
      "era": "1.58"
    },
    "away_pitcher_gamelog": [
      {
        "date": "2026-07-08",
        "ip": "5.1",
        "er": 0,
        "h": 4,
        "bb": 1,
        "so": 9,
        "era": 0.0
      },
      {
        "date": "2026-07-17",
        "ip": "5.2",
        "er": 1,
        "h": 4,
        "bb": 4,
        "so": 9,
        "era": 1.59
      },
      {
        "date": "2026-07-23",
        "ip": "5.0",
        "er": 2,
        "h": 5,
        "bb": 4,
        "so": 5,
        "era": 3.6
      },
      {
        "date": "2026-07-28",
        "ip": "7.0",
        "er": 0,
        "h": 3,
        "bb": 2,
        "so": 5,
        "era": 0.0
      },
      {
        "date": "2026-08-04",
        "ip": "7.0",
        "er": 0,
        "h": 3,
        "bb": 2,
        "so": 4,
        "era": 0.0
      }
    ],
    "home_pitcher": "Emerson Hancock",
    "home_pitcher_stats": {
      "wins": 6,
      "losses": 6,
      "era": "3.33"
    },
    "home_pitcher_gamelog": [
      {
        "date": "2026-07-05",
        "ip": "7.0",
        "er": 0,
        "h": 2,
        "bb": 2,
        "so": 5,
        "era": 0.0
      },
      {
        "date": "2026-07-12",
        "ip": "1.2",
        "er": 0,
        "h": 0,
        "bb": 1,
        "so": 2,
        "era": 0.0
      },
      {
        "date": "2026-07-22",
        "ip": "6.0",
        "er": 2,
        "h": 5,
        "bb": 1,
        "so": 3,
        "era": 3.0
      },
      {
        "date": "2026-07-29",
        "ip": "5.0",
        "er": 3,
        "h": 8,
        "bb": 1,
        "so": 5,
        "era": 5.4
      },
      {
        "date": "2026-08-04",
        "ip": "6.0",
        "er": 3,
        "h": 8,
        "bb": 2,
        "so": 6,
        "era": 4.5
      }
    ],
    "pred_model": "scorecard",
    "win_prob": {
      "away": 59.9,
      "home": 40.1
    },
    "expected_score": {
      "away": 3.5,
      "home": 1.9
    },
    "blend_detail": null,
    "ml_mc_agree": null,
    "ml_mc_conflict_level": null,
    "scorecard": {
      "bat_source": "lineup",
      "away_handedness": "R",
      "home_handedness": "R",
      "bullpen_game": false,
      "any_cold_sp": false,
      "eff_weights": {
        "sp": 0.3,
        "bp": 0.2,
        "bat": 0.35,
        "sit": 0.15
      },
      "away": {
        "sp_score": 72.0,
        "sp_detail": {
          "era": 1.61,
          "whip": 0.9,
          "k9": 8.8,
          "avg_ip": 6.1,
          "qs_rate": 60.0,
          "last3_era": 0.9,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 7,
          "rest_note": "extra_rest"
        },
        "bp_score": 57.6,
        "bp_detail": {
          "bullpen_era": 3.62,
          "team_era": 3.95,
          "sample_games": 10
        },
        "bat_score": 58.4,
        "bat_detail": {
          "recent_avg": 0.318,
          "runs_per_g": 4.5,
          "hr_per_g": 0.7,
          "bb_per_g": 3.0,
          "season_ops": 0.856,
          "season_avg": 0.318,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Kevin McGonigle(0.845)",
            "Gleyber Torres(0.821)",
            "Dillon Dingler(0.754)",
            "Riley Greene(0.759)",
            "Colt Keith(1.008)",
            "Spencer Torkelson(0.796)",
            "Max Clark(1.188)",
            "Javier Báez(0.706)",
            "Zach McKinstry(0.823)"
          ]
        },
        "sit_score": 50.8,
        "total": 61.2
      },
      "home": {
        "sp_score": 57.8,
        "sp_detail": {
          "era": 4.01,
          "whip": 1.16,
          "k9": 7.8,
          "avg_ip": 5.2,
          "qs_rate": 40.0,
          "last3_era": 2.81,
          "trend": "hot",
          "n_games": 10,
          "sample_confidence": 1.0,
          "rest_days": 6,
          "rest_note": null
        },
        "bp_score": 74.8,
        "bp_detail": {
          "bullpen_era": 2.76,
          "team_era": 2.72,
          "sample_games": 10
        },
        "bat_score": 30.5,
        "bat_detail": {
          "recent_avg": 0.25,
          "runs_per_g": 3.7,
          "hr_per_g": 0.9,
          "bb_per_g": 3.0,
          "season_ops": 0.717,
          "season_avg": 0.25,
          "n_games": 9,
          "source": "prev_day",
          "handedness": "R",
          "splits_used": false,
          "lineup_ops": [
            "Cole Young(0.876)",
            "Randy Arozarena(0.885)",
            "Dominic Canzone(0.867)",
            "Julio Rodríguez(0.678)",
            "Josh Naylor(0.704)",
            "Cal Raleigh(0.576)",
            "Brendan Donovan(0.688)",
            "Taylor Ward(0.609)",
            "Colt Emerson(0.572)"
          ]
        },
        "sit_score": 52.7,
        "total": 50.9
      }
    },
    "scores": {
      "away_offense": 58.4,
      "away_defense": 64.8,
      "home_offense": 30.5,
      "home_defense": 66.3
    },
    "actual_score": {
      "away": 8,
      "home": 0
    },
    "actual_winner": "Detroit Tigers",
    "model_winner": "Detroit Tigers",
    "model_correct": true,
    "notes": "Detroit Tigers IL: Bailey Horn, Brant Hurter, Burch Smith, Jack Flaherty, Jackson Jobe 외 다수 / Seattle Mariners IL: Carlos Vargas, Cooper Criswell, J.P. Crawford, Logan Evans, Luke Raley 외 다수",
    "kalshi_prob": null,
    "edge": null,
    "value_bet": "마켓 없음",
    "extreme_edge": false,
    "consensus": false
  }
];
