"use client";

import { useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ThreadsPost {
    id: string;
    text: string;
    username: string;
    permalink: string;
    timestamp: string;
    mediaType: string;
    mediaUrl?: string;
}

interface IGPost {
    id: string;
    caption: string;
    permalink: string;
    timestamp: string;
    mediaType: string;
    mediaUrl?: string;
    likeCount?: number;
    commentsCount?: number;
}

interface SearchResult {
    success: boolean;
    platform: string;
    query: string;
    count: number;
    posts: ThreadsPost[];
    error?: { message: string };
}

interface IGSearchResult {
    success: boolean;
    platform: string;
    query: string;
    count: number;
    posts: IGPost[];
    error?: { message: string } | string;
}

// ---------------------------------------------------------------------------
// Reply templates
// ---------------------------------------------------------------------------
const REPLY_TEMPLATES: Record<string, { label: string; text: string }[]> = {
    hellohouse: [
        {
            label: "🏠 專業推薦",
            text: "高雄包棟的話鹽埕區很推，離駁二/愛河走路就到。我們自己有經營一間，平日一人800起，之前有接過30人畢旅，客人都說 CP 值很高 👍",
        },
        {
            label: "💰 平價訴求",
            text: "高雄包棟一人800起，整棟最多住38人。離捷運鹽埕埔站走路5分鐘，駁二/愛河/西子灣都超近。我們家也可以烤肉開趴 🎉",
        },
        {
            label: "👨‍👩‍👧‍👦 家庭客",
            text: "帶家人來高雄玩的話很推薦住包棟，比飯店有家的感覺。我們在鹽埕區有一間合法民宿，中島廚房超美，很多家庭客都說讚 ❤️",
        },
        {
            label: "🎓 畢旅團體",
            text: "畢旅來高雄超讚！包棟的話人均不到千元就有獨立空間，離駁二走路就到。我們接過很多畢旅團，有需要可以私訊聊聊 🙌",
        },
    ],
    ruins: [
        {
            label: "🍸 活動場地",
            text: "高雄找活動場地的話推薦廢墟Bar，百年老屋改建的超有氛圍。派對/婚禮/慶生/包場都可以 🎉",
        },
        {
            label: "📸 網美拍照",
            text: "這間在鹽埕的老屋超好拍！廢墟Bar，百年建築改建的，拍照超有味道 📸",
        },
    ],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function SocialDashboard() {
    const [apiKey, setApiKey] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    // Search state
    const [searchQuery, setSearchQuery] = useState("高雄包棟");
    const [searchType, setSearchType] = useState("RECENT");
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [igResults, setIgResults] = useState<IGSearchResult | null>(null);
    const [searching, setSearching] = useState(false);
    const [searchPlatform, setSearchPlatform] = useState<"all" | "threads" | "instagram">("all");

    // Reply state (Threads)
    const [replyingTo, setReplyingTo] = useState<ThreadsPost | null>(null);
    const [replyAccount, setReplyAccount] = useState("hellohouse");
    const [replyText, setReplyText] = useState("");
    const [replying, setReplying] = useState(false);
    const [replyResult, setReplyResult] = useState<string | null>(null);

    // IG Comment state
    const [commentingOn, setCommentingOn] = useState<IGPost | null>(null);
    const [commentText, setCommentText] = useState("");
    const [commenting, setCommenting] = useState(false);
    const [commentResult, setCommentResult] = useState<string | null>(null);

    // Publish state
    const [pubPage, setPubPage] = useState("hellohouse");
    const [pubMessage, setPubMessage] = useState("");
    const [pubLink, setPubLink] = useState("");
    const [pubPlatforms, setPubPlatforms] = useState(["facebook", "threads"]);
    const [publishing, setPublishing] = useState(false);
    const [pubResult, setPubResult] = useState<string | null>(null);

    // Tab
    const [tab, setTab] = useState<"search" | "publish">("search");

    const doSearch = useCallback(async () => {
        setSearching(true);
        setSearchResults(null);
        setIgResults(null);
        try {
            const platform = searchPlatform === "all" ? "all" : searchPlatform;
            const res = await fetch(
                `/api/social/search?q=${encodeURIComponent(searchQuery)}&platform=${platform}&type=${searchType}`,
                { headers: { "x-api-key": apiKey } },
            );
            const data = await res.json();
            if (data.threads) setSearchResults(data.threads);
            if (data.instagram) setIgResults(data.instagram as IGSearchResult);
            // fallback for single platform response
            if (!data.threads && !data.instagram && data.posts) {
                setSearchResults(data);
            }
        } catch (e) {
            setSearchResults({ success: false, platform: "threads", query: searchQuery, count: 0, posts: [], error: { message: String(e) } });
        }
        setSearching(false);
    }, [searchQuery, searchType, searchPlatform, apiKey]);

    const doReply = useCallback(async () => {
        if (!replyingTo || !replyText) return;
        setReplying(true);
        setReplyResult(null);
        try {
            const res = await fetch("/api/social/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-api-key": apiKey },
                body: JSON.stringify({ postId: replyingTo.id, message: replyText, account: replyAccount }),
            });
            const data = await res.json();
            setReplyResult(data.success ? `✅ 回覆成功！ID: ${data.replyId}` : `❌ 失敗：${JSON.stringify(data.error)}`);
        } catch (e) {
            setReplyResult(`❌ 錯誤：${String(e)}`);
        }
        setReplying(false);
    }, [replyingTo, replyText, replyAccount, apiKey]);

    const doComment = useCallback(async () => {
        if (!commentingOn || !commentText) return;
        setCommenting(true);
        setCommentResult(null);
        try {
            const res = await fetch("/api/social/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-api-key": apiKey },
                body: JSON.stringify({ mediaId: commentingOn.id, message: commentText, account: replyAccount }),
            });
            const data = await res.json();
            setCommentResult(data.success ? `✅ 留言成功！ID: ${data.commentId}` : `❌ 失敗：${JSON.stringify(data.error)}`);
        } catch (e) {
            setCommentResult(`❌ 錯誤：${String(e)}`);
        }
        setCommenting(false);
    }, [commentingOn, commentText, replyAccount, apiKey]);

    const doPublish = useCallback(async () => {
        if (!pubMessage) return;
        setPublishing(true);
        setPubResult(null);
        try {
            const res = await fetch("/api/social/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-api-key": apiKey },
                body: JSON.stringify({
                    page: pubPage,
                    message: pubMessage,
                    link: pubLink || undefined,
                    platforms: pubPlatforms,
                }),
            });
            const data = await res.json();
            setPubResult(JSON.stringify(data, null, 2));
        } catch (e) {
            setPubResult(`❌ 錯誤：${String(e)}`);
        }
        setPublishing(false);
    }, [pubPage, pubMessage, pubLink, pubPlatforms, apiKey]);

    // Login screen
    if (!authenticated) {
        return (
            <div style={styles.loginWrap}>
                <div style={styles.loginCard}>
                    <h1 style={styles.loginTitle}>🚀 社群操作面板</h1>
                    <p style={styles.loginSub}>輸入 API Key 開始操作</p>
                    <input
                        type="password"
                        placeholder="API Secret Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && apiKey && setAuthenticated(true)}
                        style={styles.input}
                    />
                    <button
                        onClick={() => apiKey && setAuthenticated(true)}
                        style={styles.btnPrimary}
                    >
                        登入
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>🚀 社群操作面板</h1>
                <div style={styles.tabs}>
                    <button
                        onClick={() => setTab("search")}
                        style={tab === "search" ? styles.tabActive : styles.tab}
                    >
                        🔍 搜尋＋回覆
                    </button>
                    <button
                        onClick={() => setTab("publish")}
                        style={tab === "publish" ? styles.tabActive : styles.tab}
                    >
                        📝 發文
                    </button>
                </div>
            </header>

            {/* Search Tab */}
            {tab === "search" && (
                <div style={styles.content}>
                    {/* Search Bar */}
                    <div style={styles.searchBar}>
                        <input
                            placeholder="搜尋關鍵字，例如：高雄包棟"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && doSearch()}
                            style={styles.searchInput}
                        />
                        <select
                            value={searchPlatform}
                            onChange={(e) => setSearchPlatform(e.target.value as "all" | "threads" | "instagram")}
                            style={styles.select}
                        >
                            <option value="all">全部平台</option>
                            <option value="threads">🧵 Threads</option>
                            <option value="instagram">📷 Instagram</option>
                        </select>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            style={styles.select}
                        >
                            <option value="RECENT">最新</option>
                            <option value="TOP">熱門</option>
                        </select>
                        <button
                            onClick={doSearch}
                            disabled={searching}
                            style={styles.btnPrimary}
                        >
                            {searching ? "搜尋中..." : "🔍 搜尋"}
                        </button>
                    </div>

                    {/* Quick keywords */}
                    <div style={styles.quickKeywords}>
                        {["高雄包棟", "包棟民宿", "高雄民宿推薦", "高雄旅遊", "鹽埕住宿"].map((kw) => (
                            <button
                                key={kw}
                                onClick={() => { setSearchQuery(kw); }}
                                style={styles.kwBtn}
                            >
                                {kw}
                            </button>
                        ))}
                    </div>

                    {/* Results */}
                    {searchResults && (
                        <div style={styles.results}>
                            <h3 style={styles.resultHeader}>
                                {searchResults.success
                                    ? `找到 ${searchResults.count} 篇貼文`
                                    : `❌ ${searchResults.error?.message}`}
                            </h3>
                            {searchResults.posts?.map((post) => (
                                <div
                                    key={post.id}
                                    style={{
                                        ...styles.postCard,
                                        ...(post.username === "hellohouse2020" ? styles.ownPost : {}),
                                    }}
                                >
                                    <div style={styles.postHeader}>
                                        <strong>@{post.username}</strong>
                                        <span style={styles.postTime}>
                                            {new Date(post.timestamp).toLocaleString("zh-TW")}
                                        </span>
                                    </div>
                                    <p style={styles.postText}>
                                        {post.text?.length > 200 ? post.text.slice(0, 200) + "..." : post.text}
                                    </p>
                                    {post.mediaUrl && (
                                        <img src={post.mediaUrl} alt="" style={styles.postImg} />
                                    )}
                                    <div style={styles.postActions}>
                                        <a
                                            href={post.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={styles.linkBtn}
                                        >
                                            🔗 查看原文
                                        </a>
                                        {post.username !== "hellohouse2020" && (
                                            <button
                                                onClick={() => {
                                                    setReplyingTo(post);
                                                    setReplyText(REPLY_TEMPLATES.hellohouse[0].text);
                                                }}
                                                style={styles.replyBtn}
                                            >
                                                💬 回覆這篇
                                            </button>
                                        )}
                                        {post.username === "hellohouse2020" && (
                                            <span style={styles.ownLabel}>📌 自己的貼文</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* IG Results */}
                    {igResults && (
                        <div style={styles.results}>
                            <h3 style={{ ...styles.resultHeader, color: '#e1306c' }}>
                                📷 Instagram — {igResults.success
                                    ? `找到 ${igResults.count} 篇貼文`
                                    : `❌ ${typeof igResults.error === 'string' ? igResults.error : igResults.error?.message}`}
                            </h3>
                            {igResults.posts?.map((post) => (
                                <div key={post.id} style={styles.postCard}>
                                    <div style={styles.postHeader}>
                                        <strong style={{ color: '#e1306c' }}>📷 IG</strong>
                                        <span style={styles.postTime}>
                                            {new Date(post.timestamp).toLocaleString("zh-TW")}
                                        </span>
                                    </div>
                                    <p style={styles.postText}>
                                        {post.caption?.length > 200 ? post.caption.slice(0, 200) + "..." : post.caption}
                                    </p>
                                    {post.mediaUrl && (
                                        <img src={post.mediaUrl} alt="" style={styles.postImg} />
                                    )}
                                    <div style={styles.postActions}>
                                        <a href={post.permalink} target="_blank" rel="noopener noreferrer" style={styles.linkBtn}>
                                            🔗 查看原文
                                        </a>
                                        <span style={{ fontSize: 13, color: '#888' }}>❤️ {post.likeCount || 0} 💬 {post.commentsCount || 0}</span>
                                        <button
                                            onClick={() => {
                                                setCommentingOn(post);
                                                setCommentText(REPLY_TEMPLATES.hellohouse[0].text);
                                            }}
                                            style={{ ...styles.replyBtn, borderColor: 'rgba(225,48,108,0.3)', color: '#e1306c', background: 'rgba(225,48,108,0.1)' }}
                                        >
                                            💬 留言
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Threads Reply Modal */}
                    {replyingTo && (
                        <div style={styles.modalOverlay} onClick={() => setReplyingTo(null)}>
                            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                                <h3 style={styles.modalTitle}>🧵 回覆 @{replyingTo.username}</h3>
                                <div style={styles.quoteBox}>
                                    <p style={styles.quoteText}>
                                        {replyingTo.text?.length > 150
                                            ? replyingTo.text.slice(0, 150) + "..."
                                            : replyingTo.text}
                                    </p>
                                </div>

                                {/* Account selector */}
                                <div style={styles.fieldRow}>
                                    <label>回覆帳號：</label>
                                    <select
                                        value={replyAccount}
                                        onChange={(e) => {
                                            setReplyAccount(e.target.value);
                                            setReplyText(
                                                REPLY_TEMPLATES[e.target.value]?.[0]?.text || "",
                                            );
                                        }}
                                        style={styles.select}
                                    >
                                        <option value="hellohouse">你好哇寓所</option>
                                        <option value="ruins">廢墟Bar</option>
                                    </select>
                                </div>

                                {/* Template buttons */}
                                <div style={styles.templateWrap}>
                                    <p style={styles.templateLabel}>選擇文案模板：</p>
                                    <div style={styles.templateBtns}>
                                        {(REPLY_TEMPLATES[replyAccount] || []).map((t, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setReplyText(t.text)}
                                                style={
                                                    replyText === t.text
                                                        ? styles.templateBtnActive
                                                        : styles.templateBtn
                                                }
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Editable reply */}
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                    style={styles.textarea}
                                    placeholder="輸入回覆內容..."
                                />

                                <div style={styles.modalActions}>
                                    <button onClick={() => setReplyingTo(null)} style={styles.btnCancel}>
                                        取消
                                    </button>
                                    <button
                                        onClick={doReply}
                                        disabled={replying || !replyText}
                                        style={styles.btnPrimary}
                                    >
                                        {replying ? "回覆中..." : "📤 送出回覆"}
                                    </button>
                                </div>

                                {replyResult && (
                                    <p style={styles.resultMsg}>{replyResult}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* IG Comment Modal */}
                    {commentingOn && (
                        <div style={styles.modalOverlay} onClick={() => setCommentingOn(null)}>
                            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                                <h3 style={{ ...styles.modalTitle, color: '#e1306c' }}>📷 IG 留言</h3>
                                <div style={styles.quoteBox}>
                                    <p style={styles.quoteText}>
                                        {commentingOn.caption?.length > 150
                                            ? commentingOn.caption.slice(0, 150) + "..."
                                            : commentingOn.caption}
                                    </p>
                                </div>

                                <div style={styles.fieldRow}>
                                    <label>留言帳號：</label>
                                    <select
                                        value={replyAccount}
                                        onChange={(e) => setReplyAccount(e.target.value)}
                                        style={styles.select}
                                    >
                                        <option value="hellohouse">你好哇寓所</option>
                                        <option value="ruins">廢墟Bar</option>
                                    </select>
                                </div>

                                <div style={styles.templateWrap}>
                                    <p style={styles.templateLabel}>選擇文案模板：</p>
                                    <div style={styles.templateBtns}>
                                        {(REPLY_TEMPLATES[replyAccount] || []).map((t, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCommentText(t.text)}
                                                style={
                                                    commentText === t.text
                                                        ? styles.templateBtnActive
                                                        : styles.templateBtn
                                                }
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    rows={4}
                                    style={styles.textarea}
                                    placeholder="輸入留言內容..."
                                />

                                <div style={styles.modalActions}>
                                    <button onClick={() => setCommentingOn(null)} style={styles.btnCancel}>
                                        取消
                                    </button>
                                    <button
                                        onClick={doComment}
                                        disabled={commenting || !commentText}
                                        style={{ ...styles.btnPrimary, background: 'linear-gradient(135deg, #e1306c, #fd1d1d)' }}
                                    >
                                        {commenting ? "留言中..." : "📤 送出留言"}
                                    </button>
                                </div>

                                {commentResult && (
                                    <p style={styles.resultMsg}>{commentResult}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Publish Tab */}
            {tab === "publish" && (
                <div style={styles.content}>
                    <div style={styles.publishCard}>
                        <h3 style={styles.publishTitle}>📝 同步發文到多平台</h3>

                        <div style={styles.fieldRow}>
                            <label>品牌：</label>
                            <select
                                value={pubPage}
                                onChange={(e) => setPubPage(e.target.value)}
                                style={styles.select}
                            >
                                <option value="hellohouse">你好哇寓所</option>
                                <option value="ruins">廢墟Bar</option>
                            </select>
                        </div>

                        <div style={styles.fieldRow}>
                            <label>發佈平台：</label>
                            <div style={styles.checkboxGroup}>
                                {["facebook", "instagram", "threads"].map((p) => (
                                    <label key={p} style={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={pubPlatforms.includes(p)}
                                            onChange={(e) => {
                                                setPubPlatforms(
                                                    e.target.checked
                                                        ? [...pubPlatforms, p]
                                                        : pubPlatforms.filter((x) => x !== p),
                                                );
                                            }}
                                        />
                                        {p === "facebook" ? "📘 Facebook" : p === "instagram" ? "📷 Instagram" : "🧵 Threads"}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <textarea
                            value={pubMessage}
                            onChange={(e) => setPubMessage(e.target.value)}
                            rows={5}
                            style={styles.textarea}
                            placeholder="貼文內容..."
                        />

                        <input
                            placeholder="附加連結（選填）"
                            value={pubLink}
                            onChange={(e) => setPubLink(e.target.value)}
                            style={styles.input}
                        />

                        <button
                            onClick={doPublish}
                            disabled={publishing || !pubMessage}
                            style={styles.btnPrimary}
                        >
                            {publishing ? "發佈中..." : "🚀 發佈到選取的平台"}
                        </button>

                        {pubResult && (
                            <pre style={styles.pubResult}>{pubResult}</pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Styles (inline for single-file simplicity)
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
    // Login
    loginWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" },
    loginCard: { background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", borderRadius: 20, padding: "48px 40px", maxWidth: 400, width: "100%", display: "flex", flexDirection: "column", gap: 16, border: "1px solid rgba(255,255,255,0.1)" },
    loginTitle: { color: "#fff", fontSize: 28, margin: 0, textAlign: "center" },
    loginSub: { color: "rgba(255,255,255,0.6)", margin: 0, textAlign: "center", fontSize: 14 },

    // Layout
    container: { minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'Inter', -apple-system, sans-serif" },
    header: { background: "linear-gradient(135deg, #1a1a2e, #16213e)", padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 },
    headerTitle: { margin: 0, fontSize: 22, color: "#fff" },
    tabs: { display: "flex", gap: 8 },
    tab: { padding: "8px 20px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, background: "transparent", color: "#aaa", cursor: "pointer", fontSize: 14, transition: "all .2s" },
    tabActive: { padding: "8px 20px", border: "1px solid #6c63ff", borderRadius: 8, background: "rgba(108,99,255,0.15)", color: "#a29bfe", cursor: "pointer", fontSize: 14, fontWeight: 600 },
    content: { maxWidth: 900, margin: "0 auto", padding: "24px 16px" },

    // Search
    searchBar: { display: "flex", gap: 8, flexWrap: "wrap" as const },
    searchInput: { flex: 1, minWidth: 200, padding: "10px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15, outline: "none" },
    select: { padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "#1a1a2e", color: "#e0e0e0", fontSize: 14, outline: "none" },
    quickKeywords: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" as const },
    kwBtn: { padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#aaa", cursor: "pointer", fontSize: 13, transition: "all .2s" },

    // Results
    results: { marginTop: 24 },
    resultHeader: { color: "#a29bfe", marginBottom: 16, fontSize: 16 },
    postCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px", marginBottom: 12, transition: "all .2s" },
    ownPost: { borderColor: "rgba(108,99,255,0.3)", background: "rgba(108,99,255,0.05)" },
    postHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    postTime: { color: "#666", fontSize: 12 },
    postText: { margin: "8px 0", lineHeight: 1.6, fontSize: 14, color: "#ccc", whiteSpace: "pre-wrap" as const },
    postImg: { maxWidth: "100%", maxHeight: 200, borderRadius: 8, marginTop: 8 },
    postActions: { display: "flex", gap: 12, marginTop: 12, alignItems: "center" },
    linkBtn: { padding: "6px 14px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "#a29bfe", textDecoration: "none", fontSize: 13 },
    replyBtn: { padding: "6px 14px", borderRadius: 6, background: "rgba(46,204,113,0.15)", border: "1px solid rgba(46,204,113,0.3)", color: "#2ecc71", cursor: "pointer", fontSize: 13 },
    ownLabel: { color: "#6c63ff", fontSize: 13 },

    // Modal
    modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 },
    modal: { background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 24px", maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto" as const },
    modalTitle: { margin: "0 0 16px", fontSize: 18, color: "#fff" },
    quoteBox: { background: "rgba(255,255,255,0.04)", borderLeft: "3px solid #6c63ff", padding: "12px 16px", borderRadius: "0 8px 8px 0", marginBottom: 16 },
    quoteText: { margin: 0, fontSize: 13, color: "#999", lineHeight: 1.5 },
    templateWrap: { marginBottom: 12 },
    templateLabel: { margin: "0 0 8px", fontSize: 13, color: "#888" },
    templateBtns: { display: "flex", gap: 8, flexWrap: "wrap" as const },
    templateBtn: { padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#aaa", cursor: "pointer", fontSize: 13, transition: "all .2s" },
    templateBtnActive: { padding: "6px 14px", borderRadius: 8, border: "1px solid #6c63ff", background: "rgba(108,99,255,0.15)", color: "#a29bfe", cursor: "pointer", fontSize: 13 },
    modalActions: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 16 },
    resultMsg: { marginTop: 12, padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", fontSize: 13 },

    // Publish
    publishCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 },
    publishTitle: { margin: 0, color: "#fff", fontSize: 18 },
    fieldRow: { display: "flex", alignItems: "center", gap: 12 },
    checkboxGroup: { display: "flex", gap: 16 },
    checkboxLabel: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" },

    // Shared
    input: { padding: "10px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, outline: "none", width: "100%" },
    textarea: { padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, outline: "none", resize: "vertical" as const, width: "100%", lineHeight: 1.6, fontFamily: "inherit" },
    btnPrimary: { padding: "10px 24px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #6c63ff, #a29bfe)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "all .2s" },
    btnCancel: { padding: "10px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#aaa", cursor: "pointer", fontSize: 14 },
    pubResult: { background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 16, fontSize: 12, overflow: "auto", maxHeight: 200, whiteSpace: "pre-wrap" as const, color: "#aaa" },
};
