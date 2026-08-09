import gradio as gr
import random

# ═══════════════════════════════════════════════════════════════
# MOCK DATA
# ═══════════════════════════════════════════════════════════════
HS_CODES_DB = [
    {"code":"8471.30","description":"Noutbuk kompyuterlar","duty_rate":0.0,"vat_rate":12.0,"excise_rate":0.0,"unit":"dona","category":"Elektronika","notes":"IT uskunalar uchun 0% boj imtiyozi","confidence":97},
    {"code":"8517.12","description":"Smartfonlar va mobil telefonlar","duty_rate":5.0,"vat_rate":12.0,"excise_rate":0.0,"unit":"dona","category":"Elektronika","notes":"1 ta shaxsiy foydalanish uchun imtiyoz","confidence":95},
    {"code":"8703.23","description":"Yengil avtomobil (1500-3000 sm³)","duty_rate":30.0,"vat_rate":12.0,"excise_rate":15.0,"unit":"dona","category":"Avtomobil","notes":"Aksiz va utilizatsiya yig'imi qo'llaniladi","confidence":98},
    {"code":"6203.42","description":"Erkaklar uchun paxta shimlar","duty_rate":30.0,"vat_rate":12.0,"excise_rate":0.0,"unit":"kg","category":"Kiyim","notes":"Tekstil — yuqori boj stavkasi","confidence":90},
    {"code":"0901.11","description":"Qovurilmagan kofe donlari","duty_rate":0.0,"vat_rate":0.0,"excise_rate":0.0,"unit":"kg","category":"Oziq-ovqat","notes":"Boj va QQSdan ozod","confidence":96},
    {"code":"3004.90","description":"Dori-darmonlar","duty_rate":0.0,"vat_rate":0.0,"excise_rate":0.0,"unit":"kg","category":"Farmatsevtika","notes":"To'liq ozod","confidence":96},
    {"code":"8528.72","description":"Televizorlar","duty_rate":5.0,"vat_rate":12.0,"excise_rate":0.0,"unit":"dona","category":"Elektronika","notes":"","confidence":92},
    {"code":"9403.20","description":"Metal mebel va stullar","duty_rate":20.0,"vat_rate":12.0,"excise_rate":0.0,"unit":"kg","category":"Mebel","notes":"","confidence":88},
    {"code":"6402.99","description":"Kauchuk va plastik poyabzallar","duty_rate":25.0,"vat_rate":12.0,"excise_rate":0.0,"unit":"pora","category":"Poyabzal","notes":"","confidence":89},
    {"code":"8414.51","description":"Shamollatish qurilmalari","duty_rate":10.0,"vat_rate":12.0,"excise_rate":0.0,"unit":"dona","category":"Elektronika","notes":"","confidence":85},
]

CHAT_RESPONSES = [
    "**O'zbekistonda bojxona to'lovlari** 3 komponentdan iborat:\n\n**1. Bojxona boji** — CIF ning 0–30%\n**2. QQS** — 12%\n**3. Aksiz** — muayyan tovarlar uchun\n\n*Misol:* 1000 USD noutbuk → Boj: 0%, QQS: 120 USD → **Jami: 120 USD**",
    "**HS kod** — xalqaro savdoda tovarlarni tasniflash uchun 6–10 raqamli kod.\n\nKod aniqlash uchun mahsulot **tavsifi, tarkibi va maqsadi** kerak.\n\n➡️ **HS Kod** tabidan qidiring!",
    "**CIF** = Tovar narxi + Yuk tashish + Sug'urta\n\n*Misol:*\n- Tovar: 5,000 USD\n- Yuk: 300 USD\n- Sug'urta: 50 USD\n- **CIF: 5,350 USD** ← shu asosida boj hisoblanadi",
    "**Avtomobil importi to'lovlari:**\n\n| To'lov | Miqdor |\n|--------|--------|\n| Bojxona boji | 30% |\n| QQS | 12% |\n| Aksiz | dvigatelga qarab |\n\n*15,000 USD avto* uchun taxminan **8,000–10,000 USD** to'lov.",
    "**Deklaratsiya uchun hujjatlar:**\n\n1. Tijorat fakturasi (Invoice)\n2. Qadoqlash ro'yxati (Packing List)\n3. Yuk xati (B/L)\n4. Kelib chiqqanlik sertifikati\n5. Sug'urta polisi",
]

HISTORY_ITEMS = [
    {"icon":"🧮","title":"iPhone 15 Pro — 1,200 USD","subtitle":"Jami to'lov: 145.44 USD","date":"Bugun, 14:32"},
    {"icon":"📦","title":"HS Kod: 8517.12","subtitle":"Smartfonlar","date":"Bugun, 11:15"},
    {"icon":"📋","title":"Deklaratsiya #DEC-001","subtitle":"Tayyorlandi","date":"Kecha"},
    {"icon":"📄","title":"Invoice.pdf","subtitle":"88/100 ball","date":"Kecha"},
    {"icon":"🤖","title":"AI Suhbat","subtitle":"Avtomobil importi","date":"3 kun oldin"},
]

CURRENCIES = ["USD","EUR","CNY","KRW","TRY","AED","RUB","GBP"]
EXCHANGE_RATES = {"USD":1.0,"EUR":1.08,"CNY":0.138,"KRW":0.00074,"TRY":0.033,"AED":0.272,"RUB":0.011,"GBP":1.27}
COUNTRIES = ["Xitoy","Rossiya","Koreya","Turkiya","BAA","Germaniya","AQSH","Italiya","Boshqa"]
UZS_RATE = 12750
DUTY_PRESETS = {"Elektronika (IT)":0.0,"Smartfon":5.0,"Kiyim":30.0,"Avtomobil":30.0,"Oziq-ovqat":10.0,"Mebel":20.0,"Dori-darmon":0.0,"Boshqa":15.0}

_resp_idx = 0

def get_ai_response(message, history):
    global _resp_idx
    if not message or not message.strip():
        return "", history or []
    keywords = {"noutbuk|laptop|kompyuter":0,"hs kod|tasnif":1,"cif|formula":2,"avtomobil|mashina":3,"deklaratsiya|hujjat":4}
    response = None
    for pattern, idx in keywords.items():
        if any(k in message.lower() for k in pattern.split("|")):
            response = CHAT_RESPONSES[idx]; break
    if response is None:
        response = CHAT_RESPONSES[_resp_idx % len(CHAT_RESPONSES)]; _resp_idx += 1
    history = list(history or [])
    history.append((message, response))
    return "", history

def search_hs(query):
    if not query or not query.strip():
        html = '<div style="color:#22C55E;font-weight:700;font-size:14px;margin-bottom:14px;letter-spacing:0.5px">⭐ MASHHUR HS KODLAR</div>'
        for item in HS_CODES_DB[:6]:
            html += f'''<div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #31513B;border-radius:12px;padding:14px 16px;margin-bottom:10px;display:flex;gap:12px;align-items:center;transition:all 0.2s">
                <span style="background:linear-gradient(135deg,#22C55E,#15803D);color:#080A08;padding:4px 12px;border-radius:8px;font-size:13px;font-weight:800;white-space:nowrap;letter-spacing:0.3px">{item["code"]}</span>
                <span style="color:#F4F7F4;font-size:13px;font-weight:600;flex:1">{item["description"]}</span>
                <span style="background:rgba(48,74,55,0.6);color:#A7C7AD;border:1px solid #31513B;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:600;white-space:nowrap">{item["category"]}</span>
            </div>'''
        return html
    q = query.lower().strip()
    results = [i for i in HS_CODES_DB if q in i["description"].lower() or q in i["code"] or q in i["category"].lower()]
    if not results:
        return f'<div style="text-align:center;padding:48px 20px"><div style="font-size:48px;margin-bottom:12px">🔍</div><div style="color:#F4F7F4;font-size:16px;font-weight:700;margin-bottom:8px">Natija topilmadi</div><div style="color:#78977E;font-size:13px">«{query}» uchun HS kod yo\'q</div></div>'
    html = f'<div style="color:#A7C7AD;font-size:12px;font-weight:600;margin-bottom:14px;letter-spacing:0.5px">🔍 {len(results)} TA NATIJA TOPILDI</div>'
    for item in results:
        dc = "#22C55E" if item["duty_rate"]==0 else "#22C55E"
        vc = "#22C55E" if item["vat_rate"]==0 else "#DCEFE0"
        dbg = "rgba(34,197,94,0.12)" if item["duty_rate"]==0 else "rgba(34,197,94,0.12)"
        vbg = "rgba(34,197,94,0.12)" if item["vat_rate"]==0 else "rgba(220,239,224,0.12)"
        dbc = "rgba(34,197,94,0.4)" if item["duty_rate"]==0 else "rgba(34,197,94,0.4)"
        vbc = "rgba(34,197,94,0.4)" if item["vat_rate"]==0 else "rgba(220,239,224,0.4)"
        exc = f'<span style="background:rgba(255,255,255,0.12);color:#FFFFFF;border:1px solid rgba(255,255,255,0.4);padding:4px 10px;border-radius:7px;font-size:11px;font-weight:700">Aksiz: {item["excise_rate"]}%</span>' if item["excise_rate"]>0 else ""
        notes = f'<div style="margin-top:10px;padding:8px 12px;background:rgba(34,197,94,0.06);border-left:3px solid #22C55E;border-radius:0 6px 6px 0;color:#B8CCBC;font-size:12px;line-height:1.5">ℹ️ {item["notes"]}</div>' if item["notes"] else ""
        conf_c = "#22C55E" if item["confidence"]>=90 else "#22C55E"
        html += f'''<div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #31513B;border-radius:14px;padding:18px;margin-bottom:12px">
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
                <span style="background:linear-gradient(135deg,#22C55E,#15803D);color:#080A08;padding:4px 14px;border-radius:8px;font-size:13px;font-weight:800;letter-spacing:0.5px">{item["code"]}</span>
                <span style="background:rgba(48,74,55,0.5);color:#A7C7AD;border:1px solid #31513B;padding:4px 12px;border-radius:7px;font-size:11px;font-weight:600">{item["category"]}</span>
                <span style="color:{conf_c};font-size:12px;font-weight:700;margin-left:auto">✓ {item["confidence"]}% aniq</span>
            </div>
            <div style="color:#F4F7F4;font-size:15px;font-weight:700;margin-bottom:12px;line-height:1.4">{item["description"]}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                <span style="background:{dbg};color:{dc};border:1px solid {dbc};padding:5px 12px;border-radius:8px;font-size:12px;font-weight:700">Boj: {item["duty_rate"]}%</span>
                <span style="background:{vbg};color:{vc};border:1px solid {vbc};padding:5px 12px;border-radius:8px;font-size:12px;font-weight:700">QQS: {item["vat_rate"]}%</span>
                {exc}
                <span style="color:#78977E;font-size:12px;margin-left:auto;font-weight:600">📏 {item["unit"]}</span>
            </div>
            {notes}
        </div>'''
    return html

def calculate(product, value, currency, country, freight, insurance, duty_rate, excise_rate):
    if not product: product = "Tovar"
    value_usd = value * EXCHANGE_RATES.get(currency, 1.0)
    cif = value_usd + freight + insurance
    duty = cif * (duty_rate / 100)
    excise = cif * (excise_rate / 100)
    vat = (cif + duty + excise) * 0.12
    proc = cif * 0.002
    total = duty + excise + vat + proc
    uzs_fmt = f"{int(total * UZS_RATE):,}".replace(",", " ")
    eff_rate = (total / cif * 100) if cif > 0 else 0
    return f"""## ✅ {product} — Hisob-kitob Natijasi

| Ko'rsatkich | USD | Foiz |
|---|---|---|
| **Tovar qiymati** | ${value_usd:,.2f} | — |
| **Yuk tashish** | ${freight:,.2f} | — |
| **Sug'urta** | ${insurance:,.2f} | — |
| **CIF (baza)** | **${cif:,.2f}** | 100% |
| Bojxona boji ({duty_rate}%) | ${duty:,.2f} | {duty/cif*100:.1f}% |
| QQS (12%) | ${vat:,.2f} | {vat/cif*100:.1f}% |
| Aksiz ({excise_rate}%) | ${excise:,.2f} | {excise/cif*100:.1f}% |
| Yig'im (0.2%) | ${proc:,.2f} | 0.2% |

---
## 💰 JAMI TO'LOV: **${total:,.2f}**
### 🇺🇿 **{uzs_fmt} so'm**
### 📊 Samarali boj stavkasi: **{eff_rate:.1f}%**

> 📍 Mamlakat: **{country}** · Valyuta: {currency} · Kurs: 1 USD = {UZS_RATE:,} so'm"""

def analyze_doc(file_obj):
    if file_obj is None:
        return '<div style="text-align:center;padding:40px;color:#78977E">📎 Hujjatni yuklang</div>'
    filename = getattr(file_obj, "name", "document.pdf").split("/")[-1]
    score = random.randint(72, 94)
    sc = "#22C55E" if score>=85 else ("#22C55E" if score>=60 else "#FFFFFF")
    sbg = "rgba(34,197,94,0.1)" if score>=85 else ("rgba(34,197,94,0.1)" if score>=60 else "rgba(255,255,255,0.1)")
    valid_fields = ["Eksportchi nomi","Importchi TIN","Tovar qiymati","Incoterms","Imzo va muhur"]
    valid_chips = "".join(f'<span style="background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#4ADE80;padding:5px 12px;border-radius:8px;font-size:12px;font-weight:600">✅ {v}</span>' for v in valid_fields)
    issues = [("❌","HS Kod","8 raqamli to'liq kod kiritilishi shart","rgba(255,255,255,0.08)","rgba(255,255,255,0.35)","#FFFFFF"),("⚠️","Sana formati","YYYY-MM-DD formatida bo'lishi kerak","rgba(34,197,94,0.08)","rgba(34,197,94,0.35)","#4ADE80")]
    issues_html = "".join(f'<div style="background:{bg};border:1px solid {bc};border-radius:10px;padding:10px 14px;margin-bottom:8px;display:flex;gap:10px;align-items:center"><span style="font-size:16px">{ic}</span><div><span style="color:{tc};font-weight:700;font-size:13px">{f}:</span> <span style="color:#B8CCBC;font-size:12px">{d}</span></div></div>' for ic,f,d,bg,bc,tc in issues)
    recs = ["HS kodni 8 raqam bilan to'liq ko'rsating","Sanani YYYY-MM-DD formatiga o'tkazing","Har bir mahsulot uchun alohida qator ishlating","Net va gross og'irlikni kg da ko'rsating"]
    recs_html = "".join(f'<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid rgba(48,74,55,0.4)"><span style="width:22px;height:22px;min-width:22px;background:linear-gradient(135deg,#22C55E,#15803D);color:#080A08;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800">{i+1}</span><span style="color:#CFE0D2;font-size:13px;line-height:1.4">{r}</span></div>' for i,r in enumerate(recs))
    return f'''<div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #31513B;border-radius:16px;padding:22px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
            <div><div style="color:#F4F7F4;font-size:16px;font-weight:700">📄 {filename}</div><div style="color:#A7C7AD;font-size:12px;margin-top:3px">Tijorat fakturasi · Tahlil qilindi</div></div>
            <div style="width:68px;height:68px;border-radius:50%;border:3px solid {sc};background:{sbg};display:flex;flex-direction:column;align-items:center;justify-content:center">
                <span style="color:{sc};font-size:22px;font-weight:800;line-height:1">{score}</span>
                <span style="color:#78977E;font-size:10px;font-weight:600">/100</span>
            </div>
        </div>
        <div style="height:8px;background:rgba(48,74,55,0.4);border-radius:999px;margin-bottom:20px;overflow:hidden">
            <div style="width:{score}%;height:100%;background:linear-gradient(90deg,{sc},{sc}aa);border-radius:999px;transition:width 0.5s"></div>
        </div>
        <div style="margin-bottom:18px">
            <div style="color:#F4F7F4;font-weight:700;font-size:14px;margin-bottom:10px;display:flex;align-items:center;gap:6px"><span style="color:#FFFFFF">⚠</span> Kamchiliklar</div>
            {issues_html}
        </div>
        <div style="margin-bottom:18px">
            <div style="color:#F4F7F4;font-weight:700;font-size:14px;margin-bottom:10px;display:flex;align-items:center;gap:6px"><span style="color:#4ADE80">✓</span> To'g'ri maydonlar</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px">{valid_chips}</div>
        </div>
        <div>
            <div style="color:#F4F7F4;font-weight:700;font-size:14px;margin-bottom:10px;display:flex;align-items:center;gap:6px"><span style="color:#22C55E">💡</span> Tavsiyalar</div>
            {recs_html}
        </div>
    </div>'''

def gen_review(pname, hs, qty, unit, inv_no, inv_val, cur, inc, country, trans, exp, imp, tin):
    rows = [("Mahsulot",pname or "—"),("HS Kod",hs or "—"),(f"Miqdor",f"{qty} {unit}"),("Faktura №",inv_no or "—"),("Qiymat",f"{inv_val:,.0f} {cur}"),("Incoterms",inc),("Eksportchi",exp or "—"),("Importchi",imp or "—"),("STIR",tin or "—"),("Mamlakat",country),("Tashish usuli",trans)]
    rows_html = "".join(f'<tr><td style="color:#A7C7AD;padding:8px 12px;border-bottom:1px solid rgba(48,74,55,0.4);font-size:13px;font-weight:600;white-space:nowrap">{k}</td><td style="color:#F4F7F4;padding:8px 12px;border-bottom:1px solid rgba(48,74,55,0.4);font-size:13px">{v}</td></tr>' for k,v in rows)
    return f'''<div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #31513B;border-radius:14px;overflow:hidden">
        <div style="padding:14px 18px;background:rgba(34,197,94,0.08);border-bottom:1px solid #31513B">
            <span style="color:#22C55E;font-weight:700;font-size:14px">📋 Ko'rib chiqish</span>
        </div>
        <table style="width:100%;border-collapse:collapse">{rows_html}</table>
        <div style="padding:12px 16px;background:rgba(34,197,94,0.06);border-top:1px solid rgba(34,197,94,0.2)">
            <span style="color:#4ADE80;font-size:12px;font-weight:600">✅ Ma'lumotlar to'ldirildi — PDF yaratishga tayyorsiz</span>
        </div>
    </div>'''

def gen_pdf(pname, inv_val, cur, country):
    return f"""## ✅ Deklaratsiya Muvaffaqiyatli Yaratildi!

**Fayl:** `declaration_{(pname or 'tovar').replace(' ','_').lower()}.pdf`

| Maydon | Qiymat |
|--------|--------|
| Mahsulot | {pname or 'Tovar'} |
| Qiymat | {inv_val:,.0f} {cur} |
| Mamlakat | {country} |
| Format | A4 PDF · O'zbekiston CBU standarti |
| Holat | ✅ Tayyorlandi |

> 💡 **Demo rejim** — haqiqiy PDF eksport Phase 2 da qo'shiladi"""

# ═══════════════════════════════════════════════════════════════
# CSS — TO'LIQ QAYTA YOZILGAN
# ═══════════════════════════════════════════════════════════════
CSS = """
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ── Base ── */
*, *::before, *::after { box-sizing: border-box; }

body, .gradio-container {
    background: #050505 !important;
    color: #F4F7F4 !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}

/* ── Tabs ── */
.gradio-container .tab-nav {
    background: #0A0F0B !important;
    border-bottom: 1px solid #2C3A30 !important;
    padding: 8px 16px 0 !important;
    display: flex !important;
    gap: 4px !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
}
.gradio-container .tab-nav::-webkit-scrollbar { height: 0; }

.gradio-container .tab-nav button {
    background: transparent !important;
    color: #FFFFFF !important;
    border: none !important;
    border-radius: 8px 8px 0 0 !important;
    padding: 10px 16px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    white-space: nowrap !important;
    transition: all 0.2s !important;
    cursor: pointer !important;
    opacity: 1 !important;
    min-width: fit-content !important;
}
.gradio-container .tab-nav button:hover {
    background: rgba(34,197,94,0.08) !important;
    color: #F4F7F4 !important;
}
.gradio-container .tab-nav button.selected {
    background: rgba(34,197,94,0.1) !important;
    color: #22C55E !important;
    font-weight: 700 !important;
    border-bottom: 2px solid #22C55E !important;
}

/* ── Tab content ── */
.gradio-container .tabitem {
    background: #050505 !important;
    border: none !important;
    padding: 20px 16px !important;
}

/* ── Inputs ── */
.gradio-container input,
.gradio-container textarea {
    background: #101511 !important;
    border: 1.5px solid #2C3A30 !important;
    color: #F4F7F4 !important;
    border-radius: 10px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    padding: 10px 14px !important;
    transition: border-color 0.2s !important;
}
.gradio-container input:focus,
.gradio-container textarea:focus {
    border-color: #22C55E !important;
    outline: none !important;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.12) !important;
}
.gradio-container input::placeholder,
.gradio-container textarea::placeholder {
    color: #5D7862 !important;
}

/* ── Select / Dropdown ── */
.gradio-container select {
    background: #101511 !important;
    border: 1.5px solid #2C3A30 !important;
    color: #F4F7F4 !important;
    border-radius: 10px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}
.gradio-container select option {
    background: #101511 !important;
    color: #F4F7F4 !important;
}

/* ── Buttons ── */
.gradio-container button.primary {
    background: linear-gradient(135deg, #22C55E, #15803D) !important;
    color: #080A08 !important;
    font-weight: 700 !important;
    border: none !important;
    border-radius: 10px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    padding: 10px 20px !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
    box-shadow: 0 4px 12px rgba(21,128,61,0.3) !important;
}
.gradio-container button.primary:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 20px rgba(21,128,61,0.4) !important;
}
.gradio-container button.secondary {
    background: rgba(48,74,55,0.3) !important;
    border: 1.5px solid #2C3A30 !important;
    color: #A7C7AD !important;
    border-radius: 10px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 13px !important;
    transition: all 0.2s !important;
    cursor: pointer !important;
}
.gradio-container button.secondary:hover {
    background: rgba(34,197,94,0.08) !important;
    border-color: rgba(34,197,94,0.4) !important;
    color: #22C55E !important;
}

/* ── Blocks & Cards ── */
.gradio-container .block {
    background: transparent !important;
    border: none !important;
}
.gradio-container .form {
    background: #101511 !important;
    border: 1px solid #2C3A30 !important;
    border-radius: 14px !important;
    padding: 16px !important;
}

/* ── Chatbot ── */
.gradio-container .chatbot {
    background: #0A0F0B !important;
    border: 1px solid #2C3A30 !important;
    border-radius: 14px !important;
}
.gradio-container .chatbot .message.user > div {
    background: linear-gradient(135deg, #22C55E, #15803D) !important;
    color: #080A08 !important;
    border-radius: 16px 16px 4px 16px !important;
    font-weight: 600 !important;
}
.gradio-container .chatbot .message.bot > div {
    background: linear-gradient(135deg, #121A14, #0A0E0B) !important;
    border: 1px solid #2C3A30 !important;
    color: #F4F7F4 !important;
    border-radius: 16px 16px 16px 4px !important;
}

/* ── Labels ── */
.gradio-container label,
.gradio-container .label-wrap span,
.gradio-container .label-wrap,
.gradio-container span.svelte-1gfkn6j {
    color: #B8CCBC !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 13px !important;
    font-weight: 600 !important;
}

/* ── Markdown / Prose ── */
.gradio-container .prose { color: #F4F7F4 !important; }
.gradio-container .prose h1,
.gradio-container .prose h2,
.gradio-container .prose h3 {
    color: #22C55E !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}
.gradio-container .prose p,
.gradio-container .prose li { color: #CFE0D2 !important; }
.gradio-container .prose strong { color: #F4F7F4 !important; }
.gradio-container .prose table {
    border-collapse: collapse;
    width: 100%;
    background: #101511 !important;
    border-radius: 10px !important;
    overflow: hidden !important;
}
.gradio-container .prose table th {
    background: #12301D !important;
    color: #22C55E !important;
    padding: 10px 16px;
    font-weight: 700;
    font-size: 13px;
}
.gradio-container .prose table td {
    border-top: 1px solid #2C3A30 !important;
    color: #F4F7F4 !important;
    padding: 10px 16px;
    font-size: 13px;
}

/* ── Slider ── */
.gradio-container input[type=range] {
    accent-color: #22C55E !important;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
}

/* ── Number inputs ── */
.gradio-container input[type=number] {
    background: #101511 !important;
    border: 1.5px solid #2C3A30 !important;
    color: #F4F7F4 !important;
}

/* ── Accordion ── */
.gradio-container .accordion-header,
.gradio-container details > summary {
    background: #101511 !important;
    border: 1px solid #2C3A30 !important;
    color: #F4F7F4 !important;
    border-radius: 10px !important;
    padding: 12px 16px !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    cursor: pointer !important;
}

/* ── File upload ── */
.gradio-container .file-upload {
    background: #101511 !important;
    border: 2px dashed #2C3A30 !important;
    border-radius: 14px !important;
    color: #A7C7AD !important;
}

/* ── Radio ── */
.gradio-container input[type=radio]:checked {
    accent-color: #22C55E !important;
}
.gradio-container .gradio-radio label {
    color: #F4F7F4 !important;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: #0A0F0B; }
::-webkit-scrollbar-thumb { background: #2C3A30; border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: #22C55E; }

/* ── HTML component ── */
.gradio-container .gr-html * {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}
"""

# ═══════════════════════════════════════════════════════════════
# APP
# ═══════════════════════════════════════════════════════════════
with gr.Blocks(css=CSS, title="CustomsAI Uzbekistan") as demo:

    # ── HEADER ──────────────────────────────────────────────────
    gr.HTML("""
    <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px;
         background:linear-gradient(135deg,#0C1710 0%,#080C09 100%);
         border-radius:16px;margin-bottom:6px;
         border:1px solid #2C3A30;
         box-shadow:0 4px 24px rgba(0,0,0,0.3)">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:46px;height:46px;
             background:linear-gradient(135deg,#22C55E,#15803D);
             border-radius:12px;display:flex;align-items:center;justify-content:center;
             font-size:22px;box-shadow:0 4px 16px rgba(21,128,61,0.4);flex-shrink:0">⚖️</div>
        <div>
          <div style="font-size:21px;font-weight:800;color:#FFFFFF;letter-spacing:-0.3px;line-height:1">CustomsAI</div>
          <div style="font-size:12px;color:#A7C7AD;margin-top:3px;font-weight:500">O'zbekiston Bojxona Yordamchisi</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end">
        <span style="background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);
              color:#22C55E;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:700">🌐 UZ · RU · EN</span>
        <span style="background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);
              color:#4ADE80;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:700">● AI Online</span>
      </div>
    </div>
    """)

    with gr.Tabs():

        # ── HOME ────────────────────────────────────────────────
        with gr.Tab("🏠 Bosh sahifa"):
            gr.HTML("""
            <div style="background:linear-gradient(135deg,#112018,#080C09);border-radius:16px;padding:26px;margin-bottom:16px;border:1px solid #356145;box-shadow:0 8px 32px rgba(0,0,0,0.3)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px">
                <div style="flex:1">
                  <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);
                       padding:4px 12px;border-radius:999px;font-size:11px;color:rgba(255,255,255,0.85);
                       font-weight:600;margin-bottom:14px;border:1px solid rgba(255,255,255,0.15)">
                    <span style="width:7px;height:7px;background:#4ADE80;border-radius:50%;display:inline-block"></span>
                    AI Online · Mock API
                  </div>
                  <div style="font-size:28px;font-weight:800;color:#FFFFFF;line-height:1.2;margin-bottom:10px">
                    CustomsAI<br><span style="color:#22C55E">Uzbekistan 🇺🇿</span>
                  </div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.7">
                    Bojxona deklaratsiyasi, HS kod,<br>boj hisoblash — barchasi bir joyda
                  </div>
                </div>
                <div style="font-size:56px;flex-shrink:0;filter:drop-shadow(0 4px 12px rgba(34,197,94,0.3))">⚖️</div>
              </div>
              <div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">
                <span style="background:rgba(34,197,94,0.18);border:1px solid rgba(34,197,94,0.4);color:#22C55E;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700">🤖 AI Yordamchi</span>
                <span style="background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.35);color:#4ADE80;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700">✅ 9 Modul</span>
                <span style="background:rgba(220,239,224,0.15);border:1px solid rgba(220,239,224,0.35);color:#DCEFE0;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700">🌐 UZ·RU·EN</span>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;margin-bottom:16px">
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:12px;padding:16px;text-align:center">
                <div style="font-size:22px;font-weight:800;color:#22C55E;margin-bottom:4px">1,240+</div>
                <div style="font-size:11px;color:#A7C7AD;font-weight:600">HS Kod</div>
              </div>
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:12px;padding:16px;text-align:center">
                <div style="font-size:22px;font-weight:800;color:#22C55E;margin-bottom:4px">12%</div>
                <div style="font-size:11px;color:#A7C7AD;font-weight:600">QQS stavka</div>
              </div>
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:12px;padding:16px;text-align:center">
                <div style="font-size:22px;font-weight:800;color:#4ADE80;margin-bottom:4px">98%</div>
                <div style="font-size:11px;color:#A7C7AD;font-weight:600">Aniqlik</div>
              </div>
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:12px;padding:16px;text-align:center">
                <div style="font-size:22px;font-weight:800;color:#4ADE80;margin-bottom:4px">80%</div>
                <div style="font-size:11px;color:#A7C7AD;font-weight:600">Vaqt tejash</div>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:14px;padding:18px;transition:all 0.2s">
                <div style="font-size:28px;margin-bottom:10px">🤖</div>
                <div style="color:#FFFFFF;font-size:14px;font-weight:700;margin-bottom:4px">AI Yordamchi</div>
                <div style="color:#A7C7AD;font-size:12px;line-height:1.5">Bojxona savollari va maslahat</div>
              </div>
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:14px;padding:18px">
                <div style="font-size:28px;margin-bottom:10px">📦</div>
                <div style="color:#FFFFFF;font-size:14px;font-weight:700;margin-bottom:4px">HS Kod Qidirish</div>
                <div style="color:#A7C7AD;font-size:12px;line-height:1.5">1,240+ kod bazasi</div>
              </div>
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:14px;padding:18px">
                <div style="font-size:28px;margin-bottom:10px">🧮</div>
                <div style="color:#FFFFFF;font-size:14px;font-weight:700;margin-bottom:4px">Kalkulyator</div>
                <div style="color:#A7C7AD;font-size:12px;line-height:1.5">CIF · Boj · QQS hisoblash</div>
              </div>
              <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;border-radius:14px;padding:18px">
                <div style="font-size:28px;margin-bottom:10px">📋</div>
                <div style="color:#FFFFFF;font-size:14px;font-weight:700;margin-bottom:4px">Deklaratsiya</div>
                <div style="color:#A7C7AD;font-size:12px;line-height:1.5">6 qadamlik wizard</div>
              </div>
            </div>

            <div style="background:linear-gradient(135deg,#166534,#15803D,#22C55E);border-radius:14px;padding:20px;box-shadow:0 4px 20px rgba(21,128,61,0.35)">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
                <div>
                  <div style="font-size:16px;font-weight:800;color:#080A08;margin-bottom:4px">💎 Premium ga o'ting</div>
                  <div style="font-size:12px;color:rgba(8,10,8,0.65);font-weight:500">Cheksiz AI · OCR · Priority support</div>
                </div>
                <div style="background:#080A08;color:#22C55E;padding:8px 18px;border-radius:999px;font-size:13px;font-weight:800;white-space:nowrap;flex-shrink:0">99,000 so'm/oy</div>
              </div>
            </div>
            """)

        # ── AI CHAT ─────────────────────────────────────────────
        with gr.Tab("🤖 AI Chat"):
            gr.HTML("""
            <div style="display:flex;align-items:center;gap:14px;padding:18px 20px;
                 background:linear-gradient(135deg,#112018,#080C09);
                 border-radius:14px;margin-bottom:16px;border:1px solid #356145">
              <div style="width:48px;height:48px;border-radius:50%;
                   background:linear-gradient(135deg,#356145,#121A14);
                   border:2px solid #4ADE80;
                   display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🤖</div>
              <div>
                <div style="font-size:17px;font-weight:700;color:#FFFFFF;margin-bottom:3px">AI Bojxona Yordamchisi</div>
                <div style="font-size:12px;color:#4ADE80;font-weight:600">● Online · Savol bering</div>
              </div>
            </div>
            """)
            chatbot = gr.Chatbot(
                value=[[None, "Salom! Men **CustomsAI** yordamchisiman 👋\n\nBojxona, HS kod, boj to'lovlari haqida savol bering.\n\n*Quyidagi tez savollardan birini bosing yoki o'z savolingizni yozing.*"]],
                height=420, show_label=False)
            with gr.Row():
                msg = gr.Textbox(placeholder="💬 Savolingizni yozing...", show_label=False, scale=5, container=False)
                send_btn = gr.Button("➤ Yuborish", variant="primary", scale=1, min_width=100)

            gr.HTML('<div style="font-size:12px;color:#A7C7AD;margin:12px 0 8px;font-weight:600">💡 Tez savollar:</div>')
            with gr.Row():
                for q in ["HS kod nima?", "CIF qanday hisoblanadi?", "Avtomobil importi"]:
                    gr.Button(q, variant="secondary", size="sm").click(
                        fn=lambda x=q: get_ai_response(x, []), outputs=[msg, chatbot])
            with gr.Row():
                for q in ["Noutbuk boji?", "QQS nima?", "Deklaratsiya hujjatlar"]:
                    gr.Button(q, variant="secondary", size="sm").click(
                        fn=lambda x=q: get_ai_response(x, []), outputs=[msg, chatbot])
            gr.Button("🗑️ Suhbatni tozalash", variant="secondary", size="sm").click(
                lambda: ([], ""), outputs=[chatbot, msg])
            msg.submit(get_ai_response, [msg, chatbot], [msg, chatbot])
            send_btn.click(get_ai_response, [msg, chatbot], [msg, chatbot])

        # ── HS KOD ──────────────────────────────────────────────
        with gr.Tab("📦 HS Kod"):
            gr.HTML("""
            <div style="display:flex;align-items:center;gap:14px;padding:18px 20px;
                 background:linear-gradient(135deg,#112018,#080C09);
                 border-radius:14px;margin-bottom:16px;border:1px solid #356145">
              <span style="font-size:30px;flex-shrink:0">📦</span>
              <div>
                <div style="font-size:17px;font-weight:700;color:#FFFFFF;margin-bottom:3px">HS Kod Qidirish</div>
                <div style="font-size:12px;color:#A7C7AD;font-weight:500">Boj, QQS, aksiz stavkalarini aniqlang</div>
              </div>
            </div>
            """)
            with gr.Row():
                hs_input = gr.Textbox(
                    placeholder="🔍 Mahsulot nomini kiriting: noutbuk, telefon, avtomobil...",
                    show_label=False, scale=5, container=False)
                gr.Button("🔍 Qidirish", variant="primary", scale=1, min_width=120).click(
                    search_hs, hs_input, gr.HTML())
            hs_results = gr.HTML(value=search_hs(""))
            hs_input.submit(search_hs, hs_input, hs_results)

        # ── CALCULATOR ──────────────────────────────────────────
        with gr.Tab("🧮 Kalkulyator"):
            gr.HTML("""
            <div style="display:flex;align-items:center;gap:14px;padding:18px 20px;
                 background:linear-gradient(135deg,#112018,#080C09);
                 border-radius:14px;margin-bottom:16px;border:1px solid #356145">
              <span style="font-size:30px;flex-shrink:0">🧮</span>
              <div>
                <div style="font-size:17px;font-weight:700;color:#FFFFFF;margin-bottom:3px">Bojxona Kalkulyatori</div>
                <div style="font-size:12px;color:#A7C7AD;font-weight:500">CIF · Boj · QQS · Aksiz · Jami to'lov</div>
              </div>
            </div>
            """)
            with gr.Row():
                with gr.Column(scale=1):
                    c_prod  = gr.Textbox(label="Mahsulot nomi", placeholder="iPhone 15 Pro")
                    c_cat   = gr.Dropdown(label="Kategoriya", choices=list(DUTY_PRESETS.keys()), value="Boshqa")
                    with gr.Row():
                        c_val  = gr.Number(label="Narx", value=1000)
                        c_cur  = gr.Dropdown(label="Valyuta", choices=CURRENCIES, value="USD")
                    c_cntry = gr.Dropdown(label="Kelib chiqqan mamlakat", choices=COUNTRIES, value="Xitoy")
                    with gr.Row():
                        c_fr  = gr.Number(label="Yuk tashish (USD)", value=200)
                        c_ins = gr.Number(label="Sug'urta (USD)", value=30)
                    c_duty = gr.Slider(label="Boj stavkasi (%)", minimum=0, maximum=50, step=0.5, value=5)
                    c_exc  = gr.Slider(label="Aksiz stavkasi (%)", minimum=0, maximum=50, step=0.5, value=0)
                    gr.Button("🧮 Hisoblash", variant="primary", size="lg").click(
                        calculate, [c_prod,c_val,c_cur,c_cntry,c_fr,c_ins,c_duty,c_exc], gr.Markdown())
                with gr.Column(scale=1):
                    c_res = gr.Markdown("""## 📊 Natija

Ma'lumot kiriting va **Hisoblash** tugmasini bosing.

**Hisoblash formulasi:**
```
CIF = Narx + Yuk tashish + Sug'urta
Boj = CIF × stavka%
QQS = (CIF + Boj + Aksiz) × 12%
Yig'im = CIF × 0.2%
─────────────────────
Jami = Boj + Aksiz + QQS + Yig'im
```

> 💡 1 USD ≈ 12,750 so'm""")
            c_cat.change(lambda x: DUTY_PRESETS.get(x, 15.0), c_cat, c_duty)
            gr.Button("🧮 Hisoblash", variant="primary").click(
                calculate, [c_prod,c_val,c_cur,c_cntry,c_fr,c_ins,c_duty,c_exc], c_res)

        # ── DOCUMENTS ───────────────────────────────────────────
        with gr.Tab("📄 Hujjat"):
            gr.HTML("""
            <div style="display:flex;align-items:center;gap:14px;padding:18px 20px;
                 background:linear-gradient(135deg,#112018,#080C09);
                 border-radius:14px;margin-bottom:16px;border:1px solid #356145">
              <span style="font-size:30px;flex-shrink:0">📄</span>
              <div>
                <div style="font-size:17px;font-weight:700;color:#FFFFFF;margin-bottom:3px">Hujjat Tahlilchisi</div>
                <div style="font-size:12px;color:#A7C7AD;font-weight:500">PDF · JPG · PNG · DOCX formatlar</div>
              </div>
            </div>
            """)
            doc_file = gr.File(label="📎 Hujjatni yuklang", file_types=[".pdf",".jpg",".png",".docx"])
            doc_res  = gr.HTML('<div style="text-align:center;padding:32px;color:#5D7862;font-size:14px">📎 Hujjatni yuklang va <b style=\'color:#A7C7AD\'>Tahlil qilish</b> tugmasini bosing</div>')
            gr.Button("🔍 Tahlil qilish", variant="primary", size="lg").click(analyze_doc, doc_file, doc_res)
            gr.HTML("""
            <div style="margin-top:14px;padding:14px 16px;background:rgba(34,197,94,0.06);
                 border:1px solid rgba(34,197,94,0.2);border-radius:12px">
              <div style="font-size:13px;color:#22C55E;font-weight:700;margin-bottom:4px">🤖 Demo rejim</div>
              <div style="font-size:12px;color:#A7C7AD;line-height:1.5">
                Mock AI tahlil — skor va kamchiliklar ko'rsatiladi.<br>
                Haqiqiy OCR va AI tahlil Phase 2 da qo'shiladi.
              </div>
            </div>""")

        # ── DECLARATION ─────────────────────────────────────────
        with gr.Tab("📋 Deklaratsiya"):
            gr.HTML("""
            <div style="display:flex;align-items:center;gap:14px;padding:18px 20px;
                 background:linear-gradient(135deg,#112018,#080C09);
                 border-radius:14px;margin-bottom:16px;border:1px solid #356145">
              <span style="font-size:30px;flex-shrink:0">📋</span>
              <div>
                <div style="font-size:17px;font-weight:700;color:#FFFFFF;margin-bottom:3px">Deklaratsiya Tuzish</div>
                <div style="font-size:12px;color:#A7C7AD;font-weight:500">5 qadamlik wizard · PDF eksport</div>
              </div>
            </div>
            """)
            with gr.Accordion("📦 1-qadam: Tovar ma'lumotlari", open=True):
                with gr.Row():
                    d_name = gr.Textbox(label="Mahsulot nomi", placeholder="Samsung TV 55 inch")
                    d_hs   = gr.Textbox(label="HS Kod", placeholder="8528.72.10")
                with gr.Row():
                    d_qty  = gr.Number(label="Miqdor", value=1)
                    d_unit = gr.Dropdown(label="O'lchov birligi", choices=["dona","kg","litr","m²"], value="dona")

            with gr.Accordion("🧾 2-qadam: Schyot-faktura", open=False):
                with gr.Row():
                    d_inv_no   = gr.Textbox(label="Faktura raqami", placeholder="INV-2024-001")
                    d_inv_date = gr.Textbox(label="Sana (YYYY-MM-DD)", placeholder="2024-01-15")
                with gr.Row():
                    d_inv_val = gr.Number(label="Qiymat", value=5000)
                    d_inv_cur = gr.Dropdown(label="Valyuta", choices=CURRENCIES, value="USD")
                d_inc = gr.Dropdown(label="Yetkazib berish sharti (Incoterms)",
                                    choices=["FOB","CIF","CFR","EXW","DDP"], value="FOB")

            with gr.Accordion("🌍 3-qadam: Mamlakat va tashish", open=False):
                with gr.Row():
                    d_cntry = gr.Dropdown(label="Kelib chiqqan mamlakat", choices=COUNTRIES, value="Xitoy")
                    d_trans = gr.Dropdown(label="Tashish usuli",
                                          choices=["Dengiz","Havo","Avtomobil","Temir yo'l"], value="Dengiz")
                with gr.Row():
                    d_exp = gr.Textbox(label="Eksportchi nomi", placeholder="Shanghai Trading Co.")
                    d_imp = gr.Textbox(label="Importchi nomi", placeholder="Toshkent Savdo MChJ")
                d_tin = gr.Textbox(label="STIR / TIN", placeholder="123456789")

            with gr.Accordion("👁 4-qadam: Ko'rib chiqish", open=False):
                d_rev = gr.HTML('<div style="color:#5D7862;padding:16px;text-align:center;font-size:13px">Ma\'lumotlarni to\'ldiring va <b style=\'color:#A7C7AD\'>Yangilash</b> tugmasini bosing</div>')
                gr.Button("🔄 Yangilash", variant="secondary").click(
                    gen_review,
                    [d_name,d_hs,d_qty,d_unit,d_inv_no,d_inv_val,d_inv_cur,d_inc,d_cntry,d_trans,d_exp,d_imp,d_tin],
                    d_rev)

            with gr.Accordion("📥 5-qadam: PDF Yaratish", open=False):
                d_gen = gr.Markdown("")
                gr.Button("📥 PDF Yaratish (Demo)", variant="primary", size="lg").click(
                    gen_pdf, [d_name,d_inv_val,d_inv_cur,d_cntry], d_gen)

        # ── HISTORY ─────────────────────────────────────────────
        with gr.Tab("📊 Tarix"):
            items_html = "".join(f'''
            <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;
                 border-radius:12px;padding:14px 18px;margin-bottom:10px;
                 display:flex;align-items:center;gap:14px">
              <span style="font-size:24px;flex-shrink:0">{i["icon"]}</span>
              <div style="flex:1;min-width:0">
                <div style="color:#F4F7F4;font-size:14px;font-weight:600;margin-bottom:3px;
                     white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{i["title"]}</div>
                <div style="color:#A7C7AD;font-size:12px;font-weight:500">{i["subtitle"]}</div>
              </div>
              <div style="color:#5D7862;font-size:11px;white-space:nowrap;font-weight:500">{i["date"]}</div>
            </div>''' for i in HISTORY_ITEMS)
            gr.HTML(f"""
            <div style="display:flex;align-items:center;gap:14px;padding:18px 20px;
                 background:linear-gradient(135deg,#112018,#080C09);
                 border-radius:14px;margin-bottom:16px;border:1px solid #356145">
              <span style="font-size:30px;flex-shrink:0">📊</span>
              <div>
                <div style="font-size:17px;font-weight:700;color:#FFFFFF;margin-bottom:3px">Faoliyat Tarixi</div>
                <div style="font-size:12px;color:#A7C7AD;font-weight:500">So'nggi amallar ro'yxati</div>
              </div>
            </div>
            {items_html}""")

        # ── SUBSCRIPTION ────────────────────────────────────────
        with gr.Tab("💎 Obuna"):
            gr.HTML("""
            <div style="background:linear-gradient(135deg,#166534,#15803D,#22C55E);
                 border-radius:16px;padding:26px;margin-bottom:20px;text-align:center;
                 box-shadow:0 8px 32px rgba(21,128,61,0.35)">
              <div style="font-size:40px;margin-bottom:10px">💎</div>
              <div style="font-size:24px;font-weight:800;color:#080A08;margin-bottom:6px">Reja Tanlang</div>
              <div style="font-size:13px;color:rgba(8,10,8,0.6);font-weight:500">O'zingizga mos tarifni tanlang</div>
            </div>

            <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;
                 border-radius:14px;padding:20px;margin-bottom:12px">
              <div style="font-size:17px;font-weight:800;color:#F4F7F4;margin-bottom:10px">🆓 Bepul · 0 so'm/oy</div>
              <div style="display:flex;flex-direction:column;gap:6px">
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ 20 AI so'rov/kun</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ Kalkulyator</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ HS kod qidirish</div>
                <div style="color:#5D7862;font-size:13px;font-weight:500">❌ OCR tahlil</div>
                <div style="color:#5D7862;font-size:13px;font-weight:500">❌ PDF eksport</div>
              </div>
            </div>

            <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);
                 border:2px solid #22C55E;border-radius:14px;padding:20px;margin-bottom:12px;
                 box-shadow:0 4px 20px rgba(34,197,94,0.2);position:relative">
              <span style="position:absolute;top:-10px;left:20px;background:linear-gradient(135deg,#22C55E,#15803D);
                    color:#080A08;padding:3px 12px;border-radius:999px;font-size:11px;font-weight:800">MASHHUR</span>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                <div style="font-size:17px;font-weight:800;color:#F4F7F4">💎 Premium</div>
                <div style="color:#22C55E;font-size:15px;font-weight:800">99,000 so'm/oy</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:6px">
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ Cheksiz AI so'rovlar</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ OCR hujjat tahlili</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ Advanced HS tasniflash</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ PDF eksport</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ Priority qo'llab-quvvatlash</div>
              </div>
            </div>

            <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);border:1px solid #2C3A30;
                 border-radius:14px;padding:20px;margin-bottom:20px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                <div style="font-size:17px;font-weight:800;color:#F4F7F4">🏢 Business</div>
                <div style="color:#A7C7AD;font-size:15px;font-weight:700">499,000 so'm/oy</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:6px">
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ Ko'p foydalanuvchi (10 ta)</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ API kirish huquqi</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ Dedicated support 24/7</div>
                <div style="color:#4ADE80;font-size:13px;font-weight:500">✅ Maxsus integratsiya</div>
              </div>
            </div>
            """)
            sub_plan = gr.Radio(label="Reja tanlang",
                                choices=["🆓 Bepul", "💎 Premium (99,000 so'm/oy)", "🏢 Business (499,000 so'm/oy)"],
                                value="💎 Premium (99,000 so'm/oy)")
            sub_pay  = gr.Radio(label="To'lov usuli",
                                choices=["🔵 Click", "🟢 Payme", "🟣 Uzum Pay"],
                                value="🔵 Click")
            sub_res  = gr.Markdown("")
            gr.Button("🔓 Obuna bo'lish", variant="primary", size="lg").click(
                fn=lambda p, pay: "✅ **So'rov qabul qilindi!** To'lov tizimi tez orada ulanadi." if "Bepul" not in p else "✅ **Bepul rejimda** foydalanmoqdasiz.",
                inputs=[sub_plan, sub_pay], outputs=sub_res)

        # ── PROFILE ─────────────────────────────────────────────
        with gr.Tab("👤 Profil"):
            gr.HTML("""
            <div style="background:linear-gradient(135deg,#112018,#080C09);
                 border-radius:16px;padding:28px;text-align:center;margin-bottom:16px;
                 border:1px solid #356145">
              <div style="width:80px;height:80px;border-radius:50%;
                   background:linear-gradient(135deg,#356145,#121A14);
                   border:3px solid #4ADE80;
                   display:flex;align-items:center;justify-content:center;
                   font-size:32px;font-weight:800;color:#FFFFFF;margin:0 auto 14px">A</div>
              <div style="font-size:20px;font-weight:800;color:#FFFFFF;margin-bottom:4px">Alisher Umarov</div>
              <div style="color:#A7C7AD;font-size:13px;margin-bottom:12px">demo@customsai.uz</div>
              <span style="display:inline-flex;align-items:center;gap:6px;
                    background:linear-gradient(135deg,#22C55E,#15803D);
                    color:#080A08;padding:6px 16px;border-radius:999px;
                    font-size:12px;font-weight:800">💎 Premium Plan</span>

              <div style="display:flex;justify-content:center;gap:24px;margin-top:20px;padding-top:20px;
                   border-top:1px solid rgba(255,255,255,0.1)">
                <div>
                  <div style="font-size:22px;font-weight:800;color:#22C55E">12</div>
                  <div style="font-size:11px;color:#A7C7AD;margin-top:3px">Hisob-kitob</div>
                </div>
                <div style="width:1px;background:rgba(255,255,255,0.1)"></div>
                <div>
                  <div style="font-size:22px;font-weight:800;color:#22C55E">8</div>
                  <div style="font-size:11px;color:#A7C7AD;margin-top:3px">Deklaratsiya</div>
                </div>
                <div style="width:1px;background:rgba(255,255,255,0.1)"></div>
                <div>
                  <div style="font-size:22px;font-weight:800;color:#22C55E">34</div>
                  <div style="font-size:11px;color:#A7C7AD;margin-top:3px">HS Qidiruv</div>
                </div>
              </div>
            </div>

            <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);
                 border:1px solid #2C3A30;border-radius:14px;padding:18px;margin-bottom:12px">
              <div style="color:#A7C7AD;font-size:11px;font-weight:700;
                   letter-spacing:1px;margin-bottom:12px;text-transform:uppercase">🗺️ Rivojlanish Yo'l Xaritasi</div>
              <div style="display:flex;flex-direction:column;gap:8px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="color:#4ADE80;font-weight:700;font-size:13px">✅</span>
                  <span style="color:#F4F7F4;font-size:13px">Phase 1: Mock API + UI (Hozir)</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="color:#22C55E;font-weight:700;font-size:13px">🔄</span>
                  <span style="color:#CFE0D2;font-size:13px">Phase 2: RAG + OCR AI</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="color:#5D7862;font-weight:700;font-size:13px">📅</span>
                  <span style="color:#78977E;font-size:13px">Phase 3: HS Classification AI</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="color:#5D7862;font-weight:700;font-size:13px">📅</span>
                  <span style="color:#78977E;font-size:13px">Phase 4: Auto Declaration</span>
                </div>
              </div>
            </div>

            <div style="background:linear-gradient(135deg,#121A14,#0A0E0B);
                 border:1px solid #2C3A30;border-radius:14px;padding:18px;margin-bottom:16px">
              <div style="color:#A7C7AD;font-size:11px;font-weight:700;
                   letter-spacing:1px;margin-bottom:12px;text-transform:uppercase">ℹ️ Ilova Haqida</div>
              <div style="display:flex;justify-content:space-between;padding:8px 0;
                   border-bottom:1px solid rgba(48,74,55,0.4)">
                <span style="color:#A7C7AD;font-size:13px;font-weight:600">Versiya</span>
                <span style="color:#F4F7F4;font-size:13px;font-weight:700">1.0.0</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:8px 0">
                <span style="color:#A7C7AD;font-size:13px;font-weight:600">Platform</span>
                <span style="color:#F4F7F4;font-size:13px;font-weight:700">Hugging Face Spaces</span>
              </div>
            </div>
            """)
            gr.Radio(label="🌐 Interfeys tili",
                     choices=["🇺🇿 O'zbek", "🇷🇺 Русский", "🇬🇧 English"],
                     value="🇺🇿 O'zbek")
            gr.Radio(label="🎨 Interfeys mavzusi",
                     choices=["🌙 Tungi (Dark)", "☀️ Kunduzgi (Light)"],
                     value="🌙 Tungi (Dark)")

    gr.HTML("""
    <div style="text-align:center;padding:16px;color:#5D7862;font-size:12px;
         border-top:1px solid #2C3A30;margin-top:10px;font-weight:500">
      © 2024 <span style="color:#22C55E;font-weight:700">CustomsAI Uzbekistan</span> · MVP v1.0 ·
      <span style="color:#A7C7AD">🇺🇿 Made for Uzbekistan</span>
    </div>
    """)

if __name__ == "__main__":
    demo.launch()