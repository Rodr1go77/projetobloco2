import previewLocal from "../localData/previewLocal.json";

export async function getPreview(match_id) {

  const URL = `https://api.soccerdataapi.com/match-preview/?match_id=${match_id}&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3`;

  try {
    const response = await fetch(URL);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (data.error) {
      return { fallback: true, result: previewLocal, error: true };
    }

    return { fallback: false, result: data, error: false };

  } catch (error) {
    return { fallback: true, result: previewLocal, error: true }
  }
}


