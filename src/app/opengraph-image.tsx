import { ImageResponse } from 'next/og';

export const alt = 'Hello Stay 高雄鹽埕包棟民宿';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '84px',
                color: '#342d27',
                background: 'linear-gradient(135deg, #f6efe7 0%, #e5d3c1 100%)',
            }}>
                <div style={{ fontSize: 28, letterSpacing: 8, color: '#9a6d4a' }}>HELLO STAY · KAOHSIUNG</div>
                <div style={{ fontSize: 72, marginTop: 32, fontWeight: 600 }}>高雄鹽埕包棟民宿</div>
                <div style={{ fontSize: 34, marginTop: 24 }}>你好哇寓所 · 溝頂民宿 · 雙館方案</div>
            </div>
        ),
        size,
    );
}
