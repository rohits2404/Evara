import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are an elite corporate event planning concierge with 20+ years of experience.
Analyze the user's event requirements and return EXACTLY the following JSON structure.
No extra text before or after. No markdown. No code fences. Pure raw JSON only.

Return this exact structure:
{
    "parsedDetails": {
        "attendees": "string",
        "budget": "string",
        "duration": "string",
        "location": "string",
        "eventType": "string"
    },
    "proposals": [
        {
            "venueName": "string",
            "location": "string",
            "estimatedCost": "string",
            "whyItFits": "string",
            "amenities": ["string", "string", "string", "string", "string"],
            "capacity": "string",
            "eventType": "string",
            "duration": "string"
        }
    ]
}

Rules:
- proposals array must have EXACTLY 3 items
- All string fields must be non-empty
- amenities must be an array of exactly 5 short strings
- estimatedCost must respect the user's stated budget
- whyItFits must be 2 to 3 sentences specific to this event
- First proposal = best overall fit
- Second proposal = premium or upscale alternative
- Third proposal = unique or unconventional choice
- If budget seems low for the location, still recommend realistic nearby options`;

// ── JSON extraction ─────────────────────────────

const extractJSON = (raw) => {
    if (!raw || typeof raw !== "string") {
        throw new Error("Empty response from AI provider");
    }

    let text = raw.trim();

    text = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();

    try {
        return JSON.parse(text);
    } catch {}

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start !== -1 && end > start) {
        try {
            return JSON.parse(text.slice(start, end + 1));
        } catch {}
    }

    throw new Error("AI Did Not Return Valid JSON");
};

// ── Validators ─────────────────────────────────

const isNonEmptyString = (val, field) => {
    if (typeof val !== "string" || !val.trim()) {
        throw new Error(`${field} must be a non-empty string`);
    }
    return val.trim();
};

const validateAmenities = (arr, idx) => {
    if (!Array.isArray(arr)) {
        throw new Error(`Proposal ${idx} Amenities Must Be an Array`);
    }
    const cleaned = arr.map((a) => String(a).trim()).filter(Boolean);
    if (cleaned.length < 3) {
        throw new Error(`Proposal ${idx} Must Have At Least 3 Amenities`);
    }
    return cleaned.slice(0, 5);
};

const validateResponse = (parsed) => {
    if (!parsed || typeof parsed !== "object") {
        throw new Error("AI response is not an object");
    }
    const d = parsed.parsedDetails || {};
    const parsedDetails = {
        attendees: isNonEmptyString(d.attendees, "attendees"),
        budget: isNonEmptyString(d.budget, "budget"),
        duration: isNonEmptyString(d.duration, "duration"),
        location: isNonEmptyString(d.location, "location"),
        eventType: isNonEmptyString(d.eventType, "eventType"),
    };
    if (!Array.isArray(parsed.proposals)) {
        throw new Error("proposals must be an array");
    }
    if (parsed.proposals.length < 3) {
        throw new Error("AI must return at least 3 proposals");
    }
    const proposals = parsed.proposals.slice(0, 3).map((p, i) => {
        const idx = i + 1;
        return {
            venueName: isNonEmptyString(p.venueName, `Proposal ${idx} venueName`),
            location: isNonEmptyString(p.location, `Proposal ${idx} location`),
            estimatedCost: isNonEmptyString(p.estimatedCost, `Proposal ${idx} estimatedCost`),
            whyItFits: isNonEmptyString(p.whyItFits, `Proposal ${idx} whyItFits`),
            amenities: validateAmenities(p.amenities, idx),
            capacity: isNonEmptyString(
                p.capacity || "Not specified",
                `Proposal ${idx} capacity`
            ),
            eventType: isNonEmptyString(
                p.eventType || parsedDetails.eventType,
                `Proposal ${idx} eventType`
            ),
            duration: isNonEmptyString(
                p.duration || parsedDetails.duration,
                `Proposal ${idx} duration`
            ),
        };
    });
    return { parsedDetails, proposals };
};

// ── Main function ───────────────────────────────

export const generateEventProposal = async (userQuery) => {
    const startTime = Date.now();
    try {
        const response = await openai.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Plan This Corporate Event and Respond With Pure JSON Only: "${userQuery}"`,
                },
            ],
            temperature: 0.6,
            max_tokens: 2500,
        });
        const rawContent = response.choices?.[0]?.message?.content ?? "";
        const parsed = extractJSON(rawContent);
        const validated = validateResponse(parsed);
        return {
            ...validated,
            aiModel: response.model || "unknown",
            processingTime: Date.now() - startTime,
        };
    } catch (error) {
        console.error("AI ERROR:", error.message);
        return {
            parsedDetails: {
                attendees: "Unknown",
                budget: "Unknown",
                duration: "Unknown",
                location: "Unknown",
                eventType: "Corporate Event",
            },
            proposals: [],
            aiModel: "fallback",
            processingTime: Date.now() - startTime,
            error: "Failed to generate proposal",
        };
    }
};
