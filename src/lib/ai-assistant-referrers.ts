export const AI_ASSISTANT_MEDIUM = "ai-assistant";

export const AI_ASSISTANT_REFERRER_ALLOWLIST = [
    "chatgpt.com",
    "chat.openai.com",
    "perplexity.ai",
    "gemini.google.com",
    "bard.google.com",
    "claude.ai",
    "copilot.microsoft.com",
    "bing.com",
];

export function buildGa4InitScript(measurementId: string) {
    return `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      (function() {
        var config = {};
        var referrer = document.referrer;
        var allowlist = ${JSON.stringify(AI_ASSISTANT_REFERRER_ALLOWLIST)};

        if (referrer) {
          try {
            var hostname = new URL(referrer).hostname.replace(/^www\\./, '');
            var matched = allowlist.find(function(host) {
              return hostname === host || hostname.endsWith('.' + host);
            });

            if (matched) {
              config.campaign_medium = '${AI_ASSISTANT_MEDIUM}';
              config.campaign_source = hostname;
            }
          } catch (error) {
            console.warn('ga4 ai referrer parse failed', error);
          }
        }

        gtag('config', '${measurementId}', config);
      })();
    `;
}
