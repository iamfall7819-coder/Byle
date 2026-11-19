from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parent
SOURCE_DIR = ROOT / "code"
OUTPUT_DIR = ROOT / "docs"
LOGO_SOURCE = ROOT / "img" / "logo-pgri.png"


def build_site() -> None:
    html_source = SOURCE_DIR / "index.html"
    about_source = SOURCE_DIR / "about.html"
    profile_source = SOURCE_DIR / "profile.html"
    css_source = SOURCE_DIR / "style.css"
    js_source = SOURCE_DIR / "script.js"
    supabase_config_source = SOURCE_DIR / "supabase-config.js"

    for source in (
        html_source,
        about_source,
        profile_source,
        css_source,
        js_source,
        supabase_config_source,
        LOGO_SOURCE,
    ):
        if not source.is_file():
            raise FileNotFoundError(f"File sumber tidak ditemukan: {source}")

    html = html_source.read_text(encoding="utf-8")
    local_logo_path = "../img/logo-pgri.png"
    pages_logo_path = "img/logo-pgri.png"
    if local_logo_path not in html:
        raise ValueError(f"Referensi logo yang diharapkan tidak ditemukan: {local_logo_path}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_image_dir = OUTPUT_DIR / "img"
    output_image_dir.mkdir(parents=True, exist_ok=True)

    (OUTPUT_DIR / "index.html").write_text(
        html.replace(local_logo_path, pages_logo_path),
        encoding="utf-8",
    )
    shutil.copy2(about_source, OUTPUT_DIR / "about.html")
    shutil.copy2(profile_source, OUTPUT_DIR / "profile.html")
    shutil.copy2(css_source, OUTPUT_DIR / "style.css")
    shutil.copy2(js_source, OUTPUT_DIR / "script.js")
    shutil.copy2(supabase_config_source, OUTPUT_DIR / "supabase-config.js")
    shutil.copy2(LOGO_SOURCE, output_image_dir / LOGO_SOURCE.name)

    print(f"Situs siap di-deploy dari folder: {OUTPUT_DIR}")


if __name__ == "__main__":
    build_site()
