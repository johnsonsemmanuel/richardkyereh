export async function sendWeb3FormsEmail(data: Record<string, unknown>) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn("WEB3FORMS_ACCESS_KEY not configured");
    return { success: false, fallback: true };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...data,
      }),
    });

    const result = await response.json();
    if (result.success) {
      return { success: true };
    } else {
      console.error("Web3Forms error:", result);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error("Web3Forms submission error:", error);
    return { success: false, error };
  }
}
