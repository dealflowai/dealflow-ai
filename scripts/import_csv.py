import csv, os, uuid, argparse
from supabase import create_client

# ── Supabase client ────────────────────────────────────────────
SUPABASE_URL = os.environ["SUPABASE_URL"]
SERVICE_KEY  = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
sb = create_client(SUPABASE_URL, SERVICE_KEY)

# ── Import logic ───────────────────────────────────────────────
def ingest(csv_path: str, owner_id: str) -> None:
    with open(csv_path, newline="") as f:
        rows = []
        for r in csv.DictReader(f):
            rows.append({
                "id": str(uuid.uuid4()),
                "owner_id": owner_id,
                "name": r["name"],
                "email": r.get("email") or None,
                "phone": r.get("phone") or None,
                "markets": [m.strip() for m in r.get("markets","").split("|") if m],
                "asset_types": [a.strip() for a in r.get("asset_types","").split("|") if a],
            })

        sb.table("buyers").upsert(rows).execute()
        print(f"✅ Imported {len(rows)} buyers")

# ── CLI wrapper ────────────────────────────────────────────────
if __name__ == "__main__":
    p = argparse.ArgumentParser(description="Import buyers from CSV")
    p.add_argument("csv", help="Path to buyers.csv")
    p.add_argument("--owner", required=True, help="Clerk user_id to own the rows")
    args = p.parse_args()
    ingest(args.csv, args.owner)
