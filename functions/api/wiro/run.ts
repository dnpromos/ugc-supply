interface Env {
  WIRO_API_KEY: string;
  WIRO_API_SECRET: string;
}

async function generateSignature(apiKey: string, apiSecret: string) {
  const nonce = Math.floor(Date.now() / 1000).toString();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(apiKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const data = encoder.encode(apiSecret + nonce);
  const sig = await crypto.subtle.sign("HMAC", key, data);
  const signature = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return { nonce, signature };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { WIRO_API_KEY, WIRO_API_SECRET } = context.env;

  if (!WIRO_API_KEY || !WIRO_API_SECRET) {
    return new Response(JSON.stringify({ errors: ["Missing API credentials"], result: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await context.request.json() as Record<string, string>;
    const { nonce, signature } = await generateSignature(WIRO_API_KEY, WIRO_API_SECRET);

    const formData = new FormData();

    if (body.inputImageUrl) {
      const imgRes = await fetch(body.inputImageUrl);
      const blob = await imgRes.blob();
      formData.append("inputImage", blob, "product.png");
    }

    formData.append("effectType", body.effectType);
    formData.append("mode", body.mode);
    formData.append("script", body.script);
    formData.append("ratio", body.ratio);

    if (body.inputImage2Url) {
      const img2Res = await fetch(body.inputImage2Url);
      const blob2 = await img2Res.blob();
      formData.append("inputImage2", blob2, "model.png");
    }

    const res = await fetch("https://api.wiro.ai/v1/Run/wiro/ugc-creator", {
      method: "POST",
      headers: {
        "x-api-key": WIRO_API_KEY,
        "x-nonce": nonce,
        "x-signature": signature,
      },
      body: formData,
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ errors: ["Failed to start task: " + (error as Error).message], result: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
