import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@next/third-parties/google", () => ({
  sendGTMEvent: vi.fn(),
}));

import { sendGTMEvent } from "@next/third-parties/google";
import { trackEvent } from "./analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("pushes a cta_click event with all fields", () => {
    trackEvent({
      event: "cta_click",
      cta_name: "Try it Free",
      cta_position: "hero",
    });

    expect(sendGTMEvent).toHaveBeenCalledOnce();
    expect(sendGTMEvent).toHaveBeenCalledWith({
      event: "cta_click",
      cta_name: "Try it Free",
      cta_position: "hero",
    });
  });

  it("pushes a cta_click event without optional position", () => {
    trackEvent({
      event: "cta_click",
      cta_name: "Get Started",
    });

    expect(sendGTMEvent).toHaveBeenCalledWith({
      event: "cta_click",
      cta_name: "Get Started",
    });
  });

  it("pushes a pricing_click event with monthly billing", () => {
    trackEvent({
      event: "pricing_click",
      plan_name: "Pro",
      billing_cycle: "monthly",
    });

    expect(sendGTMEvent).toHaveBeenCalledWith({
      event: "pricing_click",
      plan_name: "Pro",
      billing_cycle: "monthly",
    });
  });

  it("pushes a pricing_click event without billing cycle", () => {
    trackEvent({
      event: "pricing_click",
      plan_name: "Free",
    });

    expect(sendGTMEvent).toHaveBeenCalledWith({
      event: "pricing_click",
      plan_name: "Free",
    });
  });

  it("pushes a form_submit event", () => {
    trackEvent({
      event: "form_submit",
      form_id: "contact-form",
      form_name: "Contact Us",
    });

    expect(sendGTMEvent).toHaveBeenCalledWith({
      event: "form_submit",
      form_id: "contact-form",
      form_name: "Contact Us",
    });
  });
});
