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
        <section className="article-intent-block">
            <p className="article-kicker">{eyebrow}</p>
            <h2>{title}</h2>
            <div className="article-intent-block__copy">{children}</div>
            <div className="article-intent-block__actions">
                {actions.map((action) => (
                    <a
                        key={`${action.href}-${action.label}`}
                        href={action.href}
                        className={action.solid ? "article-action article-action--solid" : "article-action"}
                    >
                        {action.label}
                    </a>
                ))}
            </div>
        </section>
    );
}
