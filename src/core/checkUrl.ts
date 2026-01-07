
const isValid = (str: string) => {
    return /^[a-zA-Z0-9_]{2,32}$/.test(str);
}

type returnType = "valid" | "invalid" | "unknown" | "rate_limited" | "taken" | "available";

interface Props { raw: string; timeoutMs?: number }
export async function checkUrl({raw, timeoutMs}: Props): Promise<returnType> {
    const id = raw.trim();

    if (!isValid(id)) {
        return "unknown";
    }

    const url = `https://steamcommunity.com/id/${encodeURIComponent(id)}?xml=1`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs || 2000);

    try {
        const res = await fetch(url, {
            method: "GET",
            redirect: "follow",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/",
                "Accept": "text/xml, application/xml, text/html;q=0.9, */*;q=0.8",
            },
            signal: controller.signal
        });

        if (res.status === 429 || res.status === 503) return "rate_limited";
        if (res.status === 403) return "unknown";

        const body = await res.text();

        if (body.includes("<steamID64>")) return "taken";

        if (body.includes("The specified profile could not be found.")) return "available";

        if (body.includes("Error 503") || body.includes("Service Unavailable")) return "rate_limited";

        return "unknown";
    }
    catch {
        return "unknown"
    }
    finally {
        clearTimeout(timeout)
    }
}