/**
 * Online info sessions for the Start-Up Challenge.
 * Change dates and times here. The lead API forwards this list to Apps Script
 * so the welcome email uses the same wording as the page.
 * Both sessions are 8:00 pm Hong Kong (7:00 am New York).
 */
export const sessions = {
  zoomUrl: "https://www.ngennetwork.org/zoom",
  consultUrl: "https://www.ngennetwork.org/intro",
  applyUrl: "https://www.ngennetwork.org/global-fellowship#request",
  durationMinutes: 30,
  options: [
    {
      id: "2026-11-23",
      when: {
        en: "Monday, November 23, 2026, 8:00 pm Hong Kong time (7:00 am New York)",
        "zh-Hant": "星期一，2026年11月23日，香港時間晚上8:00（紐約時間上午7:00）",
        "zh-Hans": "星期一，2026年11月23日，香港时间晚上8:00（纽约时间上午7:00）",
      },
    },
    {
      id: "2026-11-24",
      when: {
        en: "Tuesday, November 24, 2026, 8:00 pm Hong Kong time (7:00 am New York)",
        "zh-Hant": "星期二，2026年11月24日，香港時間晚上8:00（紐約時間上午7:00）",
        "zh-Hans": "星期二，2026年11月24日，香港时间晚上8:00（纽约时间上午7:00）",
      },
    },
  ],
};

export function sessionById(id) {
  return sessions.options.find((option) => option.id === id) || null;
}

export function sessionCatalog() {
  return sessions.options.map((option) => ({
    id: option.id,
    en: option.when.en,
    zhHant: option.when["zh-Hant"],
    zhHans: option.when["zh-Hans"],
  }));
}
