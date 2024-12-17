export const trackPageView = (title: string, path: string) => {
  // @ts-ignore
  window.gtag?.('event', 'page_view', {
    page_title: title,
    page_path: path,
    page_location: window.location.href
  });
};

export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  // @ts-ignore
  window.gtag?.('event', eventName, {
    ...eventParams,
    page_location: window.location.href,
    timestamp: new Date().toISOString()
  });
};

export const trackConversion = (value: number) => {
  // @ts-ignore
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-16811073506/purchase',
    value: value,
    currency: 'HUF'
  });
};