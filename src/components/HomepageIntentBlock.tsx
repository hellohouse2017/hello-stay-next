import type { ReactNode } from "react";

type Action = {
    href: string;
    label: string;
    solid?: boolean;
};

type Props = {
    title: string;
    children: ReactNode;
    eyebrow?: string;
    actions?: Action[];
};

export default function HomepageIntentBlock({
    title,
    children,
    eyebrow = "Homepage Signal",
    actions = [
        { href: "/", label: "高雄包棟民宿首頁" },
        { href: "/book", label: "查詢空房與報價", solid: true },
    ],
}: Props) {
    return (
        <section
            style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px 24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                marginBottom: "20px",
            }}
        >
            <div
                style={{
                    fontFamily: "var(--sans)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--pri)",
                    marginBottom: "12px",
                }}
            >
                {eyebrow}
            </div>
            <h2
                style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1.08rem",
                    color: "#3D3830",
                    marginBottom: "12px",
                    letterSpacing: "0.04em",
                }}
            >
                {title}
            </h2>
            <div style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.95, marginBottom: "16px" }}>{children}</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {actions.map((action) => (
                    <a
                        key={`${action.href}-${action.label}`}
                        href={action.href}
                        style={{
                            fontSize: "0.78rem",
                            padding: "9px 15px",
                            borderRadius: "20px",
                            textDecoration: "none",
                            background: action.solid ? "#161618" : "var(--bg)",
                            color: action.solid ? "#fff" : "#3D3830",
                            border: action.solid ? "1px solid #161618" : "1px solid #EDE8E3",
                        }}
                    >
                        {action.label}
                    </a>
                ))}
            </div>
        </section>
    );
}
