#!/usr/bin/env python3
"""
AI 圓桌辯論系統 — 真刀真槍碰撞版
自動跑 8 輪交叉辯論，每句發言即時寫入 MD 紀錄
"""

import json, sys, time, os, re, ssl, threading
import urllib.request, urllib.error

# ── 速率限制 ── 每分鐘不超過 10 次請求
_last_call_time = 0.0
_rate_lock = threading.Lock()
MIN_INTERVAL = 7.0  # 秒，7秒 × 8~9次 = 56~63秒/分鐘 < 10次/分鐘
MAX_RETRIES = 3
RETRY_DELAY = 15.0  # 遇到限流時等待秒數

# ── 路徑 ──
LOG_PATH = "/Users/tangyukao/.gemini/antigravity/brain/8acde890-dce7-4cf4-8133-d01d3070437d/seo_debate_log.md"

# ── SSL ──
SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

# ── 模型配置 ──
MODELS = {
    "MiniMax-M2.7": {
        "base_url": "https://api.minimax.io/v1",
        "api_key": "sk-cp-4ND2tesfRZ79_XyqAwfzF2WqnQOnNJkoESzeFDzTx9ee1NHGWdLUfi0mNX65wFymbsOSdhBNG0alTUT8jERnDrf6BOk-I9su7KH1MTOtIVwPYBIDSaaCWj0",
        "model": "MiniMax-M2.7",
        "emoji": "🟣",
        "api_type": "chat",
    },
    "GPT-5.3-Codex": {
        "base_url": "https://api.getrouter.dev/v1",
        "api_key": "gr-bb921b9d8ca11cb230e5f24c8488743eff5ddf7d87d52c02",
        "model": "gpt-5.3-codex",
        "emoji": "🟢",
        "api_type": "responses",
    },
}

MODERATOR = {"name": "Antigravity", "emoji": "🔵"}

MAX_ROUNDS = 8
MAX_TOKENS = 1500
TIMEOUT = 120

# ── 議題與背景 ──
TOPIC = "www.hello-stay.com SEO/AEO 優化到最極致"

BACKGROUND = """
## 背景資料

**網站**: www.hello-stay.com（高雄鹽埕區包棟民宿品牌）
**三館**:
- 你好哇寓所 (Hello House): 6-26人，中島廚房/麻將/桌遊
- 溝頂民宿 (Godin): 10-12人，五層樓獨棟，平日$10,000起
- 大智若愚 (Da Zhi): 最大48人，電梯，大港橋旁（2026新開）

**技術**: Next.js App Router, Vercel, 支援 zh-TW/en/ja/ko/vi
**現有**: robots.txt OK, sitemap 41頁, JSON-LD 9頁, llms.txt OK

## Google Search Console 數據（2026-03-19）
- 全站：23人從Google點進來，被搜到265次
- 「高雄包棟民宿」→ 第2頁第11名，21搜1點
- 「高雄包棟」→ 第2頁第12名，退步中
- 「高雄民宿包棟」→ **第1頁第2名，但0點擊！** ← 最大問題
- 「鹽埕民宿」→ 第16名
- 「你好哇寓所」→ 品牌字第2名
- 未上榜：高雄包棟推薦、高雄民宿推薦、鹽埕包棟、高雄團體住宿

## 目標
將 SEO 和 AEO 優化到最極致。不只是排名，要 CTR、轉換率、AI推薦都拿到。
"""

# ── 角色 Prompt（辯論版）──
def make_system_prompt(name: str, other_name: str) -> str:
    if name == "MiniMax-M2.7":
        personality = (
            "你是一個非常激進、數據導向的 SEO 策略家。你相信一切要用數據說話。\n"
            "你的風格是：\n"
            "- 看到沒有數據支撐的觀點就猛烈質疑\n"
            "- 偏好「小而快」的勝利，ROI 最大化\n"
            "- 不信AEO短期能帶來流量，認為傳統SEO才是王道\n"
            "- 擅長從競爭對手分析和搜尋意圖角度切入\n"
            "- 如果你不同意對方，直接說「不對」「這個邏輯有問題」\n"
        )
    else:
        personality = (
            "你是一個前瞻性的AI搜尋與內容策略專家。你認為2026年AI搜尋已經改變遊戲規則。\n"
            "你的風格是：\n"
            "- 堅信 AEO 是未來，傳統 SEO 已經不夠\n"
            "- 擅長從用戶意圖、內容體驗角度思考\n"
            "- 會提出大膽的、非常規的策略\n"
            "- 如果你覺得對方太保守，就直接挑戰「你這是在用2020年的思維做2026年的事」\n"
            "- 重視品牌敘事和情感連結，不只是堆關鍵字\n"
        )
    
    return (
        f"你是 SEO/AEO 辯論中的「{name}」。你正在和「{other_name}」進行一場真正的專業辯論。\n\n"
        f"## 你的性格\n{personality}\n"
        "## 辯論規則\n"
        "1. 這是真實辯論，不是做簡報。你要直接回應對方的論點，不是各說各的。\n"
        "2. 如果不同意，立刻反駁，給出理由。不要說「這個觀點很好但是...」這種客套話。\n"
        "3. 可以打斷、追問、質疑對方的數據來源。\n"
        "4. 允許改變立場，但要說清楚為什麼。\n"
        "5. 提出具體的、可執行的方案，不要空泛。\n"
        "6. 如果你有新想法，即使偏離主題也可以提。\n"
        "7. 用繁體中文，口語化，像兩個專家在咖啡廳吵架。\n"
        "8. 每次發言 300 字以內，精簡有力，不要列清單做報告。\n"
        "9. 用「你」來稱呼對方，這是一對一對話。\n"
        "10. 記住：主席（老闆）在旁邊看，他要的是碰撞出最好的方案。\n"
    )

# ── API 呼叫 ──
def call_llm(name: str, messages: list) -> str:
    cfg = MODELS[name]
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {cfg['api_key']}",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    }
    
    if cfg["api_type"] == "responses":
        url = f"{cfg['base_url']}/responses"
        system_msg = next((m["content"] for m in messages if m["role"] == "system"), "")
        user_msgs = [m for m in messages if m["role"] != "system"]
        input_text = "\n\n".join(f"[{m['role'].upper()}]:\n{m['content']}" for m in user_msgs)
        payload = json.dumps({
            "model": cfg["model"],
            "instructions": system_msg,
            "input": input_text,
            "max_output_tokens": MAX_TOKENS,
        }).encode()
    else:
        url = f"{cfg['base_url']}/chat/completions"
        payload = json.dumps({
            "model": cfg["model"],
            "messages": messages,
            "max_tokens": MAX_TOKENS,
            "temperature": 0.85,  # 高溫度 = 更多創意
        }).encode()

    req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
    
    # 速率限制：確保距離上一次呼叫至少 MIN_INTERVAL 秒
    global _last_call_time
    with _rate_lock:
        elapsed = time.time() - _last_call_time
        if elapsed < MIN_INTERVAL:
            wait = MIN_INTERVAL - elapsed
            print(f"  ⏳ 速率限制：等待 {wait:.1f}s...", flush=True)
            time.sleep(wait)
        _last_call_time = time.time()
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT, context=SSL_CTX) as resp:
                data = json.loads(resp.read().decode())
                if cfg["api_type"] == "responses":
                    for item in data.get("output", []):
                        for c in item.get("content", []):
                            if c.get("type") == "output_text":
                                return c["text"]
                    return "[無回應]"
                else:
                    content = data["choices"][0]["message"]["content"]
                    content = re.sub(r'<think>.*?</think>', '', content, flags=re.DOTALL).strip()
                    return content
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:300]
            if e.code in (401, 403, 429) and attempt < MAX_RETRIES:
                wait = RETRY_DELAY * attempt
                print(f"  ⚠️ {name} API {e.code}，第{attempt}次重試，等待 {wait:.0f}s...", flush=True)
                time.sleep(wait)
                # 重建 request（因為 read() 會消耗 body）
                req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
                continue
            return f"[API 錯誤 {e.code}] {body}"
        except Exception as e:
            if attempt < MAX_RETRIES:
                wait = RETRY_DELAY * attempt
                print(f"  ⚠️ {name} 連線錯誤，第{attempt}次重試，等待 {wait:.0f}s...", flush=True)
                time.sleep(wait)
                req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
                continue
            return f"[連線錯誤] {str(e)[:300]}"
    return "[重試耗盡]"

# ── MD 日誌 ──
def init_log():
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        f.write(f"# 🏛️ SEO/AEO 圓桌辯論實錄\n\n")
        f.write(f"**時間**: {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(f"**議題**: {TOPIC}\n\n")
        f.write(f"**辯論者**: 🟣 MiniMax-M2.7 vs 🟢 GPT-5.3-Codex\n\n")
        f.write(f"**主持/裁判**: 🔵 Antigravity\n\n")
        f.write(f"**格式**: 多輪交叉辯論，最多 {MAX_ROUNDS} 輪\n\n")
        f.write("---\n\n")

def append_log(text: str):
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(text)
    # 也印到 stdout
    print(text, end="", flush=True)

# ── 主持人評論生成 ──
def moderator_comment(round_num: int, r1_text: str, r2_text: str, history_summary: str) -> str:
    """Antigravity (主持人) 的即時點評和追問"""
    name1 = "MiniMax-M2.7"
    name2 = "GPT-5.4"
    
    if round_num == 1:
        # 開場後做第一次點評
        return (
            f"兩位都丟出了開場觀點。但我要點名幾個問題：\n\n"
            f"聽起來兩邊的路線不太一樣 — 我想請你們正面交鋒：\n"
            f"**主要辯論軸**：傳統 SEO（關鍵字/外鏈/技術）vs AEO（AI推薦/結構化/品牌敘事），哪個才是現在 hello-stay.com 該投入的重心？\n\n"
            f"另外，目前最痛的問題是「**高雄民宿包棟**排第2但0點擊」。這代表什麼？是 Title 爛？是 SERP 特性？還是根本關鍵字選錯了？請辯論。"
        )
    elif round_num == 3:
        return (
            f"好，已經吵了幾輪了。我需要你們從「戰略層」拉下來到「戰術層」。\n\n"
            f"請具體到：\n"
            f"1. **首頁的 Title 到底怎麼寫？** 一字一句給我看\n"
            f"2. **Meta Description 怎麼寫？** 150字以內\n"
            f"3. **最該先做的一件事是什麼？** 不是五件，就一件\n\n"
            f"如果你們對 Title 有不同意見，就直接較量，各寫一版讓我看。"
        )
    elif round_num == 5:
        return (
            f"OK 戰術討論得差不多了。但你們都沒認真談 **AEO** 的具體執行。\n\n"
            f"我直接問：\n"
            f"1. **AI 搜尋（ChatGPT/Perplexity/Google AI Overview）現在搜「高雄包棟民宿推薦」會推薦 hello-stay 嗎？如果不會，為什麼？怎麼讓它推？**\n"
            f"2. **llms.txt 有用嗎？還是只是心理安慰？**\n"
            f"3. **如果只能做3件事來讓 AI 推薦你，做什麼？**\n\n"
            f"你們不要客套，直接講你覺得對方的 AEO 策略哪裡有問題。"
        )
    elif round_num == 7:
        return (
            f"最後了。你們需要給出一個明確的、排了優先順序的行動清單。\n\n"
            f"但在那之前，我想問一個沒人提過的角度：\n"
            f"**多語系（en/ja/ko/vi）有沒有 SEO 機會？** 像日本遊客搜「高雄 ゲストハウス」或韓國遊客搜「가오슝 숙소」，這塊完全沒人碰。\n"
            f"還有 **Google Maps / 在地商家** 的優化呢？很多人找民宿是從 Google Maps 開始的。\n\n"
            f"快收斂了，把你認為最重要、你們有共識的、還有你堅持但對方不同意的都列出來。"
        )
    else:
        return ""  # 偶數輪不插嘴，讓他們直接對打

# ── 主流程 ──
def run_debate():
    names = list(MODELS.keys())
    n1, n2 = names[0], names[1]
    
    # 初始化各自對話歷史
    histories = {}
    for name in names:
        other = n2 if name == n1 else n1
        histories[name] = [
            {"role": "system", "content": make_system_prompt(name, other)}
        ]
    
    init_log()
    append_log(f"## 背景資料\n{BACKGROUND}\n\n---\n\n")
    
    # 上一輪回應（用於交叉注入）
    prev_responses = {}
    
    for round_num in range(1, MAX_ROUNDS + 1):
        append_log(f"## 🔥 第 {round_num} 輪\n\n")
        
        if round_num == 1:
            # 第一輪：各自開場
            for name in names:
                prompt = (
                    f"{BACKGROUND}\n\n"
                    f"這是辯論的開場。請針對「{TOPIC}」提出你的核心策略主張。\n"
                    f"記住，你要準備被對方挑戰，所以論點要站得住腳。\n"
                    f"直接講你的觀點，不要做自我介紹。300字以內。"
                )
                histories[name].append({"role": "user", "content": prompt})
                
                append_log(f"### {MODELS[name]['emoji']} {name}\n\n")
                append_log("*（思考中...）*\n\n")
                
                response = call_llm(name, histories[name])
                histories[name].append({"role": "assistant", "content": response})
                prev_responses[name] = response
                
                # 覆蓋「思考中」
                # 直接 append 回應
                append_log(f"{response}\n\n")
        else:
            # 後續輪次：交叉辯論
            # 先看主持人是否要插話
            mod_comment = moderator_comment(
                round_num,
                prev_responses.get(n1, ""),
                prev_responses.get(n2, ""),
                ""
            )
            if mod_comment:
                append_log(f"### 🔵 Antigravity（主持人）\n\n{mod_comment}\n\n")
            
            # 交替發言（不是平行，是一個接一個，像真的對話）
            # 奇數輪 n1 先說，偶數輪 n2 先說
            order = [n1, n2] if round_num % 2 == 1 else [n2, n1]
            
            for i, name in enumerate(order):
                other = n2 if name == n1 else n1
                other_said = prev_responses.get(other, "（還沒發言）")
                
                if i == 0:
                    # 第一個發言的人：回應上一輪對方 + 主持人追問
                    cross = f"【{other}】剛才說：\n{other_said}\n\n"
                    if mod_comment:
                        cross += f"【主持人 Antigravity】追問：\n{mod_comment}\n\n"
                    cross += "你怎麼看？直接回應。如果不同意就反駁，同意就說為什麼，然後提出你的新論點。300字以內。"
                else:
                    # 第二個發言：回應本輪第一個人剛說的
                    first_said = prev_responses[order[0]]
                    cross = f"【{order[0]}】剛才回應說：\n{first_said}\n\n"
                    if mod_comment:
                        cross += f"另外主持人問了：\n{mod_comment}\n\n"
                    cross += "你對他這個回應怎麼看？直接反駁或追問或同意。300字以內。"
                
                histories[name].append({"role": "user", "content": cross})
                
                append_log(f"### {MODELS[name]['emoji']} {name}\n\n")
                
                response = call_llm(name, histories[name])
                histories[name].append({"role": "assistant", "content": response})
                prev_responses[name] = response
                
                append_log(f"{response}\n\n")
        
        append_log("---\n\n")
    
    # ── 最終結論 ──
    append_log("## 📋 最終結論\n\n")
    
    for name in names:
        final_prompt = (
            "辯論結束。用以下格式做最後陳述：\n\n"
            "1. **你堅持的立場**：這場辯論下來，你最堅持什麼？\n"
            "2. **你被說服的地方**：對方有什麼觀點改變了你的想法？\n"
            "3. **共識**：你們其實同意的事情\n"
            "4. **給主席的建議**：具體的、排好優先順序的行動清單（最多5項）\n\n"
            "300字以內，這是你最後的機會。"
        )
        histories[name].append({"role": "user", "content": final_prompt})
        
        append_log(f"### {MODELS[name]['emoji']} {name} 最終陳述\n\n")
        
        response = call_llm(name, histories[name])
        append_log(f"{response}\n\n")
    
    # 主持人總結
    append_log(f"### 🔵 Antigravity（主持人）最終裁決\n\n")
    append_log(
        "我會在辯論結束後，根據雙方論點做出最終裁決和行動建議。\n"
        "請主席（老闆）閱讀完整辯論記錄後決定。\n\n"
    )
    
    append_log(f"---\n\n*辯論紀錄結束 — {time.strftime('%Y-%m-%d %H:%M:%S')}*\n")
    
    print(f"\n\n✅ 完整辯論紀錄已寫入: {LOG_PATH}")

if __name__ == "__main__":
    run_debate()
