import { sendGTMEvent } from "@next/third-parties/google";

export type AnalyticsEvent =
  | {
      event: "cta_click";
      cta_name: string;
      cta_position?: string;
    }
  | {
      event: "form_submit";
      form_id: string;
      form_name: string;
    }
  | {
      event: "pricing_click";
      plan_name: string;
      billing_cycle?: "monthly" | "yearly";
    };

export const trackEvent = (eventData: AnalyticsEvent) => {
  sendGTMEvent(eventData);
};
