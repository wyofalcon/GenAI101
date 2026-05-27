#!/usr/bin/env python3
"""GenAI101 — instructor dashboard.

Reads one or more student progress JSON files (the ones exported from the
GenAI101 web app) and prints a clean, terminal-friendly report.

Usage:
    python3 view_progress.py                       # reads all *.json in this folder
    python3 view_progress.py path/to/file.json     # reads one specific file
    python3 view_progress.py reports/              # reads all .json in a folder
    python3 view_progress.py --json                # dump combined JSON instead of pretty table
"""

import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent


def find_reports(args):
    paths = []
    for a in args:
        p = Path(a)
        if p.is_file():
            paths.append(p)
        elif p.is_dir():
            paths.extend(sorted(p.glob("*.json")))
        else:
            print(f"!! Skipped: {a} (not found)", file=sys.stderr)
    if not paths:
        paths = sorted(HERE.glob("*.json"))
    return paths


def fmt_duration_ms(ms):
    if not ms or ms < 0:
        return "0s"
    s = ms // 1000
    h, rem = divmod(s, 3600)
    m, sec = divmod(rem, 60)
    if h:
        return f"{h}h {m}m"
    if m:
        return f"{m}m {sec}s"
    return f"{sec}s"


def fmt_dt(iso):
    if not iso:
        return "-"
    try:
        dt = datetime.fromisoformat(iso.replace("Z", "+00:00"))
        return dt.strftime("%Y-%m-%d %H:%M")
    except Exception:
        return iso


def load_report(path):
    try:
        return json.loads(path.read_text())
    except Exception as e:
        print(f"!! Could not read {path}: {e}", file=sys.stderr)
        return None


def render_one(report, path):
    name = report.get("name", "?")
    summary = report.get("summary", {})
    overall = summary.get("overallPct", 0)
    total_time = summary.get("totalTime") or fmt_duration_ms(report.get("totalTimeMs", 0))
    started = fmt_dt(report.get("startedAt"))
    last = fmt_dt(report.get("lastSeenAt"))

    bar_len = 30
    filled = int(bar_len * overall / 100)
    bar = "#" * filled + "-" * (bar_len - filled)

    print()
    print("=" * 72)
    print(f" {name}   ({path.name})")
    print("-" * 72)
    print(f" Overall progress : [{bar}] {overall}%")
    print(f" Total time       : {total_time}")
    print(f" First session    : {started}")
    print(f" Last seen        : {last}")
    print(f" Modules passed   : {summary.get('modulesPassed', 0)}")
    print(f" Tests passed     : {summary.get('testsPassed', 0)}")
    skipped = summary.get("skipped") or report.get("skipped") or []
    if skipped:
        print(f" Skipped via test : {', '.join(skipped)}")
    print()

    modules = report.get("modules", {}) or {}
    if modules:
        print(" Modules:")
        print(f"   {'id':<32} {'status':<10} {'best':>6} {'attempts':>10}")
        for mid, st in modules.items():
            status = "passed" if st.get("passed") else ("locked" if not st.get("unlocked") else "started" if st.get("attempts") else "open")
            best = f"{int(round((st.get('bestScore') or 0)*100))}%"
            attempts = len(st.get("attempts") or [])
            print(f"   {mid:<32} {status:<10} {best:>6} {attempts:>10}")
        print()

    tests = report.get("tests", {}) or {}
    if tests:
        print(" Tests:")
        print(f"   {'id':<32} {'status':<10} {'best':>6} {'fastest':>10}")
        for tid, st in tests.items():
            status = "passed" if st.get("passed") else ("attempted" if st.get("attempts") else "-")
            best = f"{int(round((st.get('bestScore') or 0)*100))}%"
            fastest = fmt_duration_ms(st.get("fastestMs")) if st.get("fastestMs") else "-"
            print(f"   {tid:<32} {status:<10} {best:>6} {fastest:>10}")
        print()

    setup = report.get("setup", {}) or {}
    if setup:
        print(" Setup (honor system — checked items by module):")
        for mid, items in setup.items():
            checked_ids = [iid for iid, v in items.items() if isinstance(v, dict) and v.get("checked")]
            if checked_ids:
                print(f"   {mid:<32} {', '.join(checked_ids)}")
        print()

    sessions = report.get("sessions") or []
    if sessions:
        recent = sessions[-3:]
        print(f" Recent sessions ({len(sessions)} total — showing last {len(recent)}):")
        for s in recent:
            print(f"   {fmt_dt(s.get('startedAt'))} → {fmt_dt(s.get('endedAt'))}   ({fmt_duration_ms(s.get('ms', 0))})")
        print()


def render_summary_table(reports):
    print()
    print("ALL LEARNERS")
    print("=" * 72)
    header = f"{'name':<20} {'progress':<14} {'time':<10} {'mods':>5} {'tests':>6}"
    print(header)
    print("-" * 72)
    for path, rep in reports:
        if not rep:
            continue
        summary = rep.get("summary", {})
        overall = summary.get("overallPct", 0)
        bar_len = 10
        filled = int(bar_len * overall / 100)
        bar = "#" * filled + "-" * (bar_len - filled)
        print(
            f"{rep.get('name','?')[:20]:<20} "
            f"[{bar}] {overall:>3}% "
            f"{(summary.get('totalTime') or fmt_duration_ms(rep.get('totalTimeMs',0))):<10} "
            f"{summary.get('modulesPassed',0):>5} "
            f"{summary.get('testsPassed',0):>6}"
        )
    print()


def main():
    ap = argparse.ArgumentParser(description="View GenAI101 student progress reports.")
    ap.add_argument("paths", nargs="*", help="Files or folders to read. Defaults to this script's folder.")
    ap.add_argument("--json", action="store_true", help="Dump combined JSON instead of a pretty report.")
    args = ap.parse_args()

    paths = find_reports(args.paths)
    if not paths:
        print("No progress files found. Drop the exported .json files in this folder.", file=sys.stderr)
        print(f"  (Looked in: {HERE})", file=sys.stderr)
        sys.exit(0)

    loaded = [(p, load_report(p)) for p in paths]

    if args.json:
        out = [r for _, r in loaded if r]
        print(json.dumps(out, indent=2))
        return

    for path, rep in loaded:
        if rep:
            render_one(rep, path)

    if len([r for _, r in loaded if r]) > 1:
        render_summary_table(loaded)


if __name__ == "__main__":
    main()
