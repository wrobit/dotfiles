#!/bin/bash

set -u

work_minutes=25
short_break_minutes=5
long_break_minutes=15
cycles_before_long_break=4
bar_width=36

quit_now=0
session_name=""

usage() {
  cat <<'EOF'
pom - simple Pomodoro timer

Usage:
  ./pom.sh
  ./pom.sh -w 50 -b 10 -l 20 -c 3

Options:
  -w MINUTES   Work duration in minutes
  -b MINUTES   Short break duration in minutes
  -l MINUTES   Long break duration in minutes
  -c COUNT     Work sessions before long break

Key while running:
  q   quit
EOF
}

is_integer() {
  [[ "$1" =~ ^[0-9]+$ ]]
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -w)
        shift
        [[ $# -gt 0 ]] || { echo "Missing value for -w"; exit 1; }
        is_integer "$1" || { echo "Invalid work minutes: $1"; exit 1; }
        work_minutes="$1"
        ;;
      -b)
        shift
        [[ $# -gt 0 ]] || { echo "Missing value for -b"; exit 1; }
        is_integer "$1" || { echo "Invalid break minutes: $1"; exit 1; }
        short_break_minutes="$1"
        ;;
      -l)
        shift
        [[ $# -gt 0 ]] || { echo "Missing value for -l"; exit 1; }
        is_integer "$1" || { echo "Invalid long break minutes: $1"; exit 1; }
        long_break_minutes="$1"
        ;;
      -c)
        shift
        [[ $# -gt 0 ]] || { echo "Missing value for -c"; exit 1; }
        is_integer "$1" || { echo "Invalid cycle count: $1"; exit 1; }
        cycles_before_long_break="$1"
        ;;
      *)
        echo "Unknown option: $1"
        echo
        usage
        exit 1
        ;;
    esac
    shift
  done
}

format_mmss() {
  local total=$1
  local mins=$(( total / 60 ))
  local secs=$(( total % 60 ))
  printf "%02d:%02d" "$mins" "$secs"
}

clock_now() {
  date +"%H:%M:%S"
}

repeat_char() {
  local char="$1"
  local count="$2"
  local out=""
  local i
  for ((i=0; i<count; i++)); do
    out="${out}${char}"
  done
  printf "%s" "$out"
}

bell() {
  printf "\a"
}

cleanup() {
  tput cnorm 2>/dev/null || true
  printf "\n"
}

handle_exit() {
  cleanup
  exit 0
}

read_key_nonblocking() {
  local key=""
  if IFS= read -r -s -n 1 -t 1 key; then
    printf "%s" "$key"
    return 0
  fi
  return 1
}

render_bar() {
  local elapsed=$1
  local total=$2
  local width=$3

  local filled=0
  local percent=0
  local empty=0
  local done_part=""
  local todo_part=""

  if (( total > 0 )); then
    filled=$(( elapsed * width / total ))
    percent=$(( elapsed * 100 / total ))
  fi

  (( filled > width )) && filled=$width
  empty=$(( width - filled ))

  done_part=$(repeat_char "█" "$filled")
  todo_part=$(repeat_char "░" "$empty")

  printf "[%s%s] %3d%%" "$done_part" "$todo_part" "$percent"
}

render_screen() {
  local headline="$1"
  local now="$2"
  local remaining="$3"
  local elapsed="$4"
  local total="$5"
  local phase_state="$6"

  local bar_line=""
  local state_text=""

  if [[ "$phase_state" == "done" ]]; then
    state_text=" [done]"
  elif [[ "$phase_state" == "quit" ]]; then
    state_text=" [quit]"
  fi

  bar_line=$(render_bar "$elapsed" "$total" "$bar_width")

  printf "\033[H\033[J"
  printf "%s\n" "$headline"
  printf "%s -> %s%s\n" "$now" "$session_name" "$state_text"
  printf "%s - %s\n" "$remaining" "$bar_line"
  printf "[q] quit\n"
}

run_phase() {
  local duration=$1
  session_name="$2"
  local headline="$3"

  local start_ts
  local now_ts=0
  local elapsed=0
  local remaining=0
  local current_clock=""
  local key=""

  start_ts=$(date +%s)
  tput civis 2>/dev/null || true

  while true; do
    now_ts=$(date +%s)
    elapsed=$(( now_ts - start_ts ))

    (( elapsed < 0 )) && elapsed=0
    (( elapsed > duration )) && elapsed=$duration

    remaining=$(( duration - elapsed ))
    current_clock=$(clock_now)

    render_screen "$headline" "$current_clock" "$(format_mmss "$remaining")" "$elapsed" "$duration" "running"

    if (( elapsed >= duration )); then
      break
    fi

    key=$(read_key_nonblocking || true)
    case "$key" in
      q|Q)
        quit_now=1
        ;;
    esac

    if [[ "$quit_now" -eq 1 ]]; then
      current_clock=$(clock_now)
      render_screen "$headline" "$current_clock" "00:00" "$duration" "$duration" "quit"
      return 2
    fi
  done

  current_clock=$(clock_now)
  render_screen "$headline" "$current_clock" "00:00" "$duration" "$duration" "done"
  bell
  sleep 1
  return 0
}

main_loop() {
  local cycle=1

  while true; do
    run_phase $(( work_minutes * 60 )) "work" "work (cycle $cycle)"
    case $? in
      2) return 0 ;;
    esac

    if (( cycle % cycles_before_long_break == 0 )); then
      run_phase $(( long_break_minutes * 60 )) "long break" "break time"
      case $? in
        2) return 0 ;;
      esac
    else
      run_phase $(( short_break_minutes * 60 )) "short break" "break time"
      case $? in
        2) return 0 ;;
      esac
    fi

    cycle=$(( cycle + 1 ))
  done
}

parse_args "$@"
trap handle_exit INT TERM EXIT
main_loop
